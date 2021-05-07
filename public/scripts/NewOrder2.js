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
var values = {
   fullName_sender : expName,
   ContactPerson_sender : expContactName,
   phone_sender : expPhone,
   email_sender : expEmail,
   county_sender : judet1,
   country_sender : localitate1,
   address_sender : expAddress,

   fullName_receiver : destName,
   ContactPerson_receiver : destContactName,
   phone_receiver : destPhone,
   county_receiver : judet2,
   country_receiver : localitate2,
   address_receiver : destAddress,

   nrEnvelope : envelope,
   nrParcel : parcel,
   weight : weight,

   length :length,
   width : width,
   height :height,

   date : date,
   hour : hour,

   preference1 : preference1,
   preference2 : preference2,
   preference3 : preference3,

   payment : payment,

   mentions : mentions
}

fetch('localhost:80/api/neworder', {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-type": "application/json; charset=UTF-8" }
})
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log("eroare e de aici"+ err));

