let newOrderButton = document.getElementById(`new-order-button`)
window.addEventListener(`api-fetched`, (ev) => {
    console.log(api)
    newOrderButton.addEventListener(`click`, () => location.href = api.newOrder.location)
}, false)
