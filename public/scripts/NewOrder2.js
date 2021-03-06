// const JSONTransport = require("nodemailer/lib/json-transport");

var judetSelector1 = document.getElementById("judet1");
var localitateSelector1 = document.getElementById("localitate1");
var judetSelector2 = document.getElementById("judet2");
var localitateSelector2 = document.getElementById("localitate2");
var plata = document.getElementById("payment");
var costCalculat = document.getElementById("cost-final");
var costBtn = document.getElementById("calculeazaCostBtn");
var metodePlata = ["card", "cash"];
var form = document.getElementById("newOrderForm");
const estimateCostButton = document.getElementById(`estimate-cost-button`);
const totalCostText = document.getElementById(`total-cost`)

window.addEventListener(`api-fetched`, (ev) => {
    if (api.loginType != null) {
        fetch(`${hostName}${api.autocomplete.route}`, {
                method: api.autocomplete.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify(),
            })
            .then(response => response.json())
            .then(json => {
                document.getElementById("expName").defaultValue = json.data.name + " " + json.data.surname;
                document.getElementById("expPhone").defaultValue = json.data.phone;
                document.getElementById("expEmail").defaultValue = json.data.email;
                // document.getElementById("judet1").value = json.data.county;
                // document.getElementById("localitate1").value = json.data.city;
                document.getElementById("expAddress").defaultValue = json.data.address;
            })
            .catch(err => console.log(err));
    }
    estimateCostButton.addEventListener(`click`, () => {
        var from = document.getElementById(`judet1`).value
        var to = document.getElementById(`judet2`).value
        var from2 = from.replace('ș', 's');
        from = from2;
        from2 = from.replace('ț', 't');
        from = from2;
        var to2 = to.replace('ș', 's');
        to = to2;
        to2 = to.replace('ț', 't');
        to = to2;
        if (!to && !from)
            totalCostText.innerHTML = `Alegeți județul expeditorului și al destinatarului`
        else if (!from)
            totalCostText.innerHTML = `Alegeți județul expeditorului`
        else if (!to)
            totalCostText.innerHTML = `Alegeți județul destinatarului`
        else {
            fetch(`${hostName}${api.estimateCost.route}?source=${from}&destination=${to}`, {
                    method: api.estimateCost.method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                })
                .then(response => response.json())
                .then(json => {
                    totalCostText.innerHTML = "Pretul estimativ este : " + json.data + " ron";
                })
                .catch(err => { console.log(err) });
        }
    })

    form.onsubmit = async(e) => {
        e.preventDefault();
        resetColorField();
        var values = {
            fullName_sender: document.getElementById("expName").value,
            contactPerson_sender: document.getElementById("expContactName").value,
            phone_sender: document.getElementById("expPhone").value,
            email_sender: document.getElementById("expEmail").value,
            county_sender: document.getElementById("judet1").value,
            city_sender: document.getElementById("localitate1").value,
            address_sender: document.getElementById("expAddress").value,

            fullName_receiver: document.getElementById("destName").value,
            contactPerson_receiver: document.getElementById("destContactName").value,
            phone_receiver: document.getElementById("destPhone").value,
            county_receiver: document.getElementById("judet2").value,
            city_receiver: document.getElementById("localitate2").value,
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
        fetch(`${hostName}${api.newOrder.route}`, {
                method: api.newOrder.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
            .then(response => response.json())
            .then(json => {
                if (json.error) {

                    if (json.error.includes('fullName_sender'))
                        document.getElementById("expName").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('contactPerson_sender'))
                        document.getElementById("expContactName").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('phone_sender'))
                        document.getElementById("expPhone").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('email_sender'))
                        document.getElementById("expEmail").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('county_sender'))
                        document.getElementById("judet1").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('city_sender'))
                        document.getElementById("localitate1").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('address_sender'))
                        document.getElementById("expAddress").style.backgroundColor = "rgb(211, 110, 110)";

                    if (json.error.includes('fullName_receiver'))
                        document.getElementById("destName").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('contactPerson_receiver'))
                        document.getElementById("destContactName").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('phone_receiver'))
                        document.getElementById("destPhone").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('county_receiver'))
                        document.getElementById("judet2").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('city_receiver'))
                        document.getElementById("localitate2").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('address_receiver'))
                        document.getElementById("destAddress").style.backgroundColor = "rgb(211, 110, 110)";

                    if (json.error.includes('nrEnvelope'))
                        document.getElementById("envelope").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('nrParcel'))
                        document.getElementById("parcel").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('weight'))
                        document.getElementById("weight").style.backgroundColor = "rgb(211, 110, 110)";

                    if (json.error.includes('date'))
                        document.getElementById("date").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('hour'))
                        document.getElementById("hour").style.backgroundColor = "rgb(211, 110, 110)";

                    if (json.error.includes('preference1'))
                        document.getElementById("preference1").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('preference2'))
                        document.getElementById("preference2").style.backgroundColor = "rgb(211, 110, 110)";
                    if (json.error.includes('preference3'))
                        document.getElementById("preference3").style.backgroundColor = "rgb(211, 110, 110)";

                    if (json.error.includes('payment'))
                        document.getElementById("payment").style.backgroundColor = "rgb(211, 110, 110)";

                    if (json.error.includes('mentions'))
                        document.getElementById("mentions").style.backgroundColor = "rgb(211, 110, 110)";
                } else if (json.success == true) {

                    document.getElementById("order-placed-status1").style.display = "block";
                    setTimeout(() => document.getElementById("order-placed-status1").style.display = "none", 5000)
                    setTimeout(() => window.location.reload(5), 5000)
                }

            })
            .catch(err => { console.log(err) });
    }

})
for (var judet in cities) {
    judetSelector1.options[judetSelector1.options.length] = new Option(judet, judet);
}
judetSelector1.onchange = function() {
    console.log("bau cica bau bau")
    localitateSelector1.length = 1;
    for (var localitate in cities[this.value]) {
        localitateSelector1.options[localitateSelector1.options.length] = new Option(cities[this.value][localitate]);
    }
}
for (var judet in cities) {
    judetSelector2.options[judetSelector2.options.length] = new Option(judet, judet);

}
judetSelector2.onchange = function() {
    localitateSelector2.length = 1;
    for (var localitate in cities[this.value]) {
        localitateSelector2.options[localitateSelector2.options.length] = new Option(cities[this.value][localitate]);
    }
}

for (var mod in metodePlata) {
    plata.options[plata.options.length] = new Option(metodePlata[mod]);

}
window.onload = function() {
    document.getElementById("preference1").checked = false;
    document.getElementById("preference2").checked = false;
    document.getElementById("preference3").checked = false;
    document.getElementById("order-placed-status1").style.display = "none";
}

function resetColorField() {
    document.getElementById("expName").style.backgroundColor = "white";
    document.getElementById("expContactName").style.backgroundColor = "white";
    document.getElementById("expPhone").style.backgroundColor = "white";
    document.getElementById("expEmail").style.backgroundColor = "white";
    document.getElementById("judet1").style.backgroundColor = "white";
    document.getElementById("localitate1").style.backgroundColor = "white";
    document.getElementById("expAddress").style.backgroundColor = "white";

    document.getElementById("destName").style.backgroundColor = "white";
    document.getElementById("destContactName").style.backgroundColor = "white";
    document.getElementById("destPhone").style.backgroundColor = "white";
    document.getElementById("judet2").style.backgroundColor = "white";
    document.getElementById("localitate2").style.backgroundColor = "white";
    document.getElementById("destAddress").style.backgroundColor = "white";

    document.getElementById("envelope").style.backgroundColor = "white";
    document.getElementById("parcel").style.backgroundColor = "white";
    document.getElementById("weight").style.backgroundColor = "white";

    document.getElementById("date").style.backgroundColor = "white";
    document.getElementById("hour").style.backgroundColor = "white";

    document.getElementById("preference1").style.backgroundColor = "white";
    document.getElementById("preference2").style.backgroundColor = "white";
    document.getElementById("preference3").style.backgroundColor = "white";

    document.getElementById("payment").style.backgroundColor = "white";

    document.getElementById("mentions").style.backgroundColor = "white";

}