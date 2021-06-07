const hamburgerMenu = document.getElementById(`hamburger`)
const menu = document.getElementsByTagName(`menu`)[0]
const navBar = document.getElementsByTagName(`nav`)[0]
const loginForm = document.getElementById("login-form");
const estimateCostForm = document.getElementById(`estimate-cost-form`)

console.log("loaded templates.js")
let api
const hostName = location.hostname == `localhost` ? `http://localhost:4000` : `https://parcel-shipping-simulator.herokuapp.com`
const fetchDone = new Event(`api-fetched`);

function toggleStatus(status) {
    if (status == 'loading') {
        navBar.style.backgroundColor = "#0f5d82"
        document.getElementById("login-info").innerHTML = "⌛"
        navBar.style.backgroundColor = "#e5c8c19c"
    } else if (status == 'ok') {
        document.getElementById("login-info").innerHTML = "✅"
            // navBar.classList.remove(`animated`)
        navBar.style.backgroundColor = "rgb(15, 93, 130)"
    } else if (status == 'network error') {
        document.getElementById("login-info").innerHTML = "📶❌"
        navBar.style.backgroundColor = "var(--orange-accent)"
    } else
        alert(`invalid type given as parameters somewhere for toggleStatus function.
            available parameters: 'loading', 'ok', 'network error'`)
};



(function(ns, fetch) {
    if (typeof fetch !== 'function') return;
    let customHeaders = {
        "appVersion": navigator.appVersion,
        "platform": navigator.platform
    }

    ns.fetch = function() {



        toggleStatus(`loading`);
        if (!arguments[`1`]) {
            arguments[`1`] = {}
            arguments[`1`].headers = customHeaders
        } else if (arguments[`1`].headers)
            arguments[`1`].headers = {...arguments[`1`].headers, ...customHeaders }
        else arguments[`1`].headers = customHeaders

        var out = fetch.apply(this, arguments);
        console.log(arguments);

        out.then(({ ok }) => toggleStatus(`ok`))
        out.catch(({ err }) => toggleStatus(`network error`))
        return out;
    }

}(window, window.fetch));


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



(async() => {
    try {
        let rawResponse = await fetch(`${hostName}/api`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        api = await rawResponse.json();
        if (api.success == `false`)
            throw new Error(api.error)
        dispatchEvent(fetchDone)
        console.log(`api: `)
        console.log(api)
    } catch (error) {
        console.error(error)
        toggleStatus(`error`)
        alert(`error fetching /api. are you on https?`)
        console.log(`^ cannot fetch GET ${hostName}/api`)
    }
})();


function newMenuItem(href, text) {
    return `<li><a href="${href}" aria-label="${text}">${text}</a></li>`
}

async function generateMenu() {
    const mainMenu = document.getElementById(`main-menu`)
    mainMenu.innerHTML = ``
    mainMenu.innerHTML += newMenuItem(`/`, `Pagină de start`)
    mainMenu.innerHTML += newMenuItem(`/Locatii.html`, `Locații`)
    mainMenu.innerHTML += newMenuItem(`/AboutUs.html`, `Despre noi`)
    mainMenu.innerHTML += newMenuItem(`/`, `Verificare AWB`)
    mainMenu.innerHTML += newMenuItem(`/Contact.html`, `Contact`)
    mainMenu.innerHTML += newMenuItem(`https://davidviziteu.github.io/parcel-shipping-simulator/`, `Documentație Scholarly`)
    if (api) {
        if (api.loginType == `admin`) {
            mainMenu.innerHTML += newMenuItem(`Statistici.html`, `Statistici`)
        }
        if (api.loginType) {
            let li = document.createElement(`li`)
            let a = document.createElement(`a`)
            a.innerHTML = `Ieși din cont`
            a.addEventListener(`click`, async() => {
                try {
                    let result = await fetch(`${hostName}${api.logout.route}`, { method: api.logout.method, headers: { "Content-type": "application/json" } }).then(resp => resp.json())
                    location.href = `/`
                } catch (error) {
                    console.error(error)
                }
            })
            li.appendChild(a)
            mainMenu.appendChild(li)
        }
    }
}

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
    } else {
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

        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}

window.onscroll = function() { scrollFunction(); };

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
        return window.location.href = window.location;
    if (resp.error.toLowerCase().includes(`email`))
        document.getElementById("user-email").style.backgroundColor = "rgb(211, 110, 110)";

    if (resp.error.toLowerCase().includes(`password`))
        document.getElementById("user-password").style.backgroundColor = "rgb(211, 110, 110)";
};

const updateNotificationsBox = async() => {
    try {
        let notificationBox = document.getElementById(`notifications-box`)
        let rawResp = await fetch(`${hostName}${api.getNotifications.route}`, { headers: { "Content-type": "application/json" } })
        let respObject = await rawResp.json()
        let notifications = respObject.data
        notificationBox.childNodes.forEach(child => {
            if (child.nodeName == `P`)
                notificationBox.removeChild(child)
        })
        if (api.loginType != `admin`)
            notifications.forEach(item => {
                let p = document.createElement(`p`)
                p.innerHTML = item.text
                notificationBox.appendChild(p)
            })

        else
            notifications.forEach(item => {
                let p = document.createElement(`p`)
                item.expiry_date ?
                    p.innerHTML = `[${item.id}] ${item.text} expiră: ${item.expiry_date}` :
                    p.innerHTML = `[${item.id}] ${item.text} fără dată de expirare`
                notificationBox.appendChild(p)
            })
    } catch (error) {
        if (error.name != `TypeError`)
            console.error(error)
    }
}

async function loadEstimateCostBox() {
    const sourceSelector = document.getElementById(`judet-exp`)
    const destinationSelector = document.getElementById(`judet-dest`)
    const totalCostText = document.getElementById(`total-cost`)
    if (!sourceSelector || !destinationSelector || !totalCostText) return
    for (let element in cities) {
        sourceSelector.appendChild(new Option(element))
        destinationSelector.appendChild(new Option(element))
    }

    estimateCostForm.onsubmit = async(e) => {
        e.preventDefault();
        var from = sourceSelector.value
        var to = destinationSelector.value
        var from2 = from.replace('ș', 's');
        from = from2;
        from2 = from.replace('ț', 't');
        from = from2;
        var to2 = to.replace('ș', 's');
        to = to2;
        to2 = to.replace('ț', 't');
        to = to2;
        if (!to && !from)
            totalCostText.innerHTML = `Alegeți județul expeditorului și al destinatarului`
        else if (!from)
            totalCostText.innerHTML = `Alegeți județul expeditorului`
        else if (!to)
            totalCostText.innerHTML = `Alegeți județul destinatarului`
        else {
            fetch(`${hostName}${api.estimateCost.route}?source=${from}&destination=${to}`, {
                    method: api.estimateCost.method,
                    withCredentials: true,
                })
                .then(response => response.json())
                .then(json => {
                    totalCostText.innerHTML = "Pretul estimativ este : " + json.data + " ron";
                })
                .catch(err => { console.log(err) });
        }
    }
}


async function loadRegisterButton() {
    try {
        document.getElementById(`register-button`).addEventListener(`click`, () => location.href = api.newAccount.location)
    } catch (error) {
        if (error.name != `TypeError`)
            console.error(error)
    }
}

async function trackAwb() {
    try {
        let awb = document.getElementById(`awb-input`).value
        let response = await fetch(`${hostName}${api.trackAwb.route}?awb=${awb}`, { method: api.trackAwb.method, headers: { "Content-type": "application/json" } })
        if (!response.ok) {
            return document.getElementById("awb-input").style.backgroundColor = "rgb(211, 110, 110)"
        }
        const responseBody = await response.json()
        sessionStorage.setItem(`fetched-awb`, awb)
        sessionStorage.setItem(`order-details`, JSON.stringify(responseBody))
        window.location = api.trackAwb.location
    } catch (error) {
        if (error instanceof QuotaExceededError)
            alert(`error saving awb string to session storage. did you disable session storage?`)
        if (error.name != `TypeError`)
            console.error(error)
    }
}

function loadTrackAwbBox() {
    try {
        let awbField = document.getElementById("awb-input")
        if (!awbField) return
        awbField.addEventListener(`click`, () => awbField.style.backgroundColor = "#fbfef7")
        awbField.addEventListener(`keypress`, (event) => {
            if (event.key == `Enter`) {
                event.preventDefault()
                trackAwb()
            }
        })
        document.getElementById(`track-awb-button`).addEventListener(`click`, trackAwb)
    } catch (error) {
        if (error.name != `TypeError`)
            console.error(error)
    }
}

function loadOurLocationsButton() {
    try {
        document.getElementById("our-locations").addEventListener(`click`, () => window.location = api.ourLocations.location)
    } catch (error) {
        if (error.name != `TypeError`)
            console.error(error)
    }
}

async function login() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return
    loginForm.onsubmit = async(e) => {
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

window.addEventListener(`api-fetched`, async(ev) => {
    generateMenu();
    updateNotificationsBox();
    setTimeout(() => updateNotificationsBox(), 360000, null); //la 6 minute
    loadTrackAwbBox();
    loadEstimateCostBox();
    loadOurLocationsButton();
    loadRegisterButton();
}, false)