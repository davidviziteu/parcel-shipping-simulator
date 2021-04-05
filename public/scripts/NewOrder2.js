var judetSelector = document.getElementById("judet");
var localitateSelector = document.getElementById("localitate");
var comanda = document.getElementById("comanda");
localStorage = comanda;

for (var judet in cities) {
    judetSelector.options[judetSelector.options.length] = new Option(judet, judet);
}
judetSelector.onchange = function() {   
    localitateSelector.length = 1;
    for (var localitate in cities[this.value]) {
        localitateSelector.options[localitateSelector.options.length] = new Option(cities[this.value][localitate]);
    }
}