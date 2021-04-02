let hamburgerMenu = document.getElementById(`hamburger`)
let menu = document.getElementById(`menu`)

hamburgerMenu.addEventListener(`click`, () => {
    if (menu.className.includes(`hidden`)) {
        menu.className = ``;
        // disableScroll();
        var x = document.getElementsByTagName("BODY")[0];
        x.style.overflow = "hidden";
    }
    else {
        menu.className = `hidden`
        // enableScroll();
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


var cities = {
    Cluj: ["Câmpia Turzii", "Cluj-Napoca", "Dej", "Gherla", "Huedin", "Turda"],
    Constanta: ["Băneasa", "Cernavodă", "Constanţa", "Eforie", "Hârşova", "Mangalia", "Medgidia", "Murfatlar", "Năvodari", "Negru Vodă", "Ovidiu", "Techirghiol"],
    Dolj: ["Băileşti", "Bechet", "Calafat", "Craiova", "Dăbuleni", "Filiaşi", "Segarcea"],
    Galati: ["Beresti", "Galaţi", "Târgu Bujor", "Tecuci"],
    Iasi: ["Hârlău", "Iaşi", "Paşcani", "Podu Iloaiei", "Târgu Frumos"],
    Ilfov: ["Bragadiru", "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popeşti - Leordeni", "Voluntari"],
    Oradea: ["Aleşd", "Beiuş", "Marghita", "Nucet", "Oradea", "Salonta", "Săcuieni", "Ştei", "Valea lui Mihai", "Vaşcău"],
    Sibiu: ["Agnita", "Avrig", "Cisnădie", "Copşa Mică", "Dumbrăveni", "Mediaş", "Miercurea Sibiului", "Ocna Sibiului", "Sălişte", "Sibiu", "Tălmaciu"],
    Timisoara: ["Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sâncicolau Mare", "Timișoara"]
}

var listCity = ["Ilfov", "Cluj", "Constanta", "Craiova", "Galati", "Iasi", "Oradea", "Sibiu", "Timisoara"];
