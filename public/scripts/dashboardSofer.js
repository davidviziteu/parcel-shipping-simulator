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
    var color = check[0].style.background
    check[0].style.background = 'lime'
    if (color == 'lime') check[0].style.background = 'white'
}
)

buttonMeteo.addEventListener('click', () => {
    var color = check[1].style.background
    check[1].style.background = 'lime'
    if (color == 'lime') check[1].style.background = 'white'
}
)

buttonDefectiuni.addEventListener('click', () => {
    var color = check[2].style.background
    check[2].style.background = 'lime'
    if (color == 'lime') check[2].style.background = 'white'
}
)

buttonClient.addEventListener('click', () => {
    var color = check[3].style.background
    check[3].style.background = 'lime'
    if (color == 'lime') check[3].style.background = 'white'
}
)

buttonContinut.addEventListener('click', () => {
    var color = check[4].style.background
    check[4].style.background = 'lime'
    if (color == 'lime') check[4].style.background = 'white'
}
)

buttonLivrat.addEventListener('click', () => {
    var color = check[5].style.background
    check[5].style.background = 'lime'
    if (color == 'lime') check[5].style.background = 'white'
}
)

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