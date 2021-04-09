let awbTitle = document.getElementById(`awb-title`)
let resetEmail = document.getElementById(`resetEmail`);
let resetPass = document.getElementById(`resetPass`);
let detalii = document.getElementById(`DetaliiComanda`);
let reprogrameaza = document.getElementById(`reprogrameazaLivrarea`)
let email = document.getElementById(`email`);
let password = document.getElementById(`password`);
let forgot = document.getElementById(`forgot`);
let submit = document.getElementById(`continue`);
let expandableItems = document.getElementsByClassName(`expandable`);

window.onload = function() {
    resetEmail.style.display = "none";
    resetPass.style.display = "none";
    detalii.style.display = "none";
    reprogrameaza.style.display = "none";
}
awbTitle.addEventListener(`click`, () => {
    let newAwb = prompt(`Introdu noul AWB`)
    if (newAwb == null || newAwb.length == 0)
        return
    awbTitle.innerHTML = `AWB: ${newAwb}`
})
submit.addEventListener(`click`, () => {
    document.getElementById(`autentificare`).style.display = "none";
    detalii.style.display = "block";
    reprogrameaza.style.display = "block";
})

function showList(idList) {
    document.getElementById(idList).toggleAttribute(`hidden`)
}

function hide(idElement) {
    document.getElementById(idElement).style.display = "none";
}

forgot.addEventListener(`click`, () => {
    email.style.display = "none";
    password.style.display = "none";
    forgot.style.display = "none";
    submit.style.display = "none";
    resetEmail.style.display = "block";
    resetPass.style.display = "block";

})
for (let i = 0; i < expandableItems.length; ++i) {
    let bttn = expandableItems[i]
    bttn.addEventListener(`click`, function() {
        let associatedList = this.nextElementSibling
        if (associatedList && associatedList.tagName == `UL`) {
            associatedList.toggleAttribute(`hidden`)
            associatedList.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    })
}