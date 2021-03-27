let hamburgerMenu = document.getElementById(`hamburger`)
let menu = document.getElementById(`menu`)

hamburgerMenu.addEventListener(`click`, () => {
    if (menu.className.includes(`hidden`)) {
        menu.className = ``;
        // disableScroll();
    }
    else {
        menu.className = `hidden`
        // enableScroll();
    }
})

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}