const orderReceivedButton = document.getElementById(`order-received-button`)
const orderPickedUpButton = document.getElementById(`order-picked-up-button`)
const orderInTransitButton = document.getElementById(`order-in-transit-button`)
const orderInDeliveryButton = document.getElementById(`order-in-delivery-button`)
const orderDestinataryButton = document.getElementById(`order-destinatary-button`)

const orderReceivedList = document.getElementById(`order-received-list`)
const orderPickedUpList = document.getElementById(`order-picked-up-list`)
const orderInTransitList = document.getElementById(`order-in-transit-list`)
const orderInDeliveryList = document.getElementById(`order-in-delivery-list`)
const orderDestinataryList = document.getElementById(`order-destinatary-list`)

const loginBox = document.getElementById(`login-box`)

const orderRefusedButton = document.getElementById(`refuse-order-button`)
const orderConfirmedButton = document.getElementById(`confirm-order-button`)

const orderRefusedButtonDiv = document.getElementById(`refuse-order-button-div`)
const orderConfirmedButtonDiv = document.getElementById(`confirm-order-button-div`)

const senderDetailsList = document.getElementById(`sender-details`)
const destinataryDetailsList = document.getElementById(`destinatary-details`)
const otherDetailsList = document.getElementById(`other-details`)

const rescheduleForm = document.getElementById(`reschedule-form`)
const rescheduleDiv = document.getElementById(`reschedule-div`)
const fetchResult = document.getElementById(`fetch-result`)


const markProgress = (button, progress) => {
    switch (progress) {
        case `done`:
            button.classList.remove(`progress-now`)
            button.classList.add(`progress-done`)
            break;
        case `now`:
            button.classList.remove(`progress-done`)
            button.classList.add(`progress-now`)
            break;
    }
}

const appendArrayToList = (items, list) => {
    list.innerHTML = ``
    items.forEach(item => {
        let newLi = document.createElement(`item`)
        newLi.innerHTML = item
        list.appendChild(newLi)
    })
}

const appendItemToList = (item, list) => {
    let newLi = document.createElement(`li`)
    newLi.innerHTML = item
    list.appendChild(newLi)
}



window.addEventListener(`api-fetched`, async (ev) => {
    login()
    if (!api.loginType)
        loginBox.classList.remove(`hidden`)
    try {
        let awb = sessionStorage.getItem(`fetched-awb`)
        let responseBody = JSON.parse(sessionStorage.getItem(`order-details`))
        if (!responseBody) {
            let rawResp = await fetch(`${hostName}${api.trackAwb.route}?awb=${awb}`, {
                method: api.trackAwb.method,
                headers: { "Content-type": "application/json" }
            })
            if (rawResp.status == 404)
                throw new Error(`AWB-ul nu (mai) exista in baza de date`)
            responseBody = await rawResp.json()
        }
        else
            sessionStorage.removeItem(`order-details`)
        console.log(responseBody);
        document.getElementById(`awb-title`).innerHTML = `AWB: ${awb}`

        if (api.loginType == `employee` || api.loginType == `driver` || api.loginType == `admin`) {
            orderRefusedButtonDiv.classList.remove(`hidden`)
            orderConfirmedButtonDiv.classList.remove(`hidden`)
            console.error(responseBody.events['order-picked-up'].length == 0);
            if (responseBody.events['order-picked-up'].length == 0) {
                rescheduleDiv.classList.remove(`hidden`)
            }
        }

        if (responseBody.isSender && responseBody.events['order-picked-up'].length == 0)
            rescheduleDiv.classList.remove(`hidden`)

        appendArrayToList(responseBody.events['order-received'], orderReceivedList)
        appendArrayToList(responseBody.events['order-picked-up'], orderPickedUpList)
        appendArrayToList(responseBody.events['order-in-transit'], orderInTransitList)
        appendArrayToList(responseBody.events['order-in-delivery'], orderInDeliveryList)
        appendArrayToList(responseBody.events['order-destinatary'], orderDestinataryList)

        if (responseBody.events['order-received'].length > 0) {
            markProgress(orderReceivedButton, `now`)
        }

        if (responseBody.events['order-picked-up'].length > 0) {
            markProgress(orderReceivedButton, `done`)
            markProgress(orderPickedUpButton, `now`)
        }
        if (responseBody.events['order-in-transit'].length > 0) {
            markProgress(orderPickedUpButton, `done`)
            markProgress(orderInTransitButton, `now`)
        }

        if (responseBody.events['order-in-delivery'].length > 0) {
            markProgress(orderInTransitButton, `done`)
            markProgress(orderInDeliveryButton, `now`)
        }

        if (responseBody.events['order-destinatary'].length > 0) {
            markProgress(orderInDeliveryButton, `done`)
            markProgress(orderDestinataryButton, `done`)
        }

        responseBody.data.sender.forEach(e => appendItemToList(e, senderDetailsList))
        responseBody.data.destinatary.forEach(e => appendItemToList(e, destinataryDetailsList))
        responseBody.data.other.forEach(e => appendItemToList(e, otherDetailsList))

        rescheduleForm.onsubmit = async e => {
            e.preventDefault()
            let values = {
                awb: awb,
                date: document.getElementById("date").value,
                time: document.getElementById("hour").value,
            }
            console.log(values);
            let rawResp = await fetch(`${hostName}${api.reschedulePickupDate.route}`, {
                method: api.reschedulePickupDate.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            if (!rawResp.ok) {
                fetchResult.innerHTML = `eroare la inregistrarea datelor pe server`
                return setInterval(() => { fetchResult.innerHTML = '' }, 9000, null); //la 6 minute
            }
            fetchResult.innerHTML = 'Ok'
            return setInterval(() => { fetchResult.innerHTML = '' }, 9000, null); //la 6 minute

        }
        orderConfirmedButton.addEventListener(`click`, ev => {

        })

        orderRefusedButton.addEventListener(`click`, ev => {

        })
    } catch (error) {
        document.getElementById(`awb-title`).innerHTML = `Eroare: ${error.message}`
    }
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
