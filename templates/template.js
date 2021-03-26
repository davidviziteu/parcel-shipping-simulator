let hamburgerMenu = document.getElementById(`hamburger`)
let menu = document.getElementById(`menu`)

hamburgerMenu.addEventListener(`click`, () => {
    if (menu.className.includes(`hidden`))
        menu.className = ``
    else
        menu.className = `hidden`
})
