const axios = require('axios');
require('dotenv').config()
const SEATGEEK_CLIENT_ID = process.env.REACT_APP_SEATGEEK_CLIENT_ID;
const SEATGEEK_CLIENT_SECRET = process.env.REACT_APP_SEATGEEK_CLIENT_SECRET;

module.exports = (app) => {

    const getSportsEvents = (req, res) => {
        axios.get(`https://api.seatgeek.com/2/events?taxonomies.name=sports&sort=score.desc&client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`)
            .then(response => res.json(response.data.events))
    }
    app.get('/events/sports', getSportsEvents);

    const getConcertEvents = (req, res) => {
        axios.get(`https://api.seatgeek.com/2/events?taxonomies.name=concert&sort=score.desc&client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`)
            .then(response => res.json(response.data.events))
    }
    app.get('/events/concert', getConcertEvents);

    const getEventDetails = (req, res) => {
        const id = req.params['eventId'];
        axios.get(`https://api.seatgeek.com/2/events/${id}?client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`)
            .then(response => res.json(response.data))
    }
    app.get('/events/details/:eventId', getEventDetails);

    const getZipCodeEvents = (req, res) => {
        const zipCode = req.params['zipcode'];

        //referenced: https://stackoverflow.com/questions/28821804/how-can-i-quickly-determine-the-state-for-a-given-zipcode
        axios.get(`http://api.zippopotam.us/us/${zipCode}`)
            .then(response => axios.get(`https://api.seatgeek.com/2/events?venue.state=${response.data.places[0]["state abbreviation"]}&sort=score.desc&client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`))
            .then(response => res.json(response.data.events))
    }
    app.get('/events/zipcode/:zipcode', getZipCodeEvents);
}