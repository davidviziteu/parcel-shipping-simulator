const logoutButton = document.getElementById(`logout-button`);
const helloText = document.getElementById(`hello-name`)
window.addEventListener(`api-fetched`, (ev) => {
    console.log(`api-fetched event:`)
    console.log(api)
    console.log(`------------------`)
    logoutButton.addEventListener(`click`, async() => {
        try {
            let result = await fetch(`${hostName}${api.logout.route}`, { method: api.logout.method, headers: { "Content-type": "application/json" } }).then(resp => resp.json())
            location.href = `/`
        } catch (error) {
            console.error(error)
        }
    })
    fetch(`${hostName}${api.helloWord.route}`, {
            method: api.helloWord.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then(response => response.json())
        .then(json => {
            if (!json.error)
                helloText.innerHTML = json.message;
        })
        .catch(err => console.log(err));

}, false)