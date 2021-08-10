// packages
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
// controllers
const signin = require('./controllers/signin');

// const db = knex({
//     client: 'pg',
//     connection: {
//       connectionString: process.env.DATABASE_URL, // heroku PSQL
//       ssl: {
//         rejectUnauthorized: false
//       }
//     }
//   });

// creating express server
const app = express();

// middle-ware for parsing JSON data from front-end
app.use(express.json());
app.use(cors);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}...`);
});

// app.post('/signin', signin.handleSignin(db, bcrypt) );
