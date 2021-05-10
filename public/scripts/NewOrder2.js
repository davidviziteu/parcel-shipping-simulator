var judetSelector1 = document.getElementById("judet1");
var localitateSelector1 = document.getElementById("localitate1");
var judetSelector2 = document.getElementById("judet2");
var localitateSelector2 = document.getElementById("localitate2");
var plata = document.getElementById("payment");
var costCalculat = document.getElementById("cost-final");
var costBtn = document.getElementById("calculeazaCostBtn");
var metodePlata = ["card", "cash"];
var form = document.getElementById("newOrderForm");
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
window.onload = function () {
    document.getElementById("preference1").checked = false;
    document.getElementById("preference2").checked = false;
    document.getElementById("preference3").checked = false;
}
form.onsubmit = async (e) => {
    e.preventDefault();
    var values = {
        fullName_sender: document.getElementById("expName").value,
        contactPerson_sender: document.getElementById("expContactName").value,
        phone_sender: document.getElementById("expPhone").value,
        email_sender: document.getElementById("expEmail").value,
        county_sender: document.getElementById("judet1").value,
        country_sender: document.getElementById("localitate1").value,
        address_sender: document.getElementById("expAddress").value,

        fullName_receiver: document.getElementById("destName").value,
        contactPerson_receiver: document.getElementById("destContactName").value,
        phone_receiver: document.getElementById("destPhone").value,
        county_receiver: document.getElementById("judet2").value,
        country_receiver: document.getElementById("localitate2").value,
        address_receiver: document.getElementById("destAddress").value,

        nrEnvelope: document.getElementById("envelope").value,
        nrParcel: document.getElementById("parcel").value,
        weight: document.getElementById("weight").value,

        length: document.getElementById("length").value,
        width: document.getElementById("width").value,
        height: document.getElementById("height").value,

        date: document.getElementById("date").value,
        hour: document.getElementById("hour").value,

        preference1: document.getElementById("preference1").checked,
        preference2: document.getElementById("preference2").checked,
        preference3: document.getElementById("preference3").checked,

        payment: document.getElementById("payment").value,

        mentions: document.getElementById("mentions").value
    }
    fetch('http://localhost:4000/api/neworder', {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json.error);
            if (json.error.includes('phone_receiver')) {
                console.log("yes");
                document.getElementById("destPhone").style.backgroundColor = "rgb(211, 110, 110)";";
            }
        })
        .catch(err => { console.log(err) });
}
