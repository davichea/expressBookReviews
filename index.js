'use strict';
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const { general } = require('./router/general');
const { authenticated } = require('./router/auth_users');
const app = express();
const users = new Map(); // In-memory course demo: resets on restart.
const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET || 'development-only-change-this-secret';

const hashPassword = (password, salt) => crypto.scryptSync(password, salt, 64).toString('hex');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/customer', session({
  secret: process.env.SESSION_SECRET || 'development-session-secret',
  resave: false, saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' }
}));

// Task 6: register a user.
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (typeof username !== 'string' || !username.trim() ||
      typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Username and password (minimum 6 characters) are required' });
  }
  if (users.has(username)) return res.status(409).json({ message: 'Username already exists' });
  const salt = crypto.randomBytes(16).toString('hex');
  users.set(username, { salt, passwordHash: hashPassword(password, salt) });
  return res.status(201).json({ message: 'User registered successfully' });
});

// Task 7: login. A session cookie stores the signed JWT.
app.post('/customer/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || typeof password !== 'string' ||
      user.passwordHash !== hashPassword(password, user.salt)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const accessToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  req.session.authorization = { accessToken };
  return res.status(200).json({ message: 'User logged in successfully' });
});

app.use('/customer/auth', (req, res, next) => {
  const header = req.get('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : req.session.authorization?.accessToken;
  if (!token) return res.status(401).json({ message: 'Please log in first' });
  try { req.user = jwt.verify(token, JWT_SECRET); return next(); }
  catch { return res.status(403).json({ message: 'Invalid or expired token' }); }
});
app.use('/customer', authenticated);
app.use('/', general);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
if (require.main === module) app.listen(PORT, () => console.log(`Book Review API: http://127.0.0.1:${PORT}`));
module.exports = app;
