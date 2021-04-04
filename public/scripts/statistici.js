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
    for (var i = 0; i < children.length;)children[i].remove();
    for (local in cities[value]) {
        var btn = document.createElement("BUTTON");
        var x = document.getElementsByClassName("button-container")[1].appendChild(btn);
        x.innerHTML = cities[value][local];
    }
    google.charts.setOnLoadCallback(drawChart(value));
}

window.onload = function () { numeButoane() }

google.charts.load('current', { 'packages': ['corechart'] });

function drawChart(value) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Location');
    data.addColumn('number', 'Number of orders');

    for (local in cities[value]) {
        data.addRows([
            [cities[value][local], 2.5]
        ])
    }

    var options = {
        title: 'Statistica pe orasul ' + value,
        backgroundColor: 'transparent',
        height: '400',
        is3D: 'true'
    };

    var chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
}