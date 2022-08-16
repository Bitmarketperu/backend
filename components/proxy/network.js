const express = require('express');
const route = express.Router();
const fetch = require('node-fetch');

route.get('/', async (req, res) => {
    const query = await fetch('https://ewforex.net/app/divisas');
    const data = await query.json();
    res.status(200).json(data);
});

module.exports = route;