const Router = require('express');
const router = new Router();
const send2fa = require('../../bot/actions/send2fa')

router.post('/', send2fa);

module.exports = router