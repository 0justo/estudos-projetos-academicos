$(document).ready(function () {
    btcalcular.addEventListener("click", calcular);

    function calcular() {
        var num = parseFloat(valor1.value);
        var prefixo = document.getElementById("prefixo").value;
        var valork = 0;
        var valorm = 0;
        var valorg = 0;
        var valort = 0;
        switch (prefixo) {
            case 'k':
                valork = num;
                valorm = num / 1000;
                valorg = num / 1000000;
                valort = num / 1000000000;
                break;
            case 'm':
                valork = num * 1000;
                valorm = num;
                valorg = num / 1000;
                valort = num / 1000000;
                break;
            case 'g':
                valork = num * 1000000;
                valorm = num * 1000;
                valorg = num;
                valort = num / 1000;
                break;
            case 't':
                valork = num * 1000000000;
                valorm = num * 1000000;
                valorg = num * 1000;
                valort = num;
                break;
        }
        $('#res')
            .hide()
            .html(valork + " K<br>" + valorm + " M<br>" + valorg + " G<br>" + valort + " T<br>")
            .slideDown(400);
    }
});