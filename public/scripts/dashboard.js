let detaliiExpeditor = document.getElementById(`detalii-expeditor`)
let buttonExp = document.getElementById(`exp-bttn`)
let awbTitle = document.getElementById(`awb-title`)
let expandableItems = document.getElementsByClassName(`expandable`)


awbTitle.addEventListener(`click`, () => {
    let newAwb = prompt(`Introdu noul AWB`)
    if (newAwb == null || newAwb.length == 0)
        return
    awbTitle.innerHTML = `AWB: ${newAwb}`
})

for (let i = 0; i < expandableItems.length; ++i) {
    let bttn = expandableItems[i]
    bttn.addEventListener(`click`, function () {
        let associatedList = this.nextElementSibling
        if (associatedList && associatedList.tagName == `UL`) {
            associatedList.toggleAttribute(`hidden`)
            associatedList.scrollIntoView({ behavior: "smooth", block: "nearest" });
            if (i + 1 == expandableItems.length)
                associatedList.scrollIntoView({ behavior: "smooth" });
        }
    })
}

