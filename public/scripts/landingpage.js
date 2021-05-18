
const loginForm = document.getElementById("login-form");
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