const Router = require('express');
const router = new Router();
const sendRequest = require('../../bot/actions/sendRequest')

router.post('/', sendRequest);

module.exports = router;