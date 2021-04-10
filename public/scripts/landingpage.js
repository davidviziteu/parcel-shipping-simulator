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
    if (to.startsWith(`Alege`) && from.startsWith(`Alege`))
        totalCost.innerHTML = `Alegeți județul expeditorului și al destinatarului`
    else if (from.startsWith(`Alege`))
        totalCost.innerHTML = `Alegeți județul expeditorului`
    else if (to.startsWith(`Alege`))
        totalCost.innerHTML = `Alegeți județul destinatarului`
    else if (to == from)
        totalCost.innerHTML = `Expediere în același județ (${from}): aproximativ 20 RON`
    else totalCost.innerHTML = `${from} -> ${to}: aproximativ 35 RON`
})


document.getElementById(`our-team`).onclick = () => location.href = `AboutUs.html`
document.getElementById(`reset-password`).onclick = () => location.href = `ResetPassword.html`
document.getElementById(`register`).onclick = () => location.href = `register.html`
document.getElementById(`demo-client`).onclick = () => location.href = `DashboardClient.html`
document.getElementById(`demo-admin`).onclick = () => location.href = `dashboard.html`
document.getElementById(`demo-sofer`).onclick = () => location.href = `DashboardSofer.html`
document.getElementById(`track-awb`).onclick = () => location.href = `DashboardClient.html`
