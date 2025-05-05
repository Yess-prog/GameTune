const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 3000;
app.use(
  session({
    secret: 'Gametune', // Replace with a unique key
    resave: false,           // Avoid resaving unchanged sessions
    saveUninitialized: false, // Only save sessions with initialized data
    cookie: {
      maxAge: 1800000,         // 1-minute session expiry
    },
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend's actual origin
  credentials: true
}));
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
app.post('/register', (req, res) => {
  const { username, pwd, email, name } = req.body;

  db.query(
    'INSERT INTO user (nom, email, username, pwd, role) VALUES (?, ?, ?, ?, "user")',
    [name, email, username, pwd],
    (err, result) => {
      if (err) {
        console.error('Error during register:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      // Check if one row was inserted
      if (result.affectedRows === 1) {
        res.json({ success: true, message: 'Register successful' });
      } else {
        res.status(400).json({ success: false, message: 'Registration failed' });
      }
    }
  );
});

// Login route
app.post('/login', (req, res) => {
  const { username, pwd } = req.body;

  const query = 'SELECT idU, username, role FROM user WHERE username = ? AND pwd = ?';
  db.query(query, [username, pwd], (err, results) => {
    console.log(username, pwd);
    console.log(results);

    if (err) {
      return res.status(500).json({ message: 'DB error', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
      
    }

    const user = results[0];
    req.session.user=user;
    res.json({ success: true, user }); // wrap it in success + user
  });
});

app.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});
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

//games pc
app.get('/gamespc', (req, res) => {
  db.query('SELECT * FROM game where console="pc"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games ps4
app.get('/gamesps4', (req, res) => {
  db.query('SELECT * FROM game where console="ps4"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games ps5
app.get('/gamesps5', (req, res) => {
  db.query('SELECT * FROM game where console="ps5"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games x1
app.get('/gamesxone', (req, res) => {
  db.query('SELECT * FROM game where console="xbox one"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games x360
app.get('/gamesx360', (req, res) => {
  db.query('SELECT * FROM game where console="xbox 360"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games action
app.get('/gamesaction', (req, res) => {
  db.query('SELECT * FROM game where categorie="action"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games adventure
app.get('/gamesadventure', (req, res) => {
  db.query('SELECT * FROM game where categorie="adventure"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games sports
app.get('/gamessports', (req, res) => {
  db.query('SELECT * FROM game where categorie="sports"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});
//games strategy
app.get('/gamestrategy', (req, res) => {
  db.query('SELECT * FROM game where categorie="strategy"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

//games rpg
app.get('/gamesrpg', (req, res) => {
  db.query('SELECT * FROM game where categorie="rpg"', (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});




router.get('/game/:id', (req, res) => {
  const gameId = req.params.id;
  const query = 'SELECT * FROM game WHERE idG = ?';

  db.query(query, [gameId], (err, results) => {
    if (err) {
      console.error('Error fetching game:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(results[0]);
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
