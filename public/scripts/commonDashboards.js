const { not } = require("joi");

const logoutButton = document.getElementById(`logout-button`);

window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    console.log(`------------------`)


    updateNotificationsBox()

    logoutButton.addEventListener(`click`, async () => {
        try {
            let result = await fetch(`${hostName}${api.logout.route}`, { method: api.logout.method }).then(resp => resp.json())
            location.href = `/`
            console.log(`redirected`)
        } catch (error) {
            console.log(error)
        }

    })

}, false)

