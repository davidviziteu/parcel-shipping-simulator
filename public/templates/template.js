const hamburgerMenu = document.getElementById(`hamburger`)
const menu = document.getElementsByTagName(`menu`)[0]
const navBar = document.getElementsByTagName(`nav`)[0]
const loginForm = document.getElementById("login-form");

console.log("loaded templates.js")
let api
const hostName = location.hostname == `localhost` ? `http://localhost:4000` : `https://parcel-shipping-simulator.herokuapp.com`
const fetchDone = new Event(`api-fetched`);

function toggleStatus(status) {
    if (status == 'loading') {
        navBar.style.backgroundColor = "#0f5d82"
        document.getElementById("login-info").innerHTML = "⌛"
        // navBar.classList.add(`animated`)
    }
    else if (status == 'ok') {
        document.getElementById("login-info").innerHTML = "✅"
        // navBar.classList.remove(`animated`)
    }
    else if (status == 'network error') {
        document.getElementById("login-info").innerHTML = "📶❌"
        navBar.style.backgroundColor = "var(--orange-accent)"
    }
};

toggleStatus(`loading`);

// fetch(`${hostName}/api`, {
//     method: "GET",
//     headers: { "Content-type": "application/json" },
//     credentials: 'same-origin',
//     mode: 'same-origin', // no-cors, *cors, same-origin
// })
//     .then(response => response.json())
//     .then(json => {
//         api = json
//         if (api.success == `false`)
//             throw new Error(api.error)
//         window.dispatchEvent(fetchDone)
//         toggleStatus(`ok`)
//         console.log(`api: `)
//         console.log(api)
//     })
//     .catch(error => {
//         toggleStatus(`error`)
//         alert(`error fetching /api. are you on https?`)
//         console.log(error)
//         console.log(`^ cannot fetch GET ${hostName}/api`)
//     });

(async () => {
    try {
        let rawResponse = await fetch(`${hostName}/api`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        api = await rawResponse.json();
        if (api.success == `false`)
            throw new Error(api.error)
        dispatchEvent(fetchDone)
        toggleStatus(`ok`)
        console.log(`api: `)
        console.log(api)
    } catch (error) {
        console.error(error)
        toggleStatus(`error`)
        alert(`error fetching /api. are you on https?`)
        console.log(`^ cannot fetch GET ${hostName}/api`)
    }
})()


hamburgerMenu.addEventListener(`click`, () => {
    if (menu.className.includes(`hidden`)) {
        document.getElementById("hamburger").style.backgroundImage = "unset"
        document.getElementById("hamburger").innerHTML = "X"
        document.getElementById("hamburger").style.fontSize = "1.2em"
        document.getElementById("hamburger").style.color = "white"
        menu.className = ``;
        // disableScroll();
        var x = document.getElementsByTagName("body")[0];
        x.style.overflow = "hidden";
    }
    else {
        document.getElementById("hamburger").innerHTML = ""
        document.getElementById("hamburger").style.backgroundImage = "url(templates/hamburger-menu.jpg)"
        menu.className = `hidden`
        var x = document.getElementsByTagName("body")[0];
        x.style.overflowY = "scroll"
    }
})

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    var navbar = document.getElementsByTagName("nav")[0]
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        navbar.style.height = "3em";
        document.getElementById("here").style.padding = "10px 16px";
    } else {
        navbar.style.height = "3.5em";
        document.getElementById("here").style.padding = "14px 16px";
    }
}


var cities = {
    Cluj: ["Cluj-Napoca", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Turda"],
    Constanța: ["Constanţa", "Băneasa", "Cernavodă", "Eforie", "Hârşova", "Mangalia", "Medgidia", "Murfatlar", "Năvodari", "Negru Vodă", "Ovidiu", "Techirghiol"],
    Dolj: ["Craiova", "Băileşti", "Bechet", "Calafat", "Dăbuleni", "Filiaşi", "Segarcea"],
    Galați: ["Galaţi", "Beresti", "Târgu Bujor", "Tecuci"],
    Iași: ["Iaşi", "Hârlău", "Paşcani", "Podu Iloaiei", "Târgu Frumos"],
    Ilfov: ["București", "Bragadiru", "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popeşti - Leordeni", "Voluntari"],
    Oradea: ["Oradea", "Aleşd", "Beiuş", "Marghita", "Nucet", "Salonta", "Săcuieni", "Ştei", "Valea lui Mihai", "Vaşcău"],
    Sibiu: ["Sibiu", "Agnita", "Avrig", "Cisnădie", "Copşa Mică", "Dumbrăveni", "Mediaş", "Miercurea Sibiului", "Ocna Sibiului", "Sălişte", "Tălmaciu"],
    Timișoara: ["Timișoara", "Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sâncicolau Mare"]
}


var listCity = ["Ilfov", "Cluj", "Constanța", "Dolj", "Galați", "Iași", "Oradea", "Sibiu", "Timișoara"];


function handleLoginResponse(resp) {
    console.log(`handling response from front ${JSON.stringify(resp)}`)
    if (!resp.error)
        window.location.href = window.location;
    if (resp.error.toLowerCase().includes(`email`))
        document.getElementById("user-email").style.backgroundColor = "rgb(211, 110, 110)";

    if (resp.error.toLowerCase().includes(`password`))
        document.getElementById("user-password").style.backgroundColor = "rgb(211, 110, 110)";
};

const updateNotificationsBox = async () => {
    try {
        let notificationBox = document.getElementById(`notifications-box`)
        let rawResp = await fetch(`${hostName}${api.getNotifications.route}`, { headers: { "Content-type": "application/json" } })
        //cam asa ar trebui facut
        let respObject = await rawResp.json()
        let notifications = respObject.data
        console.log(notifications);
        // if (rawResp.ok)
        if (api.loginType != `admin`)
            notifications.forEach(item => {
                let p = document.createElement(`p`)
                p.innerHTML = item.text
                notificationBox.appendChild(p)
            })

        else
            notifications.forEach(item => {
                let p = document.createElement(`p`)
                item.expiry_date
                    ? p.innerHTML = `[${item.id}] ${item.text} expiră: ${item.expiry_date}`
                    : p.innerHTML = `[${item.id}] ${item.text} fără dată de expirare`
                notificationBox.appendChild(p)
            })
    } catch (error) {
        console.error(error);
    }
}


async function fetchEstimatedCost(from, to) {
    try {
        let resp = await fetch(`${hostName}${api.estimateCost.route}?from=${from}&to=${to}`, {
            method: api.estimateCost.method,
            // body: JSON.stringify({ from: from, to: to }),
            headers: { "Content-type": "application/json" }
        }).then(data => data.json())
        return resp;
    } catch (error) {
        return error.message
    }
}

async function loadEstimateCostBox() {
    const sourceSelector = document.getElementById(`judet-exp`)
    const destinationSelector = document.getElementById(`judet-dest`)
    const estimateCostButton = document.getElementById(`estimate-cost-button`)
    const totalCostText = document.getElementById(`total-cost`)

    for (let element in cities) {
        sourceSelector.appendChild(new Option(element))
        destinationSelector.appendChild(new Option(element))
    }

    estimateCostButton.addEventListener(`click`, async () => {
        let from = sourceSelector.value
        let to = destinationSelector.value
        if (!to && !from)
            totalCostText.innerHTML = `Alegeți județul expeditorului și al destinatarului`
        else if (!from)
            totalCostText.innerHTML = `Alegeți județul expeditorului`
        else if (!to)
            totalCostText.innerHTML = `Alegeți județul destinatarului`
        else {
            let response = await fetchEstimatedCost(from, to)
            if (response)
                totalCostText.innerHTML = `raw response: ${JSON.stringify(response)}. add functionalities. templates.js function loadEstimateCostBox()`
            return
            if (to == from)
                totalCostText.innerHTML = `Expediere în același județ (${from}): aproximativ ${response} RON`
            else totalCostText.innerHTML = `${from} -> ${to}: aproximativ ${response} RON`
        }
    })
}


async function loadRegisterButton() {
    try {
        document.getElementById(`register-button`).addEventListener(`click`, () => location.href = api.newAccount.location)
    } catch (error) {
    }
}

async function trackAwb() {
    let awb = document.getElementById(`awb-input`).value
    try {
        let response = await fetch(`${hostName}${api.trackAwb.route}?awb=${awb}`, { method: api.trackAwb.method, headers: { "Content-type": "application/json" } })
        if (!response.ok)
            return document.getElementById("awb-input").style.backgroundColor = "rgb(211, 110, 110)"
        const responseBody = await response.json()
        sessionStorage.setItem(`fetched-awb`, awb)
        sessionStorage.setItem(`order-details`, JSON.stringify(responseBody))
        window.location = api.trackAwb.location
    } catch (error) {
        if (error instanceof QuotaExceededError)
            alert(`error saving awb string to session storage. did you disable session storage?`)
    }
}

function loadTrackAwbBox() {
    try {
        let awbField = document.getElementById("awb-input")
        awbField.addEventListener(`click`, () => awbField.style.backgroundColor = "#fbfef7")
        awbField.addEventListener(`keypress`, (event) => {
            if (event.key == `Enter`) {
                event.preventDefault()
                trackAwb()
            }
        })
        document.getElementById(`track-awb-button`).addEventListener(`click`, trackAwb)
    } catch (error) {
    }
}

function loadOurLocationsButton() {
    try {
        document.getElementById("our-locations").addEventListener(`click`, () => window.location = api.ourLocations.location)
    } catch (error) {

    }
}

async function login() {
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
}

window.addEventListener(`api-fetched`, async (ev) => {
    updateNotificationsBox();
    setInterval(updateNotificationsBox(), 60000, null); //la 1 minut
    loadTrackAwbBox();
    loadEstimateCostBox();
    loadOurLocationsButton();
    loadRegisterButton();
}, false)
