const host = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

exports.domain = process.env.PORT ? `herokuapp` : `localhost`
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
    newAccout: {
        location: `/register.html`,
        route: `/api/register`,
        method: `POST`,
    },
    trackAwb: {
        route: `/api/awb`,
        method: `GET`,
    },
    getCode: {
        route: `/api/reset`,
        method: `POST`,
    },
    newOrder: {
        route: `/api/new-order`,
        method: `POST`,
    },
}