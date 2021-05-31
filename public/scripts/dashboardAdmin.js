const newAccount = document.getElementById(`form-create-account`)
// const addNotificationButton = document.getElementById(`add-notification-button`)
const addNotificationForm = document.getElementById(`add-notification-form`);
const removeNotificationForm = document.getElementById(`remove-notification`);
const addCarForm = document.getElementById(`add-car-form`)
const getEmployee = document.getElementById(`get-employee`)
const deleteAccount = document.getElementById(`delete-account-form`)
const changePriceForm = document.getElementById(`change-price-form`)
const estimateCostForm = document.getElementById(`cost-estimate-form`)
const estimateCounty1 = document.getElementById(`judet-exp`)
const estimateCounty2 = document.getElementById(`judet-dest`)


window.addEventListener(`api-fetched`, (ev) => {
    estimateCostForm.onsubmit = async (e) => {
        e.preventDefault();
        var response1 = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${estimateCounty1.value}&apiKey=d2cb09e3081941d7ba2ce4970a7b2e81`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        var coordinates1 = await response1.json();
        var response2 = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${estimateCounty2.value}&apiKey=d2cb09e3081941d7ba2ce4970a7b2e81`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        var coordinates2 = await response2.json();
        const data = {
            mode: 'drive',
            sources: [{ location: [coordinates1.features[0].properties.lon, coordinates1.features[0].properties.lat] }],
            targets: [{ location: [coordinates2.features[0].properties.lon, coordinates2.features[0].properties.lat] }]
        }
        var response3 = await fetch('https://api.geoapify.com/v1/routematrix?apiKey=d2cb09e3081941d7ba2ce4970a7b2e81', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        var dist = await response3.json();
        var distanceCalculated = dist.sources_to_targets[0][0].distance;
        fetch(`${hostName}${api.estimateCost.route}?distance=${distanceCalculated}`, {
            method: api.estimateCost.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
            .then(response => response.json())
            .then(json => {
                document.getElementById(`total-cost`).innerHTML = "Pretul estimativ este : " + json.data + " ron";
            })
            .catch(err => { console.log(err) });
    }

    newAccount.onsubmit = async (e) => {
        e.preventDefault();
        var values = {
            surname: document.getElementById("surname-form-create-account").value,
            name: document.getElementById("name-form-create-account").value,
            email: document.getElementById("email-form-create-account").value,
            password: document.getElementById("password-form-create-account").value,
            phone: document.getElementById("phone-form-create-account").value,
            county: document.getElementById("county-form-create-account").value,
            type: document.getElementById("typeAccount-form-create-account").value
        }
        fetch(`${hostName}${api.newAccount.route}`, {
            method: api.newAccount.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(json => {
                if (json.error != undefined) {
                    if (json.error.includes("Duplicate")) {
                        document.getElementById("status-account").innerHTML = "Există deja un cont cu acest email!"
                    } else if (json.error.includes("phone"))
                        document.getElementById("status-account").innerHTML = "Introduce-ți un număr de telefon valid!"
                } else {
                    document.getElementById("status-account").innerHTML = "Cont creat!"
                }
            })
            .catch(err => { console.log(err) });
    }

    addNotificationForm.onsubmit = async (e) => {
        e.preventDefault()
        let resultTextBox = document.getElementById(`status-notification`)
        var values = {
            text: document.getElementById(`new-notification-text`).value,
            expiry_date: document.getElementById(`new-notification-date`).value
        }
        try {
            let response = await fetch(`${hostName}${api.addNotification.route}`, {
                method: api.addNotification.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })


            let responseBody = await response.json()
            if (!response.ok)
                return resultTextBox.innerHTML = responseBody.error

            resultTextBox.innerHTML = `Operația a fost realizată cu succes`
            setInterval(() => resultTextBox.innerHTML = ``, 5000, null)

        } catch (error) {
            resultTextBox.innerHTML = error

        }


    }

    removeNotificationForm.onsubmit = async (e) => {
        e.preventDefault();
        let resultTextBox = document.getElementById(`status-notification`)
        var values = {
            id: document.getElementById(`delete-notification-id`).value
        }
        try {
            let response = await fetch(`${hostName}${api.deleteNotification.route}`, {
                method: api.deleteNotification.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
            let responseBody = await response.json()
            if (!response.ok)
                return resultTextBox.innerHTML = responseBody.error

            resultTextBox.innerHTML = `Operația a fost realizată cu succes`
            setInterval(() => resultTextBox.innerHTML = ``, 5000, null)
        } catch (error) {
            resultTextBox.innerHTML = error
        }

    }

    getEmployee.onsubmit = async (e) => {
        e.preventDefault()
        values = {
            email: document.getElementById("employee-search").value
        }
        fetch(`${hostName}${api.getInfoUser.route}?email=${values.email}`, {
            method: api.getInfoUser.method,
            headers: { "Content-type": "application/json" }
        })

            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.success == false)
                    document.getElementById("status-employee-search").innerHTML = "Nu există niciun cont cu acest email!"
                else {
                    document.getElementById("status-employee-search").innerHTML = `Nume: ${json.surname} Prenume: ${json.name} Telefon: ${json.phone}`
                }
            })
            .catch(err => { console.log(err) });
    }
    deleteAccount.onsubmit = async (e) => {
        e.preventDefault()
        values = {
            email: document.getElementById("remove-employee-account-email").value
        }
        fetch(`${hostName}${api.deleteAccount.route}`, {
            method: api.deleteAccount.method,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(json => {
                if (json.error == "not exist") {
                    document.getElementById("status-account").innerHTML = "Nu există un cont cu acest email!"
                } else {
                    document.getElementById("status-account").innerHTML = "Contul a fost șters!"
                }
            })
            .catch(err => { console.log(err) });
    }
    addCarForm.onsubmit = async (e) => {
        e.preventDefault();
        document.getElementById(`nr-inmatriculare`).style.backgroundColor = "white";
        document.getElementById(`id-sofer`).style.backgroundColor = "white";
        document.getElementById(`car-search-status`).innerHTML = "";
        if (document.getElementById(`car-status`).value == `Șterge`) {
            var values = {
                registration_number: document.getElementById(`nr-inmatriculare`).value,
                status: document.getElementById(`car-status`).value
            }
            fetch(`${hostName}${api.removeCar.route}`, {
                method: api.removeCar.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
                .then(response => response.json())
                .then(json => {
                    if (json.error) {
                        if (json.error.includes(`registration_number`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Numărul de înmatriculare nu respectă formatul";
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.error.includes(`data base`))
                            document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contactați administratorul.";
                    } else {
                        if (json.data.includes(`Mașina nu există în baza de date.`)) {
                            document.getElementById(`car-search-status`).innerHTML = json.data;
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else document.getElementById(`car-search-status`).innerHTML = json.data;
                    }

                })
                .catch(err => {
                    console.log(err)
                });
        } else if (document.getElementById(`car-status`).value == `Adaugă`) {
            var values = {
                registration_number: document.getElementById(`nr-inmatriculare`).value,
                id_driver: document.getElementById(`id-sofer`).value,
                status: document.getElementById(`car-status`).value
            }
            fetch(`${hostName}${api.addCar.route}`, {
                method: api.addCar.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
                .then(response => response.json())
                .then(json => {
                    if (json.error) {
                        if (json.error.includes(`registration_number`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Numărul de înmatriculare nu respectă formatul";
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.error.includes(`id_driver`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Id-ul șoferului nu respectă formatul.";
                            document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";

                        } else if (json.error.includes(`data base`))
                            document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contactați administratorul.";
                    } else {
                        if (json.data.includes(`Mașina există deja în baza de date.`)) {
                            document.getElementById(`car-search-status`).innerHTML = json.data;
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.data.includes(`Nu există niciun șofer înregistrat cu acest id.`)) {
                            document.getElementById(`car-search-status`).innerHTML = json.data;
                            document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else document.getElementById(`car-search-status`).innerHTML = json.data;
                    }

                })
                .catch(err => {
                    console.log(err)
                });

        } else if (document.getElementById(`car-status`).value == `Avariată` || document.getElementById(`car-status`).value == `Reparată`) {
            var values = {
                registration_number: document.getElementById(`nr-inmatriculare`).value,
                status: document.getElementById(`car-status`).value
            }
            fetch(`${hostName}${api.modifyCar.route}`, {
                method: api.modifyCar.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
                .then(response => response.json())
                .then(json => {
                    if (json.error) {
                        if (json.error.includes(`registration_number`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Numărul de înmatriculare nu respectă formatul";
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.error.includes(`id_driver`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Id-ul șoferului nu respectă formatul.";
                            document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";

                        } else if (json.error.includes(`data base`))
                            document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contactați administratorul.";
                    } else {
                        if (json.data.includes(`Mașina nu există în baza de date.`)) {
                            document.getElementById(`car-search-status`).innerHTML = json.data;
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else document.getElementById(`car-search-status`).innerHTML = json.data;
                    }

                })
                .catch(err => {
                    console.log(err)
                });
        } else if (document.getElementById(`car-status`).value == `Schimbă șofer`) {
            var values = {
                registration_number: document.getElementById(`nr-inmatriculare`).value,
                id_driver: document.getElementById(`id-sofer`).value,
                status: document.getElementById(`car-status`).value
            }
            fetch(`${hostName}${api.changeDriver.route}`, {
                method: api.changeDriver.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json.data)
                    if (json.error) {
                        if (json.error.includes(`registration_number`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Numărul de înmatriculare nu respectă formatul";
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.error.includes(`id_driver`)) {
                            document.getElementById(`car-search-status`).innerHTML = "Id-ul șoferului nu respectă formatul.";
                            document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";

                        } else if (json.error.includes(`data base`))
                            document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contactați administratorul.";
                    } else {
                        if (json.data.includes(`Mașina nu există în baza de date.`)) {
                            document.getElementById(`car-search-status`).innerHTML = json.data;
                            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.data.includes(`Nu există niciun șofer înregistrat cu acest id.`)) {
                            document.getElementById(`car-search-status`).innerHTML = json.data;
                            document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";
                        } else if (json.data.includes(`Șoferul mașinii a fost schimbat cu succes!`))
                            document.getElementById(`car-search-status`).innerHTML = `Șoferul mașinii a fost schimbat cu succes!`;
                    }

                })
                .catch(err => {
                    console.log(err)
                });

        }
    },

        changePriceForm.onsubmit = async (e) => {
            e.preventDefault();
            document.getElementById(`price-update-status`).innerHTML = "";
            document.getElementById(`price-update-field`).style.backgroundColor = "white";

            var values = {
                price: document.getElementById(`price-update-field`).value,
            }
            fetch(`${hostName}${api.changePrice.route}`, {
                method: api.changePrice.method,
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
                .then(response => response.json())
                .then(json => {
                    if (json.error) {
                        console.log(json.error)
                        if (json.error.includes(`price`)) {
                            document.getElementById(`price-update-status`).innerHTML = "Noul preț trebuie să fie un număr valid.";
                            document.getElementById(`price-update-field`).style.backgroundColor = "rgb(211, 110, 110)";

                        } else
                            document.getElementById(`price-update-status`).innerHTML = "Nu am putut actualiza noul preț.";

                    } else
                        document.getElementById(`price-update-status`).innerHTML = json.data;


                })
                .catch(err => {
                    console.log(err)
                });
        }

})