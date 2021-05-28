const host = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

exports.domain = process.env.PORT ? `parcel-shipping-simulator.herokuapp.com` : `localhost`
// <<<<<<< HEAD
/**
 * client lanseaza comanda, -> insert awb_events (awb, 'order-received', 'comanda a fost primita', '',datetime)
 * soferul preia pachetul -> insert awb_events (awb, '
2021-05-28 09:53:27	', 'ridicat de la expeditor','nume sofer/angajat, id, email, masina, nr de inmatriculare', datetime)
 * soferul aduce pachetul la baza -> insert awb_events (awb, 'order-picked-up', 'ajuns la sediu [oras]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * soferul soferul preia pachetul din baza -> insert awb_events (awb, 'order-in-transit', 'a plecat de la sediu [oras]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * soferul soferul preia pachetul din baza (dar e vremea proasta sau s a stricat masina sau orice, se pune motivul intarzierii in al 2 lea camp) -> insert awb_events (awb, 'order-in-transit', 'motiv intarziere', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * soferul soferul ajunge la orasul destinatie -> insert awb_events (awb, 'order-in-transit', 'a ajuns la sediu [orasDestinatie]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * soferul soferul preia pachetul din baza pentru livrare -> insert awb_events (awb, 'order-in-delivery', 'in curs de livrare', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * soferul soferul livreaza -> insert awb_events (awb, 'order-destinatary', 'livrat', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * soferul soferul livreaza dar clientul se plange de continut-> insert awb_events (awb, 'order-destinatary', 'clientul mentioneaza continut deteriorat', 'nume sofer/angajat, id, email, [masina, nr de inmatriculare]', datetime)
 */
// =======
//     /**
//      * client lanseaza comanda, -> insert awb_events (awb, 'order-received', 'comanda a fost primita', '',datetime)
//      * soferul preia pachetul -> insert awb_events (awb, 'order-picked-up', 'ridicat de la expeditor','nume sofer/angajat, id, email, masina, nr de inmatriculare', datetime)
//      * soferul aduce pachetul la baza -> insert awb_events (awb, 'order-picked-up', 'ajuns la sediu [oras]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
//      * soferul soferul preia pachetul din baza -> insert awb_events (awb, 'order-in-transit', 'a plecat de la sediu [oras]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
//      * soferul soferul preia pachetul din baza (dar e vremea proasta sau s a stricat masina sau orice, se pune motivul intarzierii in al 2 lea camp) -> insert awb_events (awb, 'order-in-transit', 'motiv intarziere', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
//      * soferul soferul ajunge la orasul destinatie -> insert awb_events (awb, 'order-in-transit', 'a ajuns la sediu [orasDestinatie]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
//      * soferul soferul preia pachetul din baza pentru livrare -> insert awb_events (awb, 'order-in-delivery', 'in curs de livrare', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
//      * soferul soferul livreaza -> insert awb_events (awb, 'order-destinatary', 'livrat', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
//      * soferul soferul livreaza dar clientul se plange de continut-> insert awb_events (awb, 'order-destinatary', 'clientul mentioneaza continut deteriorat', 'nume sofer/angajat, id, email, [masina, nr de inmatriculare]', datetime)
//      */
// >>>>>>> 51341ad6a695779121507145bb08c6b37eadf87e


/**
 * backend ul in fiecare zi la ora 5PM distribuie max 20 de pachete la 1 sofer pt livrare in alta localitate
 * backend ul in fiecare zi la ora 5PM distribuie max 10 de pachete la 1 sofer pt livrare in aceeasi localitate si 10 pachete de preluat
 * daca s mai multi soferi, se face distributia 1:5 (1 livreaza intre localitati si 5 in aceeasi localitate)
 * 
 */
//obiectele astea se combina prin spread syntax si se trimit la front in functie de tipul de login
exports.baseApi = {
    loginType: `undefined`, //se modifica 
    hostName: host,
    estimateCost: {
        route: `/api/new-order`,
        method: `GET`,
    },
    login: {
        route: `/api/login`,
        method: `POST`,
    },
    logout: {
        location: `/`,
        route: `/api/logout`,
        method: `POST`,
    },
    newAccount: {
        location: `/register.html`,
        route: `/api/accounts`,
        method: `POST`,
    },

    trackAwb: {
        location: `/order-dashboard.html`,
        route: `/api/awb`,
        method: `GET`,
    },
    changeCredentials: {
        location: `/ChangeCredentials.html`,
        route: `/api/accounts`,
        method: `PATCH`,
    },
    getCode: {
        route: `/api/accounts/get-code`,
        method: `POST`,
    },
    newOrder: {
        location: `/NewOrder2.html`,
        route: `/api/new-order`,
        method: `POST`,
    },
    getNotifications: {
        route: `/api/notifications`,
        method: `GET`,
    },
    aboutUs: {
        location: `/AboutUs.html`
    },
}

exports.userApi = {
    //va include tot ce are baseApi
    deleteAccount: {
        route: `/api/accounts`,
        method: `DELETE`,
    },
    autocomplete: {
        route: `/api/autocomplete`,
        method: `GET`
    }
}

exports.driverApi = {
    //va include tot ce are baseApi si userApi
    modifyCar: {
        route: `/api/cars`,
        method: `PATCH`,
    },

    /**
     * ce primeste front ul: 
     * {
     *  task: "Livrare colete local" sau "Livrare colete national",
     *  countySource: "Iasi" //locul unde for trebui facute livrarile/pickup urile
     *  countyDestination: "Iasi" //locul unde for trebui facute livrarile/pickup urile
     *  car: "IS47AVI" //locul unde for trebui facute livrarile/pickup urile
     *  toDeliver: [1, 2, 3], //array de awb uri (de int uri)
     *  toPickup: [], //array de awb uri (de int uri)
     * } 
     */
    getTask: {
        route: `/api/get-task`,
        method: `GET`,
    },
}

exports.employeeApi = {
    //va include tot ce are baseApi si userApi
}

exports.adminApi = {
    //va include tot de mai sus. 
    addCar: {
        route: `/api/cars`,
        method: `POST`,
    },
    removeCar: {
        route: `/api/cars`,
        method: `DELETE`,
    },
    modifyCar: {
        route: `/api/cars`,
        method: `PATCH`,
    },
    changeDriver: {
        route: `/api/changeDriver`,
        method: `PATCH`,
    },
    addNotification: {
        route: `/api/notifications`,
        method: `POST`,
    },
    deleteNotification: {
        route: `/api/notifications`,
        method: `DELETE`,
    },
    getInfoUser: {
        route: `/api/accounts`,
        method: `GET`,
    },
    deleteAccount: {
        route: `/api/accounts`,
        method: `DELETE`
    },
    changePrice: {
        route: `/api/price`,
        method: `POST`
    }
}