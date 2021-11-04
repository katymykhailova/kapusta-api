const mGoose = require('mongoose');
require('dotenv').config();

const app = require('../app');

const { DB_HOST, PORT = 3000 } = process.env;

mGoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(
      PORT,
      console.log(`Server running. Use our API on port: ${PORT}`),
    ),
  )
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });
