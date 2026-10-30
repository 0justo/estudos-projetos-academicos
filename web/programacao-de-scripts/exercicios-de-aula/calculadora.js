d0.addEventListener('click', function() { digito('0');});
d1.addEventListener('click', function() { digito('1');});
d2.addEventListener('click', function() { digito('2');});
d3.addEventListener('click', function() { digito('3');});
d4.addEventListener('click', function() { digito('4');});
d5.addEventListener('click', function() { digito('5');});
d6.addEventListener('click', function() { digito('6');});
d7.addEventListener('click', function() { digito('7');});
d8.addEventListener('click', function() { digito('8');});
d9.addEventListener('click', function() { digito('9');});

function digito(dig) {
    if(res.value.length < 12) {
        if (res.value != "0") res.value = res.value + dig;
        else res.value = dig;
    }
}

div.addEventListener('click', function() { operacao("/");});
mul.addEventListener('click', function() { operacao("X");});
sub.addEventListener('click', function() { operacao("-");});
adi.addEventListener('click', function() { operacao("+");});

function operacao(ope) {
    v1.value = res.value;
    op.value = ope;
    res.value = "0";
}

off.addEventListener('click', retornar);
lim.addEventListener('click', limpar);
sep.addEventListener('click', separador);
tot.addEventListener('click', total);

function string2number(valor) {
    valor = valor.replace(",",".");
    return (parseFloat(valor));
}

function number2string(valor) {
    valor = valor.toString().replace('.', ',');
    return (valor);
}

function total() {
    var n1 = string2number(v1.value);
    var n2 = string2number(res.value);
    if (op.value === "+")
        res.value = number2string(n1 + n2);
    else if (op.value === "-")
        res.value = number2string(n1 - n2);
    else if (op.value === "X")
        res.value = number2string(n1 * n2);
    else if (op.value === "/") {
        if (res.value !== 0)
            res.value = number2string(n1 / n2);
    }
    else
        res.value = "Erro!";
}

function separador() {
    if (res.value.indexOf(",") < 0)
        res.value = res.value + ",";
}

function limpar() {
    res.value = "0";
}

function retornar() {
    window.opener.postMessage(res.value, "*");
    window.close();
}