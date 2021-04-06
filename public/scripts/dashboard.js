let detaliiExpeditor = document.getElementById(`detalii-expeditor`)
let buttonExp = document.getElementById(`exp-bttn`)

buttonExp.addEventListener(`click`, () => {
    if (detaliiExpeditor.style.display == `none`)
        detaliiExpeditor.style.display = `block`
    else
        detaliiExpeditor.style.display = `none`
})