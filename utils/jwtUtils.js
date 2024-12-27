const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // Replace with environment variable in production

exports.signToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

exports.verifyToken = (token) => jwt.verify(token, SECRET_KEY);
