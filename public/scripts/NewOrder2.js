var judetSelector1 = document.getElementById("judet1");
var localitateSelector1 = document.getElementById("localitate1");
var judetSelector2 = document.getElementById("judet2");
var localitateSelector2 = document.getElementById("localitate2");
var plata = document.getElementById("plata");
var costCalculat = document.getElementById("cost-final");
var costBtn = document.getElementById("calculeazaCostBtn");
var metodePlata = ["card", "cash"];
costBtn.addEventListener(`click`, () => {
    costCalculat.innerHTML = "Costul final este de 50 de lei.";
});
for (var judet in cities) {
    judetSelector1.options[judetSelector1.options.length] = new Option(judet, judet);
}
judetSelector1.onchange = function () {
    localitateSelector1.length = 1;
    for (var localitate in cities[this.value]) {
        localitateSelector1.options[localitateSelector1.options.length] = new Option(cities[this.value][localitate]);
    }
}
for (var judet in cities) {
    judetSelector2.options[judetSelector2.options.length] = new Option(judet, judet);
}
judetSelector2.onchange = function () {
    localitateSelector2.length = 1;
    for (var localitate in cities[this.value]) {
        localitateSelector2.options[localitateSelector2.options.length] = new Option(cities[this.value][localitate]);
    }
}
for (var mod in metodePlata) {
    plata.options[plata.options.length] = new Option(metodePlata[mod]);
}
