const queryString = require('query-string');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const findByEmail = require('./findUserByEmail');
const updateToken = require('./updateToken');
const SECRET_KEY = process.env.SECRET_KEY;

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  console.log(userData.data);

  const user = await findByEmail(userData.data.email);
  if (!user) {
    return res.redirect(`${process.env.FRONTEND_URL}/api/auth/signup`);
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  await updateToken(user.id, token);
  console.log(user.token);

  return res.redirect(`${process.env.FRONTEND_URL}/home`);

  // return res.redirect(
  //   `${process.env.FRONTEND_URL}?email=${userData.data.email}`,
  // );
};

module.exports = { googleAuth, googleRedirect };
