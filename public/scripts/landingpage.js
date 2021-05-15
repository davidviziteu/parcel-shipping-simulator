let sourceSelector = document.getElementById(`judet-exp`)
let destinationSelector = document.getElementById(`judet-dest`)
let estimateCost = document.getElementById(`estimate-cost-button`)
let totalCost = document.getElementById(`total-cost`)
var loginForm = document.getElementById("login-form");
var logout = document.getElementById(`logout`);

window.onunload = function() {
    document.cookie = "cookiename=token ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    console.log("cookie" + document.cookie)
}
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

document.getElementById(`our-team`).onclick = () => location.href = `AboutUs.html`

window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    loginForm.onsubmit = async(e) => {
        e.preventDefault();
        var values = {
            email: document.getElementById("user-mail").value,
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
            .then(json => {
                if (!json.error) {
                    window.location.href = json.redirect;

                }
            })
            .catch(err => { console.log(err) });
    }

}, false)
logout.addEventListener(`click`, () => {
    fetch(`${hostName}${api.logout.route}`, {
            method: api.logout.method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(json => {
            if (!json.error) {
                window.location.href = json.redirect;
            }
        })
        .catch(err => { console.log(err) });
})