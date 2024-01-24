const Router = require('express');
const router = new Router();
const sendCode = require('../../bot/actions/sendCode')

router.post('/', sendCode);

module.exports = router;