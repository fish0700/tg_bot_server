const Router = require('express');
const router = new Router();
const requestRouter = require('./requestRouter');

router.use('/sendrequest', requestRouter);

module.exports = router;