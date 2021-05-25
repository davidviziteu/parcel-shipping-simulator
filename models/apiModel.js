const host = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

exports.domain = process.env.PORT ? `parcel-shipping-simulator.herokuapp.com` : `localhost`

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
    checkIfAwbExists: {
        location: `/order-dashboard.html`,
        route: `/api/check-awb`,
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