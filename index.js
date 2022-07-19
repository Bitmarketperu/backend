const express = require('express');
const app = express();
const routerApi = require('./network/routerApi');
const path = require('path');
require('./config_env.js');
const connection = require('./configDB');
const cors = require('cors');

app.use(express.json());
app.use(cors());

connection();

routerApi(app);

//Not Found error
app.use((req, res) => res.status(404).sendFile(path.join( __dirname, './public/404.html')));

const port = process.env.PORT || 4000;

app.listen( port, () => console.log(`App listening on port, ${port}`));