let detaliiExpeditor = document.getElementById(`detalii-expeditor`)
let buttonExp = document.getElementById(`exp-bttn`)
let awbTitle = document.getElementById(`awb-title`)


awbTitle.addEventListener(`click`, () => {
    let newAwb = prompt(`Introdu noul AWB`)
    if (newAwb == null || newAwb.length == 0)
        return
    awbTitle.innerHTML = `AWB: ${newAwb}`
})

function showList(idList) {
    document.getElementById(idList).toggleAttribute(`hidden`)
}