const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './config/.env')});

const TelegramAPI = require('node-telegram-bot-api');

const bot = new TelegramAPI(process.env.TOKEN);

