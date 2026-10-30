btcalcular.addEventListener ("click", calcular);

function calcular() {
    var salario = parseFloat(sal.value);
    var categoria = document.getElementById("cat").value.trim().toLowerCase();
    var reajuste = 0;
    var salariofinal = 0;

    if (categoria == "a" || categoria == "c") {
        salariofinal = salario * 1.1;
        reajuste = salario * 0.1;
    }
    else if (categoria == "b" || categoria == "d" || categoria == "e") {
        salariofinal = salario * 1.15;
        reajuste = salario * 0.15;
    }
    else if (categoria == "f" || categoria == "l") {
        salariofinal = salario * 1.25;
        reajuste = salario * 0.25;
    }
    else if (categoria == "g" || categoria == "h") {
        salariofinal = salario * 1.35;
        reajuste = salario * 0.35;
    }
    else if (categoria == "i" || categoria == "j") {
        salariofinal = salario * 1.5;
        reajuste = salario * 0.5;
    }
    else {
        res.innerHTML = "Categoria inválida!";
        return;
    }

    res.innerHTML = "O valor do reajuste é: R$" + reajuste + ";</br>"
    res.innerHTML += "O valor final do salário é: R$" + salariofinal + "."
}