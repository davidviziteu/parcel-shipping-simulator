const sourceSelector = document.getElementById(`judet-exp`)
const destinationSelector = document.getElementById(`judet-dest`)
const estimateCost = document.getElementById(`estimate-cost-button`)
const totalCost = document.getElementById(`total-cost`)
const loginForm = document.getElementById("login-form");
const trackAwbButton = document.getElementById(`track-awb-button`)
const estimateCostButton = document.getElementById(`estimate-cost-button`)
const startOrderButton = document.getElementById(`start-order-button`)
const resetPasswordButton = document.getElementById(`reset-password-button`)
const registerButton = document.getElementById(`register-button`)
// const aboutUsButton = document.getElementById(`register-button`) // ASTA TRE FACUT IN TEMPLATES CRED
document.getElementById(`our-team-button`).onclick = () => location.href = `AboutUs.html`

// window.onunload = function () {
//     document.cookie = "cookiename=token ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
//     console.log("cookie" + document.cookie)
// }

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

console.log(`lndingpage.js`)


window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    console.log(`------------------`)
    resetPasswordButton.addEventListener(`click`, () => location.href = api.changeCredentials.location)
    registerButton.addEventListener(`click`, () => location.href = api.newAccout.location)
    startOrderButton.addEventListener(`click`, () => location.href = api.newOrder.location)
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        document.getElementById("user-email").style.backgroundColor = "#fbfef7";
        document.getElementById("user-password").style.backgroundColor = "#fbfef7";
        var values = {
            email: document.getElementById("user-email").value,
            password: document.getElementById("user-password").value,
            rememberMe: document.getElementById("remember-me").checked
        }
        fetch(`${hostName}${api.login.route}`, {
            method: api.login.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(json => handleLoginResponse(json))
            .catch(err => console.log(err));
    }

}, false)



function handleLoginResponse(resp) {
    console.log(`handling response from front ${JSON.stringify(resp)}`)
    if (!resp.error)
        window.location.href = resp.redirect;
    if (resp.error.toLowerCase().includes(`email`))
        document.getElementById("user-email").style.backgroundColor = "rgb(211, 110, 110)";

    if (resp.error.toLowerCase().includes(`password`))
        document.getElementById("user-password").style.backgroundColor = "rgb(211, 110, 110)";
}


// logout.addEventListener(`click`, () => {
//     fetch(`${hostName}${api.logout.route}`, {
//         method: api.logout.method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'same-origin',
//     })
//         .then(response => response.json())
//         .then(json => {
//             if (!json.error) {
//                 window.location.href = json.redirect;
//             }
//         })
//         .catch(err => { console.log(err) });
// })