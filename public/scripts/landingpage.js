
const trackAwbButton = document.getElementById(`track-awb-button`)
const estimateCostButton = document.getElementById(`estimate-cost-button`)
const startOrderButton = document.getElementById(`start-order-button`)
const changeCredentialsButton = document.getElementById(`change-credentials-button`)
const registerButton = document.getElementById(`register-button`)
// const aboutUsButton = document.getElementById(`register-button`) // ASTA TRE FACUT IN TEMPLATES CRED
document.getElementById(`our-team-button`).onclick = () => location.href = `AboutUs.html`

// window.onunload = function () {
//     document.cookie = "cookiename=token ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
//     console.log("cookie" + document.cookie)
// }

console.log(`lndingpage.js`)


window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    console.log(`------------------`)
    changeCredentialsButton.addEventListener(`click`, () => location.href = api.changeCredentials.location)
    registerButton.addEventListener(`click`, () => location.href = api.newAccount.location)
    startOrderButton.addEventListener(`click`, () => location.href = api.newOrder.location)
    login()

}, false)



