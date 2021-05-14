const host = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

exports.baseApi = {
    hostName: host,
    estimateCost: {
        route: `/api/cost`,
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
}