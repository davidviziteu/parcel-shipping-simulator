const host = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

exports.domain = process.env.PORT ? `parcel-shipping-simulator.herokuapp.com` : `localhost`

//obiectele astea se combina prin spread syntax si se trimit la front in functie de tipul de login
exports.baseApi = {
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
        location: `/demo-dashboard.html`,
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
}

exports.driverApi = {
    //va include tot ce are baseApi si userApi
    modifyCar: {
        route: `/api/cars`,
        method: `PATCH`,
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
    deleteNotification: {
        route: `/api/notifications`,
        method: `DELETE`,
    },
}
