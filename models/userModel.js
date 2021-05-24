const Joi = require('joi');

exports.newUserSchema = Joi.object().options({ abortEarly: false }).keys({
    surname: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    county: Joi.string().valid('Ilfov', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Oradea', 'Sibiu', 'Timișoara').required(),
    city: Joi.string().required().valid("Cluj-Napoca", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Turda", "Constanţa", "Băneasa", "Cernavodă", "Eforie", "Hârşova", "Mangalia", "Medgidia", "Murfatlar", "Năvodari", "Negru Vodă", "Ovidiu", "Techirghiol", "Craiova", "Băileşti", "Bechet", "Calafat", "Dăbuleni", "Filiaşi", "Segarcea", "Galaţi", "Beresti", "Târgu Bujor", "Tecuci", "Iaşi", "Hârlău", "Paşcani", "Podu Iloaiei", "Târgu Frumos", "București", "Bragadiru", "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popeşti - Leordeni", "Voluntari", "Oradea", "Aleşd", "Beiuş", "Marghita", "Nucet", "Salonta", "Săcuieni", "Ştei", "Valea lui Mihai", "Vaşcău", "Sibiu", "Agnita", "Avrig", "Cisnădie", "Copşa Mică", "Dumbrăveni", "Mediaş", "Miercurea Sibiului", "Ocna Sibiului", "Sălişte", "Tălmaciu", "Timișoara", "Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sâncicolau Mare"),
    address: Joi.string().required(),
    type: Joi.string().required()
});

exports.loginUserSchema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean()
})

exports.driverEventsSchema = Joi.object().options({ abortEarly: false }).keys({
    accident: Joi.boolean(),
    meteo: Joi.boolean(),
    failure: Joi.boolean(),
    client: Joi.boolean(),
    content: Joi.boolean(),
    delivered: Joi.boolean(),
})

exports.validationEmailChangeCredentials = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    type: Joi.string().required()
})