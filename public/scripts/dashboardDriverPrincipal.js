const taskText = document.getElementById(`task`)
const carText = document.getElementById(`car`)
const traseuText = document.getElementById(`traseu`)
window.addEventListener(`api-fetched`, (ev) => {
    fetch(`${hostName}${api.getTask.route}`, {
        method: api.getTask.method,
    })
        .then(response => response.json())
        .then(json => {
            console.log(`------------------fetched task`)
            console.log(json)
            carText.innerHTML = json.car
            traseuText.innerHTML = `${json.countySource} -> ${json.countyDestination}`
            taskText.innerHTML = json.task
            if (json.task.includes("national"))
                localStorage.setItem('task', 'national')
            else localStorage.setItem('task', 'local')
            json.toPickup.forEach(awb => {
                var btn = document.createElement("BUTTON");
                var x = document.getElementById("list-awbs-toPickup").appendChild(btn);
                x.innerHTML = awb;
                x.onclick = function () {
                    localStorage.setItem('awb', this.innerHTML);
                    localStorage.setItem('toPickup', true);
                    localStorage.setItem('toDeliver', false);
                    location.href = "/DashboardSofer.html"
                };
            })
            json.toDeliver.forEach(awb => {
                var btn = document.createElement("BUTTON");
                var x = document.getElementById("list-awbs-toDeliver").appendChild(btn);
                x.innerHTML = awb;
                x.onclick = function () {
                    localStorage.setItem('awb', this.innerHTML);
                    localStorage.setItem('toDeliver', true)
                    localStorage.setItem('toPickup', false)
                    location.href = "/DashboardSofer.html"
                };
            })
        })
        .catch(err => { console.log(err) })
})