var pic1 = document.getElementById("picture1");
var pic2 = document.getElementById("picture2");
var pic3 = document.getElementById("picture3");
var des1 = document.getElementById("David");
var des2 = document.getElementById("Andreea");
var des3 = document.getElementById("Bogdan");
pic1.addEventListener('click', function() {
    if (pic1.disable == true) {
        pic1.disable = false;
    } else {
        pic1.disable = true;
        des1.innerHTML = "David-Andrei Viziteu";
    }

    this.classList.toggle('disable');
});
pic2.addEventListener('click', function() {
    if (pic2.disable == true) {
        pic2.disable = false;
    } else {
        pic2.disable = true;
        des2.innerHTML = "Andreea-Mădălina Vînă";
    }

    this.classList.toggle('disable');
});
pic3.addEventListener('click', function() {
    if (pic3.disable == true) {
        pic3.disable = false;
    } else {
        pic3.disable = true;
        des3.innerHTML = "Bogdan-Constantin Bujor";
    }

    this.classList.toggle('disable');
});