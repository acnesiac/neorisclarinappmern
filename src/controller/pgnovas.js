const axios = require("axios");
const BASE_URL = `http://nolaborables.com.ar/api/v2/feriados/2016?incluir=opcional`
module.exports = {
    getNolaborables: (year, opcional) => axios({
        method:"GET",
        url : BASE_URL,
        params: {

        }
    })
}