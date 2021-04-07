function numeButoane() {
    for (var i = 0; i < listCity.length; i++) {
        var btn = document.createElement("button");
        var x = document.getElementsByClassName("button-container")[0].appendChild(btn);
        x.innerHTML = listCity[i];
        x.onclick = function () { statisticaNouaJudet(this.innerHTML) };
    }
}

window.onload = function () { numeButoane() }

function statisticaNouaJudet(value) {
    document.getElementById("none").style.display = "block"
    var children = document.getElementsByClassName("button-container")[1].children;
    document.getElementById("localChart").style.display = "none";
    for (var i = 0; i < children.length;)children[i].remove();
    for (local in cities[value]) {
        var btn = document.createElement("BUTTON");
        var x = document.getElementsByClassName("button-container")[1].appendChild(btn);
        x.innerHTML = cities[value][local];
        x.onclick = function () { statisticaNouaOras(this.innerHTML) };
    }
    google.charts.setOnLoadCallback(cityChart(value));
}

function statisticaNouaOras(value) {
    google.charts.setOnLoadCallback(localChart(value));
}

google.charts.load('current', { 'packages': ['corechart'] });

function cityChart(value) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Location');
    data.addColumn('number', 'Number of orders');

    for (local in cities[value]) {
        data.addRows([
            [cities[value][local], Math.floor(Math.random() * 10) + 1]
        ])
    }

    var options = {
        backgroundColor: 'transparent',
        height: '400',
        is3D: 'true',
        titleTextStyle: { color: '#FFFFFF' },
        legendTextStyle: { color: '#FFFFFF' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('cityChart'));
    chart.draw(data, options);
}

function localChart(value) {
    document.getElementById("localChart").style.display = "block";
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Months');
    data.addColumn('number', 'Number of orders');
    data.addRows([
        ['Ianuarie', Math.floor(Math.random() * 100) + 1],
        ['Februarie', Math.floor(Math.random() * 100) + 1],
        ['Martie', Math.floor(Math.random() * 100) + 1],
        ['Aprilie', Math.floor(Math.random() * 100) + 1],
        ['Mai', Math.floor(Math.random() * 100) + 1],
        ['Iunie', Math.floor(Math.random() * 100) + 1],
        ['Iulie', Math.floor(Math.random() * 100) + 1],
        ['August', Math.floor(Math.random() * 100) + 1],
        ['Septembrie', Math.floor(Math.random() * 100) + 1],
        ['Octombrie', Math.floor(Math.random() * 100) + 1],
        ['Noiembrie', Math.floor(Math.random() * 100) + 1],
        ['Decembrie', Math.floor(Math.random() * 100) + 1]
    ])

    var options = {
        title: 'Statistica pe orasul ' + value,
        backgroundColor: 'transparent',
        width: '100%',
        titleTextStyle: { color: '#FFFFFF' },
        legendTextStyle: { color: '#FFFFFF' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('localChart'));
    chart.draw(data, options);
}