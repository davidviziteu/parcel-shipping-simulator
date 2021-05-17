const getCodePasswordButton = document.getElementById("codePassword") //get-code-button poate
const newPassword = document.getElementById("newPassword")
const codeEmail = document.getElementById("codeEmail")
const newEmail = document.getElementById("newEmail")
const getCodeChangePasswordForm = document.getElementById(`get-code-form1`)


window.addEventListener(`api-fetched`, (ev) => {
    //pui tot codul aici
    getCodeChangePasswordForm.onsubmit = async (e) => {
        e.preventDefault();
        var value = {
            email: document.getElementById("email-field-change-password-form").value,
            type: "password"
        }
        fetch(`${hostName}/api/accounts`, { //------------------------faci asa la toate
            method: `PUT`,
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == 'not exist') { //si daca error == '"email" must be a valid email' ?   
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

    newPassword.addEventListener('click', () => {
        var value = {
            code: document.getElementById("code").value,
            password: document.getElementById("password").value,
            type: "password"
        }
        fetch(`${hostName}/api/accounts`, {
            method: "POST",
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
    })
    codeEmail.addEventListener('click', () => {
        var value = {
            email: document.getElementById("oldEmail").value,
            type: "email"
        }
        fetch(`${hostName}/api/accounts`, {
            method: "PUT",
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
    })

    newEmail.addEventListener('click', () => {
        var value = {
            code: document.getElementById("code1").value,
            email: document.getElementById("email").value,
            type: "email"
        }
        fetch(`${hostName}/api/accounts`, {
            method: "POST",
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
    })
}, false)
