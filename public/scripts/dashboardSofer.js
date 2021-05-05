var detaliiExpeditor = document.getElementById('detalii-expeditor')
var buttonExpeditor = document.getElementById('button-expeditor')
var detaliiDestinatar = document.getElementById('detalii-destinatar')
var buttonDestinatar = document.getElementById('button-destinatar')
var buttonAWBS = document.getElementById('button-myawbs')
var listAwbs = document.getElementById('list-awbs')
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


buttonExpeditor.addEventListener('click', () =>
    detaliiExpeditor.toggleAttribute('hidden')
)

buttonDestinatar.addEventListener('click', () =>
    detaliiDestinatar.toggleAttribute('hidden')
)

buttonAWBS.addEventListener('click', () =>
    listAwbs.toggleAttribute('hidden')
)

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

buutonSubmit.addEventListener('click', () => {
    window.location.href = "DashboardSoferAfter.html";
    return false;
})

function AWBS() {
    n = Math.floor(Math.random() * 10) + 1;
    for (var i = 0; i < n; i++) {
        var btn = document.createElement("BUTTON");
        var newAWB = document.getElementsByClassName("button-container")[3].appendChild(btn);
        newAWB.innerHTML = Math.floor(Math.random() * 100) + 10;
        awb = newAWB.innerHTML;
    }
    document.getElementsByTagName("h4")[0].innerHTML += awb;
}

window.onload = AWBS()