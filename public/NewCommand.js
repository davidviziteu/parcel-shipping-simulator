var citiesByState = {
    Bucuresti: ["Sectorul 1", "Sectorul 2", "Sectorul 3", "Sectorul 4", "Sectorul 5", "Sectorul 6"]
}

function makeSubmenu(value) {
    if (value.length == 0) document.getElementById("placeSelect").innerHTML = "<option></option>";
    else {
        var placesOptions = "";
        for (cityId in citiesByState[value]) {
            placesOptions += "<option>" + citiesByState[value][cityId] + "</option>";
        }
        document.getElementById("placeSelect").innerHTML = placesOptions;
    }
}