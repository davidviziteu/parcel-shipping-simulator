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
        if (n == (x.length) - 1) {
            document.getElementById("nextBtn").innerHTML = "Trimite";
        }
        if (currentbox == 1) document.getElementById("prevBtn").style.display = "none";
        else document.getElementById("prevBtn").style.display = "inline";
    }
}

function nextPrev(n) {
    console.log(n);
    if (n == -1) showbox(n);
    else {
        if (currentbox == 1) {
            var x = document.getElementById("fname").value;
            if (x == "") {
                document.getElementById("fname").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("fname").style.backgroundColor = "#fbfef7";
            x = document.getElementById("lname").value;
            if (x == "") {
                document.getElementById("lname").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("lname").style.backgroundColor = "#fbfef7";
            currentbox = currentbox + n;
            showbox(currentbox);
        }
        else if (currentbox == 2) {
            if (document.getElementById("citySelect").value == "") return false;
            var x = document.getElementById("adress").value;
            if (x == "") {
                document.getElementById("adress").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("adress").style.backgroundColor = "#fbfef7";
            currentbox = currentbox + n;
            showbox(currentbox);
        }
        else if (currentbox == 3) {
            var x = document.getElementById("email").value;
            if (x == "" || /\S+@\S+\.com/.test(x) == false) {
                document.getElementById("email").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("email").style.backgroundColor = "#fbfef7";
            var x = document.getElementById("pwd").value;
            if (x == "") {
                document.getElementById("pwd").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            var valid = false;
            if (x.toUpperCase() == x || x.toLowerCase() == x) return false;
            for (var i = 0; i < x.length; i++) {
                if (x[i] == 0) valid = true;
                if (x[i] == 1) valid = true;
                if (x[i] == 2) valid = true;
                if (x[i] == 3) valid = true;
                if (x[i] == 4) valid = true;
                if (x[i] == 5) valid = true;
                if (x[i] == 6) valid = true;
                if (x[i] == 7) valid = true;
                if (x[i] == 8) valid = true;
                if (x[i] == 9) valid = true;
            }
            if (valid == false) {
                document.getElementById("pwd").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("pwd").style.backgroundColor = "#fbfef7";
            var x = document.getElementById("phone").value;
            if (x.length != 10 || isNaN(x) || x[0] != 0 || x[1] != 7) {
                document.getElementById("phone").style.backgroundColor = "rgb(211, 110, 110)";
                return false;
            }
            document.getElementById("phone").style.backgroundColor = "#fbfef7";
            document.getElementById("form").submit();
        }
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

var clientName, consigneeName, clientAddress, consigneeAddress;

function call() {
    var c = '<option value="" disabled selected>Alege judetul</option>';
    for (i in listCity) {
        c += "<option>" + listCity[i] + "</option>";
    }
    document.getElementById("citySelect").innerHTML = c;
}

function local(value) {
    if (value.length == 0) document.getElementById("placeSelect1").innerHTML = "<option></option>";
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
