const axios = require('axios');
require('dotenv').config()
const SEATGEEK_CLIENT_ID = process.env.REACT_APP_SEATGEEK_CLIENT_ID;
const SEATGEEK_CLIENT_SECRET = process.env.REACT_APP_SEATGEEK_CLIENT_SECRET;

module.exports = (app) => {

    const getSearchResults = (req, res) => {
        const query = req.params['query'];
        axios.get(`https://api.seatgeek.com/2/events?q=${query}&per_page=100&client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`)
            .then(response => res.json(response.data.events))
    }
    app.get('/search/results/:query', getSearchResults);
}