function numeButoane() {
    for (var i = 0; i < listCity.length; i++) {
        var btn = document.createElement("button");
        var x = document.getElementsByClassName("button-container")[0].appendChild(btn);
        var btn = document.createElement("button");
        var y = document.getElementsByClassName("button-container")[1].appendChild(btn);
        var btn = document.createElement("button");
        var z = document.getElementsByClassName("button-container")[2].appendChild(btn);
        x.innerHTML = listCity[i];
        y.innerHTML = listCity[i];
        z.innerHTML = listCity[i];
        x.onclick = function () { statisticaJudet(this.innerHTML) };
        y.onclick = function () { statisticaJudetAccidente(this.innerHTML) };
        z.onclick = function () { statisticaJudetIntarzieri(this.innerHTML) };
    }
}

window.onload = function () { numeButoane() }


google.charts.load('current', { 'packages': ['corechart'] });

function statisticaJudet(value) {
    document.getElementById("localChart").style.display = "block"
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Months');
    data.addColumn('number', 'Number of orders');
    data.addRows([
        ['Ianuarie',],
        ['Februarie',],
        ['Martie',],
        ['Aprilie',],
        ['Mai',],
        ['Iunie',],
        ['Iulie',],
        ['August',],
        ['Septembrie',],
        ['Octombrie',],
        ['Noiembrie',],
        ['Decembrie',]
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

function statisticaJudetAccidente(value) {
    document.getElementById("accidenteChart").style.display = "block"
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Months');
    data.addColumn('number', 'Number of orders');
    data.addRows([
        ['Ianuarie',],
        ['Februarie',],
        ['Martie',],
        ['Aprilie',],
        ['Mai',],
        ['Iunie',],
        ['Iulie',],
        ['August',],
        ['Septembrie',],
        ['Octombrie',],
        ['Noiembrie',],
        ['Decembrie',]
    ])

    var options = {
        title: 'Statistica pe orasul ' + value,
        backgroundColor: 'transparent',
        width: '100%',
        titleTextStyle: { color: '#FFFFFF' },
        legendTextStyle: { color: '#FFFFFF' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('accidenteChart'));
    chart.draw(data, options);
}

function statisticaJudetIntarzieri(value) {
    document.getElementById("intarzieriChart").style.display = "block"
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Months');
    data.addColumn('number', 'Number of orders');
    data.addRows([
        ['Ianuarie',],
        ['Februarie',],
        ['Martie',],
        ['Aprilie',],
        ['Mai',],
        ['Iunie',],
        ['Iulie',],
        ['August',],
        ['Septembrie',],
        ['Octombrie',],
        ['Noiembrie',],
        ['Decembrie',]
    ])

    var options = {
        title: 'Statistica pe orasul ' + value,
        backgroundColor: 'transparent',
        width: '100%',
        titleTextStyle: { color: '#FFFFFF' },
        legendTextStyle: { color: '#FFFFFF' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('intarzieriChart'));
    chart.draw(data, options);
}