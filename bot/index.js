const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../config/.env')});

const TelegramAPI = require('node-telegram-bot-api');

const bot = new TelegramAPI(process.env.TOKEN, {polling: true});
const groupID = process.env.GROUP_ID

const startBot = async () => {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Привет! Я готов взаимодействовать с этой группой!');
        bot.sendMessage(groupID, `group id is ${groupID}`);
        
      });
    
      console.log('Bot was started');
}

module.exports = startBot;