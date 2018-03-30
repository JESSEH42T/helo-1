require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');

const sc = require('./controller')

const app = express();

const { 
  DB_STRING,
  PORT,
  SESSION_SECRET
 } = process.env;

app.use(bodyParser.json());

massive(process.env.DB_STRING).then(db => {
  app.set('db', db);
});

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET
}));

app.use((req, res, next) => {
  if (!req.session.user) {
    const { username, password, profile_pic } = req.body
    req.session.user = {
      username,
      password, 
      profile_pic
    }
  }
  next();
})

app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  app.get('db').create_user([username, password]).then((respond) => {
    res.status(200).send(respond)
  })
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  app.get('db').create_user([username, password]).then((respond) => {
    res.status(200).send(respond)
  })
});

app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  app.get('db').get_user([parseInt(id, 10)]).then(user => {
    res.status(200).send(user);
  }) 
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up: ${port}`);
})