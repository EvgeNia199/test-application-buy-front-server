const http = require('http');
const app = require('./app.js');

const controller = require('./socketInit');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
  
controller.createConnection(server);

