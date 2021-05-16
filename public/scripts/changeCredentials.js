var codePassword = document.getElementById("codePassword")
var newPassword = document.getElementById("newPassword")

codePassword.addEventListener('click', () => {
    var value = {
        email: document.getElementById("emailPassword").value
    }
    fetch(`http://localhost:4000/api/accounts`, {
        method: "PUT",
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
})

newPassword.addEventListener('click', () => {
    var value = {
        code: document.getElementById("code").value,
        password: document.getElementById("password").value
    }
    fetch(`http://localhost:4000/api/accounts`, {
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