const host = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

exports.domain = process.env.PORT ? `parcel-shipping-simulator.herokuapp.com` : `localhost`
exports.sendDebugInResponse = process.env.PORT ? false : true
exports.distributionMicroservices = [{
    name: `package distribution microservice service 1`,
    address: process.env.PORT ? `https://pss-package-distribution-1.herokuapp.com` : `http://localhost:8000`
},]
/**
 * check client lanseaza comanda, -> insert awb_events (awb, 'order-received', 'comanda a fost primita', '',datetime)
 * ckeck soferul preia pachetul -> insert awb_events (awb, 'order-picked-up', 'ridicat de la expeditor','nume sofer/angajat, id, email, masina, nr de inmatriculare', datetime) 
 * ckeck soferul aduce pachetul la baza -> insert awb_events (awb, 'order-picked-up', 'ajuns la sediu [oras]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * check soferul soferul preia pachetul din baza -> insert awb_events (awb, 'order-in-transit', 'a plecat de la sediu [oras]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * check soferul soferul preia pachetul din baza (dar e vremea proasta sau s a stricat masina sau orice, se pune motivul intarzierii in al 2 lea camp) -> insert awb_events (awb, 'order-in-transit', 'motiv intarziere', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * check soferul soferul ajunge la orasul destinatie -> insert awb_events (awb, 'order-in-transit', 'a ajuns la sediu [orasDestinatie]', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * check soferul soferul preia pachetul din baza pentru livrare -> insert awb_events (awb, 'order-in-delivery', 'in curs de livrare', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * check soferul soferul livreaza -> insert awb_events (awb, 'order-destinatary', 'livrat', 'nume sofer, id, email, masina, nr de inmatriculare', datetime)
 * check soferul soferul livreaza dar clientul se plange de continut-> insert awb_events (awb, 'order-destinatary', 'clientul mentioneaza continut deteriorat', 'nume sofer/angajat, id, email, [masina, nr de inmatriculare]', datetime)
 */
/**
 * order.status poate fi una din urmatarele (corespund cu butoanele din order-dashboard.html):
 * order-received
 * order-picked-up
 * order-in-transit
 * order-in-sender-county
 * order-in-base
 * order-in-delivery
 * order-destinatary //pt cand comanda a fost livrata
 */

/**
 * 
 * backend ul in fiecare zi la ora 5PM distribuie max 20 de pachete la 1 sofer pt livrare in alta localitate
 * backend ul in fiecare zi la ora 5PM distribuie max 10 de pachete la 1 sofer pt livrare in aceeasi localitate si 10 pachete de preluat
 * daca s mai multi soferi, se face distributia 1:5 (1 livreaza intre localitati si 5 in aceeasi localitate)
 * 
 */
//obiectele astea se combina prin spread syntax si se trimit la front in functie de tipul de login
exports.baseApi = {
    loginType: null, //se modifica 
    hostName: host,
    estimateCost: {
        route: `/api/estimate-cost`,
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
    ourLocations: {
        location: `/Locatii.html`
    },
    helloWord: {
        route: `/api/hello`,
        method: `GET`,
    }
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
    getDriverCar: {
        route: `/api/driver/car`,
        method: `GET`
    },
    modifyCar: {
        route: `/api/cars`,
        method: `PATCH`,
    },

    getDetailsAwbforDriver: {
        route: `/api/driver`,
        method: `GET`
    },
    driverEvent: {
        route: `/api/driver`,
        method: `POST`
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
        method: `POST`,
    },
}

exports.employeeApi = {
    //va include tot ce are baseApi si userApi
}

exports.adminApi = {
    //va include tot de mai sus. 
    getInfoStatistics: {
        route: `/api/statistics`,
        method: `GET`
    },
    getInfoStatisticsBadEvent: {
        route: `/api/statisitcs/badEvent`,
        method: `GET`
    },
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
    },
    getTables: {
        route: `/api/db-tables`,
        method: `GET`,
    },
    // uploadFile: {
    //     route: `/api/db-tables`,
    //     method: `GET`,
    // },
    uploadFile: {
        route: `/api/upload`,
        method: `POST`,
    },
    downloadFile: {
        route: `/api/download`,
        method: `GET`,
    }
}