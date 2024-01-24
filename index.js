const {startBot} = require('./bot');
const startServer = require('./server');


(() => {
    startBot();
    startServer();
}
)()
