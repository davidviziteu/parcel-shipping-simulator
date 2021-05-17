const newAccount = document.getElementById(`form-create-account`)
const addNotificationtButton = document.getElementById(`add-notification-button`)
const addNotificationForm = document.getElementById(`add-notification-form`);
window.addEventListener(`api-fetched`, (ev) => {

    newAccount.onsubmit = async (e) => {
        e.preventDefault();
        var values = {
            surname: document.getElementById("surname-form-create-account").value,
            name: document.getElementById("name-form-create-account").value,
            email: document.getElementById("email-form-create-account").value,
            password: document.getElementById("password-form-create-account").value,
            phone: document.getElementById("phone-form-create-account").value,
            county: document.getElementById("county-form-create-account").value,
            type: document.getElementById("typeAccount-form-create-account").value
        }
        fetch(`${hostName}${api.newAccount.route}`, {
            method: api.newAccount.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(json => {
                if (json.error != undefined) {
                    if (json.error.includes("Duplicate")) {
                        document.getElementById("status-account").innerHTML = "Există deja un cont cu acest email!"
                    }
                    else if (json.error.includes("phone"))
                        document.getElementById("status-account").innerHTML = "Introduce-ți un număr de telefon valid!"
                }
                else {
                    document.getElementById("status-account").innerHTML = "Cont creat!"
                }
            })
            .catch(err => { console.log(err) });
    }

    addNotificationtButton.addEventListener(`click`, async () => {
        var values = {
            text: document.getElementById(`new-notification-text`).value,
            expiry_date: getElementById(`new-notification-date`).value
        }
        fetch(`${hostName}${api.addNotification.route}`, {
            method: api.addNotification.method,
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {

            })
            .catch(err => { console.log(err) });
    })


})