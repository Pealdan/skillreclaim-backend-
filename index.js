const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'SkillReclaimSuperSecretKey'; // Keep secret in real apps

app.use(cors());
app.use(express.json());

const users = []; // temporary in-memory store

// 🌐 Base route
app.get('/', (req, res) => {
  res.send('🔐 SkillReclaim Auth API is running!');
});

// ✅ Signup route
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: 'Email and password required' });

    const existingUser = users.find(u => u.email === email);
    if (existingUser)
      return res.status(400).json({ msg: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed });

    return res.status(201).json({ msg: 'Signup successful' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user)
      return res.status(401).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: 'Invalid password' });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ msg: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ msg: 'Login error' });
  }
});

// 🔒 Protected dashboard
app.get('/dashboard', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ msg: 'No token provided' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ msg: `Welcome, ${decoded.email}` });
  } catch (err) {
    return res.status(403).json({ msg: 'Invalid token' });
  }
});

// ▶ Start server
app.listen(PORT, () => {
  console.log(`✅ SkillReclaim API running on http://localhost:${PORT}`);
});