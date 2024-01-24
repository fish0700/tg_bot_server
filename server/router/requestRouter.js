const Router = require('express');
const router = new Router();
const sendRequest = require('../../bot/sendRequest')

router.post('/', sendRequest);

module.exports = router;