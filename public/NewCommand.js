var cities = {
    Bucuresti: ["Sectorul 1", "Sectorul 2", "Sectorul 3", "Sectorul 4", "Sectorul 5", "Sectorul 6"],
    Cluj: [],
    Constanta: [],
    Craiova: [],
    Galati: [],
    Iasi: [],
    Oradea: [],
    Sibiu: [],
    Timisoara: []
}

var listCity = ["Bucuresti", "Cluj", "Constanta", "Craiova", "Galati", "Iasi", "Oradea", "Sibiu", "Timisoara"];

var clientName, consigneeName, clientAddress, consigneeAddress;

function call() {
    var c = '<option value="" disabled selected>Choose City</option>';
    for (i in listCity) {
        c += "<option>" + listCity[i] + "</option>";
    }
    document.getElementById("citySelect1").innerHTML = c;
    document.getElementById("citySelect2").innerHTML = c;
}

function local1(value) {
    if (value.length == 0) document.getElementById("placeSelect1").innerHTML = "<option></option>";
    else {
        var placesOptions = "";
        for (cityId in cities[value]) {
            placesOptions += "<option>" + cities[value][cityId] + "</option>";
        }
        document.getElementById("placeSelect1").innerHTML = placesOptions;
    }
}

function local2(value) {
    if (value.length == 0) document.getElementById("placeSelect2").innerHTML = "<option></option>";
    else {
        var placesOptions = "";
        for (cityId in cities[value]) {
            placesOptions += "<option>" + cities[value][cityId] + "</option>";
        }
        document.getElementById("placeSelect2").innerHTML = placesOptions;
    }
}

function information() {
    clientName = document.getElementById("fname").value;
    consigneeName = document.getElementById("cname").value;
    clientAddress = document.getElementById("fadress");
    consigneeAddress = document.getElementById("cadress");
    console.log(clientName);
}

window.onload = function () {
    call();
}