var detaliiExpeditor = document.getElementById('detalii-expeditor')
var buttonExpeditor = document.getElementById('button-expeditor')
var detaliiDestinatar = document.getElementById('detalii-destinatar')
var buttonDestinatar = document.getElementById('button-destinatar')

buttonExpeditor.addEventListener('click', () =>
    detaliiExpeditor.toggleAttribute('hidden')
)

buttonDestinatar.addEventListener('click', () =>
    detaliiDestinatar.toggleAttribute('hidden')
)
