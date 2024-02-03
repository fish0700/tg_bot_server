const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../config/.env')});
const cors = require('cors')
const router = require('./router/index');

const corsOptions = {
    origin: 'https://authorization-web.ru',
    methods: 'GET, HEAD, PUT, PATH, POST, DELETE',
    credentials: true,
    optinsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const PORT = process.env.PORT | 5000

const startServer = async () => {
    app.listen(PORT, () => {console.log(`server was started on port ${PORT}`)});
}

module.exports = startServer