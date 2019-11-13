require('dotenv').config();
const server = require('./src/API/server');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));