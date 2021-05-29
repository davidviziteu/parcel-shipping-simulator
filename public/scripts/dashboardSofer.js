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
var buutonSubmit = document.getElementById('submit')

buttonExpeditor.addEventListener('click', () => {
    detaliiExpeditor.toggleAttribute('hidden')
})

buttonDestinatar.addEventListener('click', () =>
    detaliiDestinatar.toggleAttribute('hidden')
)

buttonDetalii.addEventListener('click', () => {
    console.log("aici")
    listDetails.toggleAttribute('hidden')
})

buttonStatus.addEventListener('click', () => {
    statut.toggleAttribute('hidden')
}
)

buttonAccident.addEventListener('click', () => {
    var change = check[0].checked
    check[0].checked = true
    if (change == true) check[0].checked = false
}
)

buttonMeteo.addEventListener('click', () => {
    var change = check[1].checked
    check[1].checked = true
    if (change == true) check[1].checked = false
}
)

buttonDefectiuni.addEventListener('click', () => {
    var change = check[2].checked
    check[2].checked = true
    if (change == true) check[2].checked = false
}
)

buttonClient.addEventListener('click', () => {
    var change = check[3].checked
    check[3].checked = true
    if (change == true) check[3].checked = false
}
)

buttonContinut.addEventListener('click', () => {
    var change = check[4].checked
    check[4].checked = true
    if (change == true) check[4].checked = false
}
)

buttonLivrat.addEventListener('click', () => {
    var change = check[5].checked
    check[5].checked = true
    if (change == true) check[5].checked = false
}
)

window.addEventListener(`api-fetched`, (ev) => {
    fetch(`${hostName}${api.getDetailsAwbforDriver.route}`, {
        method: api.getDetailsAwbforDriver.method,
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => {
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

    buutonSubmit.onsubmit = async (e) => {
        e.preventDefault();
        const values = {
            accident: check[0].checked,
            meteo: check[1].checked,
            failure: check[2].checked,
            client: check[3].checked,
            content: check[4].checked,
            delivered: check[5].checked
        }
        fetch(`${hostName}${api.driverEvent.route}`, {
            method: api.driverEvent.route,
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error === "unselected") {
                    document.getElementById("unselected").style.display = "block"
                }
            })
            .catch(err => { console.log(err) });
    }
})