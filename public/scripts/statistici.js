function numeButoane() {
    for (var i = 0; i < listCity.length; i++) {
        var btn = document.createElement("button");
        var x = document.getElementsByClassName("button-container")[0].appendChild(btn);
        x.innerHTML = listCity[i];
        x.onclick = function () { statisticaNoua(this.innerHTML) };
    }
}

function statisticaNoua(value) {
    document.getElementById("none").style.display = "block"
    var children = document.getElementsByClassName("button-container")[1].children;
    for (var i = 0; i < children.length;)console.log(children[i].remove());
    for (local in cities[value]) {
        var btn = document.createElement("BUTTON");
        var x = document.getElementsByClassName("button-container")[1].appendChild(btn);
        x.innerHTML = cities[value][local];
    }
}

window.onload = function () { numeButoane() }