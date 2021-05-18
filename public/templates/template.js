let hamburgerMenu = document.getElementById(`hamburger`)
let menu = document.getElementsByTagName(`menu`)[0]
console.log("loaded tamplets.js")
let api
const hostName = location.hostname == `localhost` ? `http://localhost:4000` : `https://parcel-shipping-simulator.herokuapp.com`
const fetchDone = new Event(`api-fetched`);


fetch(`${hostName}/api`, {
    method: "GET",
    headers: { "Content-type": "application/json" }
})
    .then(response => response.json())
    .then(json => {
        api = json
        if (api.success == `false`)
            throw new Error(api.error)
        window.dispatchEvent(fetchDone)
        console.log(`api: `)
        console.log(api)
    })
    .catch(error => {
        console.log(error)
        console.log(`^ cannot fetch GET ${hostName}/api`)
    })
// (async () => {
//     try {
//         let rawResponse = await fetch(`${hostName}/api`, {
//             method: "GET",
//             headers: { "Content-type": "application/json" }
//         })
//         api = rawResponse.json();
//         if (api.success == `false`)
//             throw new Error(api.error)
//         dispatchEvent(fetchDone)
//         console.log(`api: `)
//         console.log(api)
//     } catch (error) {
//         console.log(err)
//         console.log(`^ cannot fetch GET ${hostName}/api`)
//     }
// })()


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

function toggleStatus(status) {
    if (status == 'loading')
        document.getElementById("login-info").innerHTML = "Așteaptă!"
    else if (status == 'ok')
        document.getElementById("login-info").innerHTML = "Bună!"
    else if (status == 'network error')
        document.getElementById("login-info").innerHTML = "Eroare de conexiune!"
}

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


const updateNotificationsBox = async () => {
    try {
        let notificationBox = document.getElementById(`notifications-box`)
        notificationBox.appendChild()
        let notificatinos = await fetch(`${hostName}${api.getNotifications.route}`).then(resp => resp.json())
        //cam asa ar trebui facut
        if (api.loginType == `admin`) {
            for (item in notificatinos) {
                let p = document.createElement(`p`)
                p.innerHTML = item.text
                notificationBox.appendChild(p)
            }
        }
        else {
            for (item in notificatinos) {
                let p = document.createElement(`p`)
                p.innerHTML = `[${item.id}] ${item.text} ${item.exp_date}`
                notificationBox.appendChild(p) // tre sa fie doar textul de la notificare nu si restu
            }
        }
    } catch (error) {
        console.error(error)
    }
}

const fetchEstimatedCost = async (from, to) => {
    try {
        let resp = await fetch(`${hostName}${api.estimateCost.route}?from=${from}&to=${to}`, {
            method: api.estimateCost.method,
            // body: JSON.stringify({ from: from, to: to }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(data => data.json())
        return resp;
    } catch (error) {
        return error.message
    }
}

(async function loadEstimateCostBox() {
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
})()


function loadRegisterButton() {
    document.getElementById(`register-button`).addEventListener(`click`, () => location.href = api.newAccount.location)
}

async function trackAwb(awb) {
    try {
        let response = await fetch(`${hostName}${api.trackAwb.route}?awb=${awb}`,
            {
                method: api.trackAwb.method
            }
        )
    } catch (error) {

    }
}

function loadTrackAwbButton() {
    let awb = document.getElementById(`awb-input`).value
    document.getElementById(`track-awb-button`).addEventListener(`click`, trackAwb(awb))
}
