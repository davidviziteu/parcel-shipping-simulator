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
form.onsubmit = async(e)=>{
    e.preventDefault();
    var form = document.querySelector("#newOrderForm");
    var values = {
        fullName_sender : document.getElementById("expName").value,
        ContactPerson_sender : form.querySelector('input[name="expContactName"]').value,
        phone_sender : form.querySelector('input[name="expPhone"]').value,
        email_sender :form.querySelector('input[name="expEmail"]').value,
        // county_sender : form.querySelector('input[name="judetSelected"]').value,
        // country_sender : form.querySelector('input[name="localitate1"]').value,
        address_sender : form.querySelector('input[name="expAddress"]').value,
     
        fullName_receiver : form.querySelector('input[name="destName"]').value,
        ContactPerson_receiver : form.querySelector('input[name="destContactName"]').value,
        phone_receiver : form.querySelector('input[name="destPhone"]').value,
        // county_receiver : form.querySelector('input[name="judet2"]').value,
        // country_receiver : form.querySelector('input[name="localitate2"]').value,
        address_receiver : form.querySelector('input[name="destAddress"]').value,
     
        nrEnvelope : form.querySelector('input[name="envelope"]').value,
        nrParcel : form.querySelector('input[name="parcel"]').value,
        weight : form.querySelector('input[name="weight"]').value,
     
        length :form.querySelector('input[name="length"]').value,
        width : form.querySelector('input[name="width"]').value,
        height :form.querySelector('input[name="height"]').value,
     
        date : form.querySelector('input[name="date"]').value,
        hour : form.querySelector('input[name="hour"]').value,
     
        preference1 : document.getElementById("preference1").value,
        preference2 : form.querySelector('input[name="preference2"]').value,
        preference3 : form.querySelector('input[name="preference3"]').value,
     
        // payment :form.querySelector('input[id="payment"]').value,
     
        mentions : form.querySelector('input[name="mentions"]').value
     }
     let response = await fetch('http://localhost:4000/api/neworder', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
        })
        // console.log(req.body);
        // let text = await response.text(); // read response body as text
        // document.querySelector("#decoded").innerHTML = text;
}


// fetch('localhost:4000/api/neworder', {
//     method: "GET",
//     body: JSON.stringify(values),
//     headers: { "Content-type": "application/json; charset=UTF-8" }
// })
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log("eroare e de aici"+ err));

