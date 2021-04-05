// let loginForm = document.getElementById("login-form")
// let loginBox = document.getElementById(`login-box`)
// let resetBttn = document.getElementById("reset-password")
// let resetForm = loginForm.cloneNode()

// resetBttn.addEventListener(`click`, () => {
//     loginForm.replaceChild(resetForm, loginForm)
// })


// resetForm.action = `reset action`
// resetForm.appendChild(loginForm.childNodes[0])

let sourceSelector = document.getElementById(`judet-exp`)
let destinationSelector = document.getElementById(`judet-dest`)
let estimateCost = document.getElementById(`estimate-cost-button`)
let totalCost = document.getElementById(`total-cost`)

for (let element in cities) {
    sourceSelector.appendChild(new Option(element))
    destinationSelector.appendChild(new Option(element))
}

estimateCost.addEventListener(`click`, () => {
    let from = sourceSelector.value
    let to = destinationSelector.value
    console.log(`${from} -> ${to}: 35 RON`)
    if (to == `default` && from == `default`)
        totalCost.innerHTML = `Alegeți județul expeditorului și al destinatarului`
    else if (from == `default`)
        totalCost.innerHTML = `Alegeți județul expeditorului`
    else if (to == `default`)
        totalCost.innerHTML = `Alegeți județul destinatarului`
    else totalCost.innerHTML = `${from} -> ${to}: 35 RON`
})