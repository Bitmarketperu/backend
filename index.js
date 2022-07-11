const express = require('express');
const router = express.Router();
const app = express();

app.get('/', (req, res) => {
    res.send('BitmarketPeru');
})

const port = process.env.PORT || 4000;

app.listen( port, () => console.log(`App listening on port, ${port}`));