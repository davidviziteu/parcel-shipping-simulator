var detaliiExpeditor = document.getElementById('detalii-expeditor')
var buttonExpeditor = document.getElementById('button-expeditor')
var detaliiDestinatar = document.getElementById('detalii-destinatar')
var buttonDestinatar = document.getElementById('button-destinatar')
var buttonDetalii = document.getElementById('button-detalii')
var listDetails = document.getElementById('detalii-colet')
var buttonStatus = document.getElementById('button-status')
var statut = document.getElementById('status')
var check = document.getElementsByClassName('check')
var buttonAccident = document.getElementById('accident')
var buttonMeteo = document.getElementById('meteo')
var buttonDefectiuni = document.getElementById('defectiuni')
var buttonClient = document.getElementById('client')
var buttonContinut = document.getElementById('continut')
var buttonLivrat = document.getElementById('livrat')
var buttonRidicat = document.getElementById('ridicat')
var buttonSubmit = document.getElementById('submit')

const task = localStorage.getItem('task')
const toDeliver = localStorage.getItem('toDeliver')
const toPickup = localStorage.getItem('toPickup')
const awb = localStorage.getItem('awb')

document.getElementById("title awb").innerHTML += awb
if (task == "national" && toDeliver) {
    buttonRidicat.innerHTML = "Am ridicat coletul din baza locala"
    buttonLivrat.innerHTML = "Am lasat coletul in baza nationala"

} else if (task == "national" && toPickup) {
    buttonRidicat.innerHTML = "Am ridicat coletul din baza nationala"
    buttonLivrat.innerHTML = "Am lasat coletul in baza locala"
}
else if (task == "local" && toPickup) {
    buttonRidicat.innerHTML = "Am ridicat coletul de la client"
    buttonLivrat.innerHTML = "Am lasat coletul in baza locala"
}
else if (task == "local" && toDeliver) {
    buttonLivrat.innerHTML = "Am livrat coletul la client"
    buttonRidicat.innerHTML = "Am dus coletul inapoi in baza"
}

buttonExpeditor.addEventListener('click', () => {
    detaliiExpeditor.toggleAttribute('hidden')
})

buttonDestinatar.addEventListener('click', () =>
    detaliiDestinatar.toggleAttribute('hidden')
)

buttonDetalii.addEventListener('click', () => {
    listDetails.toggleAttribute('hidden')
})

buttonStatus.addEventListener('click', () => {
    statut.toggleAttribute('hidden')
}
)

buttonAccident.addEventListener('click', () => {
    for (var i in check) {
        if (i != 0) check[i].checked = false
    }
    var change = check[0].checked
    check[0].checked = true
    if (change == true) check[0].checked = false
}
)

buttonMeteo.addEventListener('click', () => {
    for (var i in check) {
        if (i != 1) check[i].checked = false
    }
    var change = check[1].checked
    check[1].checked = true
    if (change == true) check[1].checked = false
}
)

buttonDefectiuni.addEventListener('click', () => {
    for (var i in check) {
        if (i != 2) check[i].checked = false
    }
    var change = check[2].checked
    check[2].checked = true
    if (change == true) check[2].checked = false
}
)

buttonClient.addEventListener('click', () => {
    for (var i in check) {
        if (i != 3) check[i].checked = false
    }
    var change = check[3].checked
    check[3].checked = true
    if (change == true) check[3].checked = false
}
)

buttonContinut.addEventListener('click', () => {
    for (var i in check) {
        if (i != 4) check[i].checked = false
    }
    var change = check[4].checked
    check[4].checked = true
    if (change == true) check[4].checked = false
}
)

buttonLivrat.addEventListener('click', () => {
    for (var i in check) {
        if (i != 5) check[i].checked = false
    }
    var change = check[5].checked
    check[5].checked = true
    if (change == true) check[5].checked = false
}
)

buttonRidicat.addEventListener('click', () => {
    for (var i in check) {
        if (i != 6) check[i].checked = false
    }
    var change = check[6].checked
    check[6].checked = true
    if (change == true) check[6].checked = false
}
)




window.addEventListener(`api-fetched`, (ev) => {
    fetch(`${hostName}${api.getDetailsAwbforDriver.route}?awb=${awb}`, {
        method: api.getDetailsAwbforDriver.method,
        headers: { "Content-type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            document.getElementById("name_sender").innerHTML = "Nume: " + json["fullName_sender"]
            document.getElementById("county_sender").innerHTML = "Județul: " + json["county_sender"]
            document.getElementById("city_sender").innerHTML = "Orașul: " + json["city_sender"]
            document.getElementById("address_sender").innerHTML = "Adresa: " + json["address_sender"]
            document.getElementById("phone_sender").innerHTML = "Telefon: " + json["phone_sender"]
            document.getElementById("name_receiver").innerHTML = "Nume: " + json["fullName_receiver"]
            document.getElementById("county_receiver").innerHTML = "Județul: " + json["county_receiver"]
            document.getElementById("city_receiver").innerHTML = "Orașul: " + json["city_receiver"]
            document.getElementById("address_receiver").innerHTML = "Adresa: " + json["address_receiver"]
            document.getElementById("phone_receiver").innerHTML = "Telefon: " + json["phone_receiver"]
            if (json["nrEnvelope"] != "")
                document.getElementById("nrEnvelope").innerHTML = "Număr de plicuri : " + json["nrEnvelope"]
            if (json["nrParcel"] != "")
                document.getElementById("nrParcel").innerHTML = "Număr de colete : " + json["nrParcel"]
            if (json["weight"] != "")
                document.getElementById("weight").innerHTML = "Greutate : " + json["weight"]
            if (json["length"] != "")
                document.getElementById("length").innerHTML = "Lungime : " + json["length"]
            if (json["width"] != "")
                document.getElementById("width").innerHTML = "Lățime : " + json["width"]
            if (json["height"] != "")
                document.getElementById("height").innerHTML = "Înălțime : " + json["height"]
            document.getElementById("date").innerHTML = "Data de livrare : " + new Date(json["date"]).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })
            document.getElementById("hour").innerHTML = "Ora : " + json["hour"]
            if (json[preference1] == true)
                document.getElementById("preferance1").innerHTML = "Deschiderea coletului la livrare"
            if (json[preference2] == true)
                document.getElementById("preferance2").innerHTML = "Livrare sâmbătă"
            if (json[preference2] == true)
                document.getElementById("preferance3").innerHTML = "Colet fragil"
            document.getElementById("payment").innerHTML = "Plata : " + json["payment"]
            if (json["mentions"] != "")
                document.getElementById("mentions").innerHTML = "Observații : " + json["mentions"]
            document.getElementById("status").innerHTML = json["status"]
        })
        .catch(err => { console.log(err) });
})

buttonSubmit.addEventListener(`click`, (ev) => {
    const values = {
        accident: check[0].checked,
        meteo: check[1].checked,
        failure: check[2].checked,
        client: check[3].checked,
        content: check[4].checked,
        delivered: check[5].checked,
        picked_up: check[6].checked,
        task: task,
        toDeliver: toDeliver,
        toPickup: toPickup,
        awb: awb
    }
    fetch(`${hostName}${api.driverEvent.route}`, {
        method: api.driverEvent.method,
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.error === "unselected") {
                document.getElementById("unselected").style.display = "block"
            }
        })
        .catch(err => { console.log(err) });
})