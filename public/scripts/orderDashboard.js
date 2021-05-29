const statusComandaPrimitaButton = document.getElementById(`order-received-button`)
const statusRidicatButton = document.getElementById(`order-picked-up-button`)
const statusInTranzitButton = document.getElementById(`order-in-transit-button`)
const statusInLivrareButton = document.getElementById(`order-in-delivery-button`)
const statusDestinatarButton = document.getElementById(`order-destinatary-button`)

const statusComandaPrimitaList = document.getElementById(`order-received-list`)
const statusRidicatList = document.getElementById(`order-picked-up-list`)
const statusInTranzitList = document.getElementById(`order-in-transit-list`)
const statusInLivrareList = document.getElementById(`order-in-delivery-list`)
const statusDestinatarList = document.getElementById(`order-destinatary-list`)



const orderRefusedButton = document.getElementById(`order-refused-button`)
const orderConfirmedButton = document.getElementById(`order-confirmed-button`)

const appendItemsToList = (items, list) => {
    list.innerHTML = ``
    items.forEach(item => {
        let newLi = document.createElement(`li`)
        newLi.innerHTML = item
        list.appendChild(newLi)
    })
}

try {
    var awb = sessionStorage.getItem(`fetched-awb`)
    var responseBody = JSON.parse(sessionStorage.getItem(`order-details`))
    console.log(responseBody);
    document.getElementById(`awb-title`).innerHTML = `AWB: ${awb}`

    appendItemsToList(responseBody.events['order-received'], statusComandaPrimitaList)
    appendItemsToList(responseBody.events['order-picked-up'], statusRidicatList)
    appendItemsToList(responseBody.events['order-in-transit'], statusInTranzitList)
    appendItemsToList(responseBody.events['order-in-delivery'], statusInLivrareList)
    appendItemsToList(responseBody.events['order-destinatary'], statusDestinatarList)

} catch (error) {
    document.getElementById(`awb-title`).innerHTML = `Error loading awb from local storage: ${error}`
}

window.addEventListener(`api-fetched`, async (ev) => {
    // if (api.loginType == `admin` || api.loginType == `employee` || api.loginType == `driver`) {
    //     orderConfirmedButton.classList.remove(`hidden`)
    //     orderRefusedButton.classList.remove(`hidden`)
    // }
}, false)




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