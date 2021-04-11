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


document.getElementById(`our-team`).onclick = () => location.href = `AboutUs.html`
