const logoutButton = document.getElementById(`logout-button`);

window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    console.log(`------------------`)
    resetPasswordButton.addEventListener(`click`, () => location.href = api.changeCredentials.location)
    registerButton.addEventListener(`click`, () => location.href = api.newAccout.location)
    startOrderButton.addEventListener(`click`, () => location.href = api.newOrder.location)
    logoutButton.addEventListener(`click`, () => location.href = api.logout.location)
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
