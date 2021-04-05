document.getElementById("forgot").addEventListener("click", hideButton);

function hideButton() {
    document.getElementById("continue").style.display = "none";
    document.getElementById("forgot").style.display = "none";
    document.getElementById("password").style.display = "none";
    document.getElementById("reset").style.display = "block";
}
window.onload = function() {
    document.getElementById("reset").style.display = "none";
}