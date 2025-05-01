const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gametun',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.idU, username: user.username, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
}

// Authenticate JWT token middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login route
app.post('/login', (req, res) => {
  const { username, pwd } = req.body;

  db.query('SELECT * FROM user WHERE username = ? AND pwd = ?', [username, pwd], (err, results) => {
    
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    console.log('Username:', username);
console.log('Password:', pwd);

    const user = results[0];
    const token = generateToken(user); // Generate JWT token

    res.json({ token, role: user.role });
  });
});

// Example protected route (requires authentication)
app.post('/api/create-payment-intent', authenticateToken, async (req, res) => {
  // Payment logic (you've included your Stripe logic here)
  res.send('Payment intent created');
});

// Stripe-related routes (you have a separate module for Stripe)
const stripeRouter = require('./node_modules/stripe');
app.use(stripeRouter);

// Games route
app.get('/games', (req, res) => {
  db.query('SELECT * FROM game', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
