const newAccount = document.getElementById(`form-create-account`)
const addNotificationtButton = document.getElementById(`add-notification-button`)
const addNotificationForm = document.getElementById(`add-notification-form`);
const removeNotificationForm = document.getElementById(`remove-notification`);
const addCarForm = document.getElementById(`add-car-form`)
const getEmployee = document.getElementById(`get-employee`)
const deleteAccount = document.getElementById(`delete-account-form`)

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
                    } else if (json.error.includes("phone"))
                        document.getElementById("status-account").innerHTML = "Introduce-ți un număr de telefon valid!"
                } else {
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

    removeNotificationForm.onsubmit = async (e) => {
        e.preventDefault();
        var values = {
            id: document.getElementById(`delete-notification-id`).value
        }
        fetch(`${hostName}${api.deleteNotification.route}`, {
            method: api.deleteNotification.method,
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => { response.json() })
            .then(json => {
                console.log(json)
            })
    }

    getEmployee.onsubmit = async (e) => {
        e.preventDefault()
        values = {
            email: document.getElementById("employee-search").value
        }
        fetch(`${hostName}${api.getInfoUser.route}?email=${values.email}`, {
            method: api.getInfoUser.method,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.success == false)
                    document.getElementById("status-employee-search").innerHTML = "Nu există niciun cont cu acest email!"
                else {
                    document.getElementById("status-employee-search").innerHTML = `Nume: ${json.surname} Prenume: ${json.name} Telefon: ${json.phone}`
                }
            })
            .catch(err => { console.log(err) });
    }
    deleteAccount.onsubmit = async (e) => {
        e.preventDefault()
        values = {
            email: document.getElementById("remove-employee-account-email").value
        }
        fetch(`${hostName}${api.deleteAccount.route}`, {
            method: api.deleteAccount.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == "not exist") {
                    document.getElementById("status-account").innerHTML = "Nu există un cont cu acest email!"
                } else {
                    document.getElementById("status-account").innerHTML = "Contul a fost șters!"
                }
            })
            .catch(err => { console.log(err) });
    }
    addCarForm.onsubmit = async (e) => {
        e.preventDefault();
        var values = {
            registration_number: document.getElementById(`nr-inmatriculare`).value,
            status: document.getElementById("car-status").value

        }
        fetch(`${hostName}${api.modifyCar.route}`, {
            method: api.modifyCar.method,
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)

            })
            .catch(err => {
                console.log(err)
            });
    }


})