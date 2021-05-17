const newAccoutButton = document.getElementById(`new-account-button`)
const addNotificationtButton = document.getElementById(`add-notification-button`)

window.addEventListener(`api-fetched`, (ev) => {

    var values = {
        text: document.getElementById(`new-notification-text`).value,
        expiry_date: getElementById(`new-notification-date`).value
    }
    // newAccoutButton.addEventListener(`click`, async() => {
    //         fetch(`${hostName}${api.newAccount.route}`, {
    //                 method: api.newAccount.method,
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 withCredentials: true,
    //                 body: JSON.stringify(values),
    //             })
    //             .then(response => response.json())
    //             .then(json => handleLoginResponse(json))
    //             .catch(err => { alert(err) });
    //     })
    addNotificationtButton.addEventListener(`click`, async () => {
        fetch(`${hostName}${api.addNotification.route}`, {
            method: api.addNotification.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            // .then(json => handleLoginResponse(json))
            .catch(err => { alert(err) });
    })

}, false)