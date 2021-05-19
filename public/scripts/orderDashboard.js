try {
    var awb = localStorage.getItem(`awb-to-fetch`)
    document.getElementById(`awb-title`).innerHTML = `AWB: ${awb}`
} catch (error) {
    document.getElementById(`awb-title`).innerHTML = `Error loading awb from local storage: ${error}`
}

window.addEventListener(`api-fetched`, async (ev) => {
    try {
        toggleStatus(`loading`)
        let resp = await fetch(`${hostName}${api.trackAwb.route}?awb=${awb}`, {
            method: api.trackAwb.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then(response => response.json())



        toggleStatus(`ok`)
        console.log(resp)
    } catch (error) {
        toggleStatus(`network error`)
        console.error(error)
    }

}, false)

const statusComandaPrimitaButton = document.getElementById(`order-recieved-button`)
const statusRidicatButton = document.getElementById(`order-picked-up-button`)
const statusInTranzitButton = document.getElementById(`order-in-transit-button`)
const statusInLivrareButton = document.getElementById(`order-in-delivery-button`)
const statusDestinatarButton = document.getElementById(`order-destinatary-button`)

const statusComandaPrimitaList = document.getElementById(`order-recieved-list`)
const statusRidicatList = document.getElementById(`order-picked-up-list`)
const statusInTranzitList = document.getElementById(`order-in-transit-list`)
const statusInLivrareList = document.getElementById(`order-in-delivery-list`)
const statusDestinatarList = document.getElementById(`order-destinatary-list`)



function addOrderDashboardFunctionalities() {
    let expandableItems = document.getElementsByClassName(`expandable`)
    for (let i = 0; i < expandableItems.length; ++i) {
        let bttn = expandableItems[i]
        bttn.addEventListener(`click`, function () {
            let associatedList = this.nextElementSibling
            if (associatedList && associatedList.tagName == `UL`) {
                associatedList.toggleAttribute(`hidden`)
                associatedList.scrollIntoView({ behavior: "smooth", block: "nearest" });
                if (i + 1 == expandableItems.length)
                    associatedList.scrollIntoView({ behavior: "smooth" });
            }
        })
    }
}

addOrderDashboardFunctionalities()