const logoutButton = document.getElementById(`logout-button`);

window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    console.log(`------------------`)


    // updateNotificationsBox()

    logoutButton.addEventListener(`click`, async () => {
        try {
            let result = await fetch(`${hostName}${api.logout.route}`, { method: api.logout.method, headers: { "Content-type": "application/json" } }).then(resp => resp.json())
            location.href = api.logout.location
            console.log(`redirected`)
        } catch (error) {
            console.log(error)
        }

    })

}, false)