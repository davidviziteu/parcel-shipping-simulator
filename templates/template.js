let hamburgerMenu = document.getElementById(`hamburger`)
let menu = document.getElementById(`menu`)

hamburgerMenu.addEventListener(`click`, () => {
    if (menu.className.includes(`hidden`)) {
        menu.className = ``;
        hamburgerMenu.innerText = "X"
        // disableScroll();
        var x = document.getElementsByTagName("BODY")[0];
        x.style.overflow = "hidden";
    }
    else {
        menu.className = `hidden`
        // enableScroll();
        hamburgerMenu.innerText = "Menu"
        var x = document.getElementsByTagName("BODY")[0];
        x.style.overflowY = "scroll"
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

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        document.getElementById("navbar").style.height = "3em";
        document.getElementById("here").style.padding = "10px 16px";
    } else {
        document.getElementById("navbar").style.height = "3.5em";
        document.getElementById("here").style.padding = "14px 16px";
    }
}