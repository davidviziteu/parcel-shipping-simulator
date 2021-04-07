var pic1 = document.getElementById("picture1");
var pic2 = document.getElementById("picture2");
var pic3 = document.getElementById("picture3");
var des1 = document.getElementById("description-box1");
var des2 = document.getElementById("description-box2");
var des3 = document.getElementById("description-box3");
var exit1 = document.getElementById("exit1");
var exit2 = document.getElementById("exit2");
var exit3 = document.getElementById("exit3");

window.onload = function() {
    des1.style.display = "none";
    des2.style.display = "none";
    des3.style.display = "none";
    pic3.disable = false;
}
pic1.addEventListener('click', function() {
    if (pic1.disable == true) {
        pic1.disable = false;
        des1.style.display = "none";
    } else {
        des1.style.display = "block";
        pic1.disable = true;
        des1.scrollIntoView({ behavior: "smooth" });
    }
    this.classList.toggle('disable');
});
exit1.addEventListener('click', function() {
    exit1.parentNode.style.display = "none";
    pic1.disable = false;
    pic1.classList.toggle('disable');
});
pic2.addEventListener('click', function() {
    if (pic2.disable == true) {
        pic2.disable = false;
        des2.style.display = "none";
    } else {
        pic2.disable = true;
        des2.style.display = "block";
        des2.scrollIntoView({ behavior: "smooth" });

    }
    this.classList.toggle('disable');
});
exit2.addEventListener('click', function() {
    exit2.parentNode.style.display = "none";
    pic2.disable = false;
    pic2.classList.toggle('disable');
});
pic3.addEventListener('click', function() {
    if (pic3.disable == true) {
        pic3.disable = false;
        des3.style.display = "none";
    } else {
        pic3.disable = true;
        des3.style.display = "block";
        des3.scrollIntoView({ behavior: "smooth" });
    }
    this.classList.toggle('disable');
});
exit3.addEventListener('click', function() {
    exit3.parentNode.style.display = "none";
    pic3.disable = false;
    pic3.classList.toggle('disable');
});