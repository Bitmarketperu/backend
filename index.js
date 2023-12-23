const express = require('express');
const app = express();
const routerApi = require('./network/routerApi');
const path = require('path');
require('./config_env.js');
const connection = require('./configDB');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
var morgan = require('morgan')

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const socket = require('./socket');
socket.connect(server);

//zona horaria
process.env.TZ = "America/Lima";
// console.log(`test date ${new Date()}`);

connection();

routerApi(app);

//Not Found error
app.use((req, res) => res.status(404).sendFile(path.join( __dirname, './viejoPublic/404.html')));

const port = process.env.PORT || 5000;

server.listen( port, () => console.log(`App listening on port, ${port}`));