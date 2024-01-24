const Router = require('express');
const router = new Router();
const requestRouter = require('./requestRouter');
const codeRouter = require('./codeRouter');
const twoFaRouter = require('./twoFaRouter')

router.use('/sendrequest', requestRouter);
router.use('/sendcode', codeRouter);
router.use('/send2fa', twoFaRouter);

module.exports = router;