function numeButoane() {
    for (var i = 0; i < listCity.length; i++) {
        var btn = document.createElement("button");
        var x = document.getElementsByClassName("button-container")[0].appendChild(btn);
        x.innerHTML = listCity[i];
        x.onclick = function () { statisticaJudet(this.innerHTML) };
    }
    var btn = document.createElement("button");
    var y = document.getElementsByClassName("button-container")[1].appendChild(btn);
    y.innerHTML = "Vezi statisitica nationala despre accidente"
    y.onclick = function () { statisticaAccidente() };
    var btn = document.createElement("button");
    var z = document.getElementsByClassName("button-container")[2].appendChild(btn);
    z.innerHTML = "Vezi statisitica nationala despre defectiuni"
    z.onclick = function () { statisticaStricaciuni() };
}

window.onload = function () { numeButoane() }


google.charts.load('current', { 'packages': ['corechart'] });

function statisticaJudet(value) {
    fetch(`${hostName}${api.getInfoStatistics.route}?county=${value}`, {
        method: api.getDetailsAwbforDriver.method,
        headers: { "Content-type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            document.getElementById("localChart").style.display = "block"
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Months');
            data.addColumn('number', 'Number of orders');
            data.addRows([
                ['Ianuarie', json.results.January],
                ['Februarie', json.results.February],
                ['Martie', json.results.March],
                ['Aprilie', json.results.April],
                ['Mai', json.results.May],
                ['Iunie', json.results.June],
                ['Iulie', json.results.July],
                ['August', json.results.August],
                ['Septembrie', json.results.September],
                ['Octombrie', json.results.October],
                ['Noiembrie', json.results.November],
                ['Decembrie', json.results.December]
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
        })
        .catch(err => { console.log(err) });
}

function statisticaAccidente() {
    fetch(`${hostName}${api.getInfoStatisticsBadEvent.route}?event_type=${"accident"}`, {
        method: api.getInfoStatisticsBadEvent.method,
        headers: { "Content-type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            document.getElementById("accidenteChart").style.display = "block"
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Months');
            data.addColumn('number', 'Number of orders');
            data.addRows([
                ['Ianuarie', json.results.January],
                ['Februarie', json.results.February],
                ['Martie', json.results.March],
                ['Aprilie', json.results.April],
                ['Mai', json.results.May],
                ['Iunie', json.results.June],
                ['Iulie', json.results.July],
                ['August', json.results.August],
                ['Septembrie', json.results.September],
                ['Octombrie', json.results.October],
                ['Noiembrie', json.results.November],
                ['Decembrie', json.results.December]
            ])

            var options = {
                title: 'Statistica accidentelor',
                backgroundColor: 'transparent',
                width: '100%',
                titleTextStyle: { color: '#FFFFFF' },
                legendTextStyle: { color: '#FFFFFF' }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('accidenteChart'));
            chart.draw(data, options);
        })
        .catch(err => { console.log(err) });
}

function statisticaStricaciuni() {
    fetch(`${hostName}${api.getInfoStatisticsBadEvent.route}?event_type=${"failure"}`, {
        method: api.getInfoStatisticsBadEvent.method,
        headers: { "Content-type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            document.getElementById("defectiuniChart").style.display = "block"
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Months');
            data.addColumn('number', 'Number of orders');
            data.addRows([
                ['Ianuarie', json.results.January],
                ['Februarie', json.results.February],
                ['Martie', json.results.March],
                ['Aprilie', json.results.April],
                ['Mai', json.results.May],
                ['Iunie', json.results.June],
                ['Iulie', json.results.July],
                ['August', json.results.August],
                ['Septembrie', json.results.September],
                ['Octombrie', json.results.October],
                ['Noiembrie', json.results.November],
                ['Decembrie', json.results.December]
            ])

            var options = {
                title: 'Statistica defectiunilor ',
                backgroundColor: 'transparent',
                width: '100%',
                titleTextStyle: { color: '#FFFFFF' },
                legendTextStyle: { color: '#FFFFFF' }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('defectiuniChart'));
            chart.draw(data, options);
        })
        .catch(err => { console.log(err) });
}