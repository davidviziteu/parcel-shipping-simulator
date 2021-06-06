const Joi = require('joi');


const newOrderSchema = Joi.object().options({ abortEarly: false }).keys({
    fullName_sender: Joi.string().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).required(),
    contactPerson_sender: Joi.string().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).required(),
    phone_sender: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email_sender: Joi.string().email().required(),
    county_sender: Joi.string().valid('Ilfov', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Oradea', 'Sibiu', 'Timișoara').required(),
    city_sender: Joi.string().required().valid("Cluj-Napoca", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Turda", "Constanţa", "Băneasa", "Cernavodă", "Eforie", "Hârşova", "Mangalia", "Medgidia", "Murfatlar", "Năvodari", "Negru Vodă", "Ovidiu", "Techirghiol", "Craiova", "Băileşti", "Bechet", "Calafat", "Dăbuleni", "Filiaşi", "Segarcea", "Galaţi", "Beresti", "Târgu Bujor", "Tecuci", "Iaşi", "Hârlău", "Paşcani", "Podu Iloaiei", "Târgu Frumos", "București", "Bragadiru", "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popeşti - Leordeni", "Voluntari", "Oradea", "Aleşd", "Beiuş", "Marghita", "Nucet", "Salonta", "Săcuieni", "Ştei", "Valea lui Mihai", "Vaşcău", "Sibiu", "Agnita", "Avrig", "Cisnădie", "Copşa Mică", "Dumbrăveni", "Mediaş", "Miercurea Sibiului", "Ocna Sibiului", "Sălişte", "Tălmaciu", "Timișoara", "Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sâncicolau Mare"),
    address_sender: Joi.string().required(),

    fullName_receiver: Joi.string().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).required(),
    contactPerson_receiver: Joi.string().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).required(),
    phone_receiver: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    county_receiver: Joi.string().valid('Ilfov', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Oradea', 'Sibiu', 'Timișoara').required(),
    city_receiver: Joi.string().required().valid("Cluj-Napoca", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Turda", "Constanţa", "Băneasa", "Cernavodă", "Eforie", "Hârşova", "Mangalia", "Medgidia", "Murfatlar", "Năvodari", "Negru Vodă", "Ovidiu", "Techirghiol", "Craiova", "Băileşti", "Bechet", "Calafat", "Dăbuleni", "Filiaşi", "Segarcea", "Galaţi", "Beresti", "Târgu Bujor", "Tecuci", "Iaşi", "Hârlău", "Paşcani", "Podu Iloaiei", "Târgu Frumos", "București", "Bragadiru", "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popeşti - Leordeni", "Voluntari", "Oradea", "Aleşd", "Beiuş", "Marghita", "Nucet", "Salonta", "Săcuieni", "Ştei", "Valea lui Mihai", "Vaşcău", "Sibiu", "Agnita", "Avrig", "Cisnădie", "Copşa Mică", "Dumbrăveni", "Mediaş", "Miercurea Sibiului", "Ocna Sibiului", "Sălişte", "Tălmaciu", "Timișoara", "Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sâncicolau Mare"),
    address_receiver: Joi.string().required(),

    nrEnvelope: Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
    nrParcel: Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
    weight: Joi.string().pattern(/^[0-9]+$/).allow(null, ''),

    length: Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
    width: Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
    height: Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
    date: Joi.date(),
    hour: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow(null, ''),
    preference1: Joi.boolean(),
    preference2: Joi.boolean(),
    preference3: Joi.boolean(),
    payment: Joi.string().valid('cash', 'card').required(),
    mentions: Joi.string().required().allow(null, '')
});

class OrderDashboardTemplate {
    'order-received' = []
    'order-picked-up' = []
    'order-in-transit' = []
    'order-in-delivery' = []
    'order-destinatary' = []
}

class AwbDetailsTemplate {
    sender = []
    destinatary = []
    other = []
}

const orderDashboardModel = OrderDashboardTemplate
const awbDetailsModel = AwbDetailsTemplate




var cities = {
    Cluj: ["Cluj-Napoca", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Turda"],
    Constanța: ["Constanţa", "Băneasa", "Cernavodă", "Eforie", "Hârşova", "Mangalia", "Medgidia", "Murfatlar", "Năvodari", "Negru Vodă", "Ovidiu", "Techirghiol"],
    Dolj: ["Craiova", "Băileşti", "Bechet", "Calafat", "Dăbuleni", "Filiaşi", "Segarcea"],
    Galați: ["Galaţi", "Beresti", "Târgu Bujor", "Tecuci"],
    Iași: ["Iaşi", "Hârlău", "Paşcani", "Podu Iloaiei", "Târgu Frumos"],
    Ilfov: ["București", "Bragadiru", "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popeşti - Leordeni", "Voluntari"],
    Oradea: ["Oradea", "Aleşd", "Beiuş", "Marghita", "Nucet", "Salonta", "Săcuieni", "Ştei", "Valea lui Mihai", "Vaşcău"],
    Sibiu: ["Sibiu", "Agnita", "Avrig", "Cisnădie", "Copşa Mică", "Dumbrăveni", "Mediaş", "Miercurea Sibiului", "Ocna Sibiului", "Sălişte", "Tălmaciu"],
    Timișoara: ["Timișoara", "Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sâncicolau Mare"]
}

var cityList = ["Ilfov", "Cluj", "Constanța", "Dolj", "Galați", "Iași", "Oradea", "Sibiu", "Timișoara"];



module.exports = { newOrderSchema, orderDashboardModel, awbDetailsModel, cityList, cities }
