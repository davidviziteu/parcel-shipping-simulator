let sourceSelector = document.getElementById(`judet-exp`)
let destinationSelector = document.getElementById(`judet-dest`)
let estimateCost = document.getElementById(`estimate-cost-button`)
let totalCost = document.getElementById(`total-cost`)
var loginForm = document.getElementById("login-form");


for (let element in cities) {
    sourceSelector.appendChild(new Option(element))
    destinationSelector.appendChild(new Option(element))
}

estimateCost.addEventListener(`click`, () => {
    let from = sourceSelector.value
    let to = destinationSelector.value
    if (!to && !from)
        totalCost.innerHTML = `Alegeți județul expeditorului și al destinatarului`
    else if (!from)
        totalCost.innerHTML = `Alegeți județul expeditorului`
    else if (!to)
        totalCost.innerHTML = `Alegeți județul destinatarului`
    else if (to == from)
        totalCost.innerHTML = `Expediere în același județ (${from}): aproximativ 20 RON`
    else totalCost.innerHTML = `${from} -> ${to}: aproximativ 35 RON`
})

// loginForm.onsubmit = async (e) => {
//     e.preventDefault();
//     var values = {
//         email: document.getElementById("user-email").value,
//         password: document.getElementById("user-password").value,
//     }
//     // let response = await fetch('https://parcel-shipping-simulator.herokuapp.com/api/login', {
//     let response = await fetch('http://localhost:4000/api/login', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//     })

// }


document.getElementById(`our-team`).onclick = () => location.href = `AboutUs.html`

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    var values = {
        email: document.getElementById("user-mail").value,
        password: document.getElementById("user-password").value
    }
    let response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
}