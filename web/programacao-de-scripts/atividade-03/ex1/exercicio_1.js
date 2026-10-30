argentina.addEventListener ('click', function () {pais(0)});
bolivia.addEventListener ('click', function () {pais(1)});
brasil.addEventListener ('click', function () {pais(2)});
chile.addEventListener ('click', function () {pais(3)});
colombia.addEventListener ('click', function () {pais(4)});
equador.addEventListener ('click', function () {pais(5)});
guiana.addEventListener ('click', function () {pais(6)});
paraguai.addEventListener ('click', function () {pais(7)});
peru.addEventListener ('click', function () {pais(8)});
suriname.addEventListener ('click', function () {pais(9)});
uruguai.addEventListener ('click', function () {pais(10)});
venezuela.addEventListener ('click', function () {pais(11)});

var nomes = ["Argentina","Bolívia","Brasil","Chile","Colômbia","Equador","Guiana","Paraguai","Peru","Suriname","Uruguai","Venezuela"];
var populacao = ["45.606.000","11.833.000","203.062.512","19.212.000","51.266.000","17.888.000","790.000","7.220.000","34.668","592.000","3.485.000","28.705.000"];
var pib = ["US$ 641,1 bilhões","US$ 46,1 bilhões","US$ 2 trilhões", "US$ 358,56 bilhões","US$ 334,69 bilhões","US$ 121,29 bilhões","R$ 16,3 bilhões", "US$ 42,8 bilhões","US$ 268,2 bilhões","US$ 3,47 bilhões","US$ 77,3 bilhões","US$ 96.630.000"];
var moeda = ["Peso argentino", "Boliviano da Bolívia", "Real", "Peso chileno", "Peso colombiano", "Dólar estadunidense", "Dólar guianense", "Guarani", "Sol", "Dólar do Suriname", "Peso uruguaio", "Bolívar"];
var idh = ["0,842", "0,692", "0,754", "0,855", "0,752", "0,740", "0,714", "0,717", "0,762", "0,730", "0,809", "0,691"];
var area = ["2.796.427", "1.098.581", "8.514.004", "756.102", "1.141.748", "257.217", "214.969", "406.752", "1.285.216", "163.820", "173.626", "929.690"];

function pais(idx) {
res.innerHTML = "<h1>" + nomes[idx] + "</h1>";
res.innerHTML += '<img src="./Imagens/' + idx + '.webp">' + "<br>";
res.innerHTML += "População: " + populacao[idx] + " de pessoas;" + "<br>";
res.innerHTML += "PIB: " + pib[idx] + ";"  + "<br>";
res.innerHTML += "Moeda: " + moeda[idx] + ";" + "<br>";
res.innerHTML += "PIB: " + pib[idx] + ";" + "<br>";
res.innerHTML += "Extensão Territorial: " + area[idx] + " km².<br>";
}