var fname = document.getElementById("fname").value;
var lname = document.getElementById("lname").value;
var adress = document.getElementById("adress").value;
var email = document.getElementById("email").value;
var pwd = document.getElementById("pwd").value;
var phone = document.getElementById("phone").value;

currentbox = 1;
showbox(currentbox);

function showbox(n) {
    var x = document.getElementsByClassName("box");
    if (n == -1) {
        x[currentbox].style.display = "none";
        currentbox = currentbox + n;
        x[currentbox].style.display = "block";
        if (currentbox == 1) document.getElementById("prevBtn").style.display = "none";
        if (currentbox == 2) document.getElementById("nextBtn").innerHTML = "Urmatorul";
    }
    else {
        if (n != 1) x[n - 1].style.display = "none";
        x[n].style.display = "block";
        if (currentbox == 3) {
            document.getElementById("nextBtn").innerHTML = "Trimite";
        }
        if (currentbox == 1) document.getElementById("prevBtn").style.display = "none";
        else document.getElementById("prevBtn").style.display = "inline";
    }
}

function nextPrev(n) {
    if (n == -1) showbox(n);
    else {
        if (currentbox == 1) {
            fname = document.getElementById("fname").value;
            if (fname == "") {
                document.getElementById("fname").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("fname").style.backgroundColor = "#fbfef7";
            lname = document.getElementById("lname").value;
            if (lname == "") {
                document.getElementById("lname").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("lname").style.backgroundColor = "#fbfef7";
            currentbox = currentbox + n;
            showbox(currentbox);
        }
        else if (currentbox == 2) {
            if (document.getElementById("citySelect").value == "") return false;
            adress = document.getElementById("adress").value;
            if (adress == "") {
                document.getElementById("adress").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("adress").style.backgroundColor = "#fbfef7";
            currentbox = currentbox + n;
            showbox(currentbox);
        }
        else if (currentbox == 3) {
            email = document.getElementById("email").value;
            if (email == "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
                document.getElementById("email").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("email").style.backgroundColor = "#fbfef7";
            pwd = document.getElementById("pwd").value;
            if (pwd == "") {
                document.getElementById("pwd").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            var valid = false;
            if (pwd.toUpperCase() == pwd || pwd.toLowerCase() == pwd) return false;
            for (var i = 0; i < pwd.length; i++) {
                if (pwd[i] == 0) valid = true;
                if (pwd[i] == 1) valid = true;
                if (pwd[i] == 2) valid = true;
                if (pwd[i] == 3) valid = true;
                if (pwd[i] == 4) valid = true;
                if (pwd[i] == 5) valid = true;
                if (pwd[i] == 6) valid = true;
                if (pwd[i] == 7) valid = true;
                if (pwd[i] == 8) valid = true;
                if (pwd[i] == 9) valid = true;
            }
            if (valid == false) {
                document.getElementById("pwd").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("pwd").style.backgroundColor = "#fbfef7";
            phone = document.getElementById("phone").value;
            if (phone.length != 10 || isNaN(phone) || phone[0] != 0 || phone[1] != 7) {
                document.getElementById("phone").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            var x = document.getElementsByClassName("button-container")
            var node = document.createElement("img");
            node.setAttribute("src", "./assets/loading.gif")
            node.style.width = "40px"
            x[2].innerHTML = ""
            x[2].appendChild(node)
            document.getElementById("email-nevalid").style.display = "none";
            var values = {
                surname: fname,
                name: lname,
                email: email,
                password: pwd,
                phone: phone,
                county: document.getElementById("citySelect").value,
                city: document.getElementById("placeSelect").value,
                address: document.getElementById("adress").value
            }
            fetch(`${hostName}${api.newAccount.route}`, {
                method: api.newAccount.method,
                body: JSON.stringify(values),
                headers: {
                    "Content-type": "application/json",
                    "appCodeName": navigator.appCodeName,
                    "appName": navigator.appName,
                    "appVersion": navigator.appVersion,
                    "product": navigator.product,
                    "platform": navigator.platform
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    if (json.error != undefined && json.error.includes("Duplicate")) {
                        var children = document.getElementsByClassName("button-container")[2].children
                        children[0].remove()
                        var x = document.getElementsByClassName("button-container")
                        x[2].innerHTML = "Trimite"
                        document.getElementById("email-nevalid").style.display = "block";
                        document.getElementById("email").style.backgroundColor = "rgb(211, 110, 110)";
                    }
                    else {
                        window.location.href = json.redirect;
                    }
                })
                .catch(err => { console.log(err) });
        }
    }
}

var clientName, consigneeName, clientAddress, consigneeAddress;

function call() {
    var c = '<option value="" disabled selected>Alege judetul</option>';
    for (i in listCity) {
        c += "<option>" + listCity[i] + "</option>";
    }
    document.getElementById("citySelect").innerHTML = c;
}

function local(value) {
    if (value.length == 0) document.getElementById("placeSelect").innerHTML = "<option></option>";
    else {
        var placesOptions = "";
        for (cityId in cities[value]) {
            placesOptions += "<option>" + cities[value][cityId] + "</option>";
        }
        document.getElementById("placeSelect").innerHTML = placesOptions;
    }
}

window.onload = function () {
    call();
}