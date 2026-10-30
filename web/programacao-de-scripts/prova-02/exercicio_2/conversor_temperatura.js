btConverter.addEventListener("click", converter);

function converter() {
    var temperatura_original = parseFloat(temp1.value);
    var temperatura_final = 0;

    var C_F = document.getElementById("c_f").checked;
    var F_C = document.getElementById("f_c").checked;
    var C_K = document.getElementById("c_k").checked;
    var K_C = document.getElementById("k_c").checked;
    var F_K = document.getElementById("f_k").checked;
    var K_F = document.getElementById("k_f").checked;

    if (C_F) {
        temperatura_final = temperatura_original * 1.8 + 32;
    } else if (F_C) {
        temperatura_final = (temperatura_original - 32) / 1.8;
    } else if (C_K) {
        temperatura_final = temperatura_original + 273.15;
    } else if (K_C) {
        temperatura_final = temperatura_original - 273.15;
    } else if (F_K) { 
        temperatura_final = (temperatura_original - 32) * 5/9 + 273.15;
    } else{
        temperatura_final = (temperatura_original - 273.15) * 1.8 + 32;
    }

    res.innerHTML = temperatura_final.toFixed(2);
}