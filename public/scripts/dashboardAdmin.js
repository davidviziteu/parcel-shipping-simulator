const newAccount = document.getElementById(`form-create-account`)
    // const addNotificationButton = document.getElementById(`add-notification-button`)
const addNotificationForm = document.getElementById(`add-notification-form`);
const removeNotificationForm = document.getElementById(`remove-notification`);
const addCarForm = document.getElementById(`add-car-form`)
const getEmployee = document.getElementById(`get-employee`)
const deleteAccount = document.getElementById(`delete-account-form`)
const changePriceForm = document.getElementById(`change-price-form`)
const uploadFileForm = document.getElementById(`upload-file-form`)
const downloadFileForm = document.getElementById(`download-file-form`)


window.addEventListener(`api-fetched`, (ev) => {

            newAccount.onsubmit = async(e) => {
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
                                document.getElementById("status-account").innerHTML = "Exist?? deja un cont cu acest email!"
                            } else if (json.error.includes("phone"))
                                document.getElementById("status-account").innerHTML = "Introduce-??i un num??r de telefon valid!"
                        } else {
                            document.getElementById("status-account").innerHTML = "Cont creat!"
                        }
                    })
                    .catch(err => { console.log(err) });
            }

            addNotificationForm.onsubmit = async(e) => {
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

                    resultTextBox.innerHTML = `Notificarea a fost adaugat?? cu succes`
                    setTimeout(() => resultTextBox.innerHTML = ``, 5000)
                    setTimeout(() => updateNotificationsBox(), 1000)

                } catch (error) {
                    resultTextBox.innerHTML = "Probleme la ad??ugarea notificarii"
                    console.log(error)
                }


            }

            removeNotificationForm.onsubmit = async(e) => {
                    e.preventDefault();
                    document.getElementById(`delete-notification-id`).style.backgroundColor = "white";
                    let resultTextBox = document.getElementById(`status-notification`)
                    var values = {
                        id: document.getElementById(`delete-notification-id`).value
                    }

                    let response = await fetch(`${hostName}${api.deleteNotification.route}`, {
                        method: api.deleteNotification.method,
                        body: JSON.stringify(values),
                        headers: { "Content-type": "application/json" }
                    })
                    let responseBody = await response.json()
                    if (response.status == 404) {
                        document.getElementById(`delete-notification-id`).style.backgroundColor = "rgb(211, 110, 110)";
                        resultTextBox.innerHTML = `Nu exista notificarea cu id-ul ${document.getElementById(`delete-notification-id`).value} ??n baza de date`
            } else
               { 
                   if(responseBody.success == true)
                        resultTextBox.innerHTML = responseBody.message;
                    else 
                        resultTextBox.innerHTML = responseBody.error
               }
            setTimeout(() => resultTextBox.innerHTML = ``, 5000)
            setTimeout(() => updateNotificationsBox(), 1000)
       
    }

    getEmployee.onsubmit = async(e) => {
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
                    document.getElementById("status-employee-search").innerHTML = "Nu exist?? niciun cont cu acest email!"
                else {
                    document.getElementById("status-employee-search").innerHTML = `Nume: ${json.surname} Prenume: ${json.name} Telefon: ${json.phone}`
                }
            })
            .catch(err => { console.log(err) });
    }
    deleteAccount.onsubmit = async(e) => {
        e.preventDefault()
        console.log("api"+api)
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
                    document.getElementById("status-account").innerHTML = "Nu exist?? un cont cu acest email!"
                } else {
                    document.getElementById("status-account").innerHTML = "Contul a fost ??ters!"
                }
            })
            .catch(err => { console.log(err) });
    }
    addCarForm.onsubmit = async(e) => {
            e.preventDefault();
            document.getElementById(`nr-inmatriculare`).style.backgroundColor = "white";
            document.getElementById(`id-sofer`).style.backgroundColor = "white";
            document.getElementById(`car-search-status`).innerHTML = "";
            if (document.getElementById(`car-status`).value == `??terge`) {
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
                                document.getElementById(`car-search-status`).innerHTML = "Num??rul de ??nmatriculare nu respect?? formatul";
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.error.includes(`data base`))
                                document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contacta??i administratorul.";
                        } else {
                            if (json.data.includes(`Ma??ina nu exist?? ??n baza de date.`)) {
                                document.getElementById(`car-search-status`).innerHTML = json.data;
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else document.getElementById(`car-search-status`).innerHTML = json.data;
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });
            } else if (document.getElementById(`car-status`).value == `Adaug??`) {
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
                                document.getElementById(`car-search-status`).innerHTML = "Num??rul de ??nmatriculare nu respect?? formatul";
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.error.includes(`id_driver`)) {
                                document.getElementById(`car-search-status`).innerHTML = "Id-ul ??oferului nu respect?? formatul.";
                                document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";

                            } else if (json.error.includes(`data base`))
                                document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contacta??i administratorul.";
                        } else {
                            if (json.data.includes(`Ma??ina exist?? deja ??n baza de date.`)) {
                                document.getElementById(`car-search-status`).innerHTML = json.data;
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.data.includes(`Nu exist?? niciun ??ofer ??nregistrat cu acest id.`)) {
                                document.getElementById(`car-search-status`).innerHTML = json.data;
                                document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else document.getElementById(`car-search-status`).innerHTML = json.data;
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });

            } else if (document.getElementById(`car-status`).value == `Avariat??` || document.getElementById(`car-status`).value == `Reparat??`) {
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
                                document.getElementById(`car-search-status`).innerHTML = "Num??rul de ??nmatriculare nu respect?? formatul";
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.error.includes(`id_driver`)) {
                                document.getElementById(`car-search-status`).innerHTML = "Id-ul ??oferului nu respect?? formatul.";
                                document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";

                            } else if (json.error.includes(`data base`))
                                document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contacta??i administratorul.";
                        } else {
                            if (json.data.includes(`Ma??ina nu exist?? ??n baza de date.`)) {
                                document.getElementById(`car-search-status`).innerHTML = json.data;
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else document.getElementById(`car-search-status`).innerHTML = json.data;
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });
            } else if (document.getElementById(`car-status`).value == `Schimb?? ??ofer`) {
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
                                document.getElementById(`car-search-status`).innerHTML = "Num??rul de ??nmatriculare nu respect?? formatul";
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.error.includes(`id_driver`)) {
                                document.getElementById(`car-search-status`).innerHTML = "Id-ul ??oferului nu respect?? formatul.";
                                document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";

                            } else if (json.error.includes(`data base`))
                                document.getElementById(`car-search-status`).innerHTML = "Eroare la baza de date. Contacta??i administratorul.";
                        } else {
                            if (json.data.includes(`Ma??ina nu exist?? ??n baza de date.`)) {
                                document.getElementById(`car-search-status`).innerHTML = json.data;
                                document.getElementById(`nr-inmatriculare`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.data.includes(`Nu exist?? niciun ??ofer ??nregistrat cu acest id.`)) {
                                document.getElementById(`car-search-status`).innerHTML = json.data;
                                document.getElementById(`id-sofer`).style.backgroundColor = "rgb(211, 110, 110)";
                            } else if (json.data.includes(`??oferul ma??inii a fost schimbat cu succes!`))
                                document.getElementById(`car-search-status`).innerHTML = `??oferul ma??inii a fost schimbat cu succes!`;
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });

            }
        },

        changePriceForm.onsubmit = async(e) => {
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
                            document.getElementById(`price-update-status`).innerHTML = "Noul pre?? trebuie s?? fie un num??r valid.";
                            document.getElementById(`price-update-field`).style.backgroundColor = "rgb(211, 110, 110)";

                        } else
                            document.getElementById(`price-update-status`).innerHTML = "Nu am putut actualiza noul pre??.";

                    } else
                        document.getElementById(`price-update-status`).innerHTML = json.data;


                })
                .catch(err => {
                    console.log(err)
                });
        }
         uploadFileForm.onsubmit = async (e) => {
             let fileUpload = document.getElementById(`csv-file-upload`)
                    e.preventDefault();
                    console.log(fileUpload.files)
                     fetch(`${hostName}${api.uploadFile.route}?table=${document.getElementById(`db-tables1`).value}`, {
                        method: api.uploadFile.method,
                        body: fileUpload.files[0],
                        headers: { 
                            "Content-type": "application/octet-stream",
                            "Content-disposition" :`filename=${fileUpload.files[0].name}`
                        }
                })
                .then(response => response.json())
                .then(json => {
                   if(!json.error){
                       document.getElementById(`upload-status`).innerHTML = `Upload reu??it.`
                   }
                       
                })
                .catch(err => {
                    console.log(err)
                });
         }
           downloadFileForm.onsubmit = async (e) => {
                    e.preventDefault();
                     fetch(`${hostName}${api.downloadFile.route}?table=${document.getElementById(`db-tables2`).value}`, {
                        method: api.downloadFile.method,
                        headers: { 
                             headers: { "Content-type": "application/octet-stream" }
                        }
                })
                .then(response => response.blob())
                .then(response => {
                 const blob = new Blob([response], {type: 'application/octet-stream'});
                 const downloadUrl = URL.createObjectURL(blob);
                 const a = document.createElement("a");
                 a.href = downloadUrl;
                 a.download = `${document.getElementById(`db-tables2`).value}.csv`;
                 document.body.appendChild(a);
                 a.click();
                })
                .catch(err => {
                    console.log(err)
                });
         }
           

                
         if(api.loginType == `admin`){
               fetch(`${hostName}${api.getTables.route}`, {
                    method: api.getTables.method,
                    headers: { "Content-type": "application/json" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json.message)
                       for (let element in json.message) {
                          document.getElementById(`db-tables1`).appendChild(new Option(json.message[element]))
                          document.getElementById(`db-tables2`).appendChild(new Option(json.message[element]))

                         }
                })
                .catch(err => {
                    console.log(err)
                });
         }

})