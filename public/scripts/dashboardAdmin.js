const newAccoutButton = document.getElementById(`new-account-button`)
const addNotificationtButton = document.getElementById(`add-notification-button`)
const addNotificationForm = document.getElementById(`add-notification-form`);
window.addEventListener(`api-fetched`, (ev) => {


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
    // addNotificationtButton.addEventListener(`click`, async () => {
    //     fetch(`${hostName}${api.addNotification.route}`, {
    //         method: api.addNotification.method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         withCredentials: true,
    //         body: JSON.stringify(values),
    //     })
    //         .then(response => response.json())
    //         // .then(json => handleLoginResponse(json))
    //         .catch(err => { alert(err) });
    // })
    addNotificationForm.onsubmit = async(e) => {
        e.preventDefault();
        var values = {
            text: document.getElementById(`new-notification-text`).value,
            expiry_date: document.getElementById(`new-notification-date`).value
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
    }


}, false)