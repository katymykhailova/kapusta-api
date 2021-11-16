const mGoose = require('mongoose');
require('dotenv').config();

const app = require('../app');

const { DB_HOST, PORT = 3000 } = process.env;

mGoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });
