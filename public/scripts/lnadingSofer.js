function AWBS() {
    n = Math.floor(Math.random() * 10) + 1;
    for (var i = 0; i < n; i++) {
        var btn = document.createElement("BUTTON");
        var newAWB = document.getElementsByClassName("button-container")[3].appendChild(btn);
        newAWB.innerHTML = Math.floor(Math.random() * 100) + 10;
        awb = newAWB.innerHTML;
    }
}

window.onload = AWBS()