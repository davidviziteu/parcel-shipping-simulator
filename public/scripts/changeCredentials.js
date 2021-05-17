const getCodeChangePasswordForm = document.getElementById(`get-code-form-password`)
const changePassword = document.getElementById(`patch-form-password`)
const getCodeChangeEmailForm = document.getElementById(`get-code-form-email`)
const changeEmail = document.getElementById(`patch-form-email`)


window.addEventListener(`api-fetched`, (ev) => {
    getCodeChangePasswordForm.onsubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData(getCodeChangePasswordForm)
        console.log(formdata)
        var value = {
            email: document.getElementById("email-field-change-password-form").value,
            type: "password"
        }
        fetch(`${hostName}${api.getCode.route}`, {
            method: api.getCode.method,
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == 'not exist') {
                    document.getElementById("errorEmailChangePassword").innerHTML = "Nu există un cont cu acest email!"
                    document.getElementById("errorEmailChangePassword").style.display = "block"
                }
                else {
                    document.getElementById("errorEmailChangePassword").innerHTML = "Codul a fost trimis pe email și este valabil 15 minute!"
                    document.getElementById("errorEmailChangePassword").style.display = "block"
                }
            })
            .catch(err => { console.log(err) });
    }

    changePassword.onsubmit = async (e) => {
        e.preventDefault();
        var value = {
            code: document.getElementById("code-for-change-password").value,
            password: document.getElementById("password").value,
            type: "password"
        }
        fetch(`${hostName}${api.changeCredentials.route}`, {
            method: api.changeCredentials.method,
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == 'not exist') {
                    document.getElementById("errorChangePassword").innerHTML = "Codul este greșit!"
                    document.getElementById("errorChangePassword").style.display = "block"
                }
                else {
                    document.getElementById("errorChangePassword").innerHTML = "Parola a fost resetată!"
                    document.getElementById("errorChangePassword").style.display = "block"
                }
            })
            .catch(err => { console.log(err) });
    }

    getCodeChangeEmailForm.onsubmit = async (e) => {
        e.preventDefault();
        var value = {
            email: document.getElementById("email-field-change-email-form").value,
            type: "email"
        }
        console.log(value)
        fetch(`${hostName}${api.getCode.route}`, {
            method: api.getCode.method,
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == 'not exist') {
                    document.getElementById("errorEmailChangeEmail").innerHTML = "Nu există un cont cu acest email!"
                    document.getElementById("errorEmailChangeEmail").style.display = "block"
                }
                else {
                    document.getElementById("errorEmailChangeEmail").innerHTML = "Codul a fost trimis pe email și este valabil 15 minute!"
                    document.getElementById("errorEmailChangeEmail").style.display = "block"
                }
            })
            .catch(err => { console.log(err) });
    }

    changeEmail.onsubmit = async (e) => {
        e.preventDefault();
        var value = {
            code: document.getElementById("code-for-change-email").value,
            email: document.getElementById("email").value,
            type: "email"
        }
        fetch(`${hostName}${api.changeCredentials.route}`, {
            method: api.changeCredentials.method,
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == 'not exist') {
                    document.getElementById("errorChangeEmail").innerHTML = "Codul este greșit!"
                    document.getElementById("errorChangeEmail").style.display = "block"
                }
                else if (json.error.includes("Duplicate")) {
                    document.getElementById("errorChangeEmail").innerHTML = "Emailul există deja!"
                    document.getElementById("errorChangeEmail").style.display = "block"
                }
                else {
                    document.getElementById("errorChangeEmail").innerHTML = "Emailul a fost resetat!"
                    document.getElementById("errorChangeEmail").style.display = "block"
                }
            })
            .catch(err => { console.log(err) });
    }
})
