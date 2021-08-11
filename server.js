// packages
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require("cors");
const knex = require('knex');
// controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, // heroku PSQL
      ssl: {
        rejectUnauthorized: false
      },
    },
  });

// creating express server
const app = express();

// middle-ware for parsing JSON data from front-end
app.use(express.json());

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send("it's working")
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt, db)});

app.post('/register',  (req, res) => { register.handleRegister(req,res, bcrypt, db)});

app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT)
        console.log(`app is running on port ${process.env.PORT}...`);
    else
        console.log('app is running on port 3000...');
    
});

