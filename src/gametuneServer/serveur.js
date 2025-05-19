const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const Stripe = require('stripe');
const cors = require('cors');
const session = require('express-session');
const stripe = Stripe('sk_test_51RQRLcHCMzwyqMABuXDErZLxt0x31GLAh96t8Jc6P235SxV7yVfNrJMMYLAk6mNFpeTcOtyRR164VYr1TErCjElV00hujTz7DI'); // 🔒 Secret key from Stripe dashboard


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
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency,
      // optionally add: metadata, customer info, etc.
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/saveItems', (req, res) => {
  // Log the request body for debugging
  console.log('Request Body:', req.body);

  const { game, userID, prix,idG } = req.body;
  if(userID!=null){
  const query = "INSERT INTO userchart VALUES (?, ?, ?,?)";
  db.query(query, [userID, prix, game,idG], (err, results) => {
    console.log('Inserted:', game, userID, prix);
    console.log('DB Result:', results);

    if (err) {
      return res.status(500).json({ message: 'DB error', error: err });
    }

    
    res.json({ success: true });
  });}
});
app.post('/subComm', (req, res) => {
  const { idG,id, comm } = req.body;
   const query = 'insert into gamescomments(idG,idU,comment) values(?,?,?)';
   db.query(query, [idG, id,comm], (err, results) => {
    
    console.log(results);

    if (err) {
      return res.status(500).json({ message: 'DB error', error: err });
    }else{
      return res.status(200).json({ message: 'comment  added', success:true });
    }
  });
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
app.post('/subSale', (req, res) => {
  const { nomG, idG, prixG, idU } = req.body;
console.log('Received from frontend:', { nomG, idG, prixG, idU }); 
  const query = 'INSERT INTO  venteadmin (idU, nomG, idG, prixG) VALUES (?, ?, ?, ?)';
  db.query(query, [nomG, idG, prixG, idU], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.affectedRows === 1) {
      return res.status(200).json({ success: true, message: 'Sale recorded' });
    } else {
      return res.status(400).json({ success: false, message: 'Insert failed' });
    }
  });
});
app.post('/clearCart', (req, res) => {
  const {  id } = req.body;

  const query = 'delete from userchart where idU=?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ success: true, message: 'delete recorded' });
    } else {
      return res.status(400).json({ success: false, message: 'delete failed' });
    }
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

app.get('/Items', (req, res) => {
  const {idU} = req.query;
  const query='SELECT * FROM userchart where idU=?';
  db.query(query,[idU], (err, results) => {
    if (err) {
      console.error('Error fetching Items:', err);
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

//getting comments
app.get('/comments/:id', (req, res) => {
  const gameId = req.params.id;
  const query = 'SELECT * FROM gamesComments WHERE idG = ?';

  db.query(query, [gameId], (err, results) => {
    console.log("comments",results);
    if (err) {
      console.error('Error fetching game:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }else{res.json(results); 
      
     }
    
    
  });
});
// getting specific game
app.get('/game/:id', (req, res) => {
  const gameId = req.params.id;
  const query = 'SELECT * FROM game WHERE idG = ?';

  db.query(query, [gameId], (err, results) => {
    console.log(results);
    if (err) {
      console.error('Error fetching game:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(results[0]);  // Return only the first result (single game)
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
