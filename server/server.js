require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const sc = require('./controller')

const app = express();
app.use(bodyParser.json());

massive(process.env.DB_STRING).then(db => {
  app.set('db', db);
});

app.post('/api/auth/register', (req, res) => {
  const { username, password, profile_pic } = req.body;
  app.get('db').create_user([username, password, profile_pic]).then((respond) => {
    res.status(200).send(respond)
  })
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  app.get('db').login_user([username, password]).then((respond) => {
    res.status(200).send(respond)
  })
});

// Logical end points!_______________________
app.get('/api/posts/:userid', (req, res) => {
  const { userid } = req.params;
  const { search, myposts } = req.query;
  console.log(search, myposts)

  // when user logs first time
  if ((myposts === "false" && search === '') || (myposts === undefined && search === undefined) || 
  (myposts === "true" && search === undefined) 
) {
    app.get('db').getAllPosts().then(posts => {
      res.status(200).send(posts)
    })
  } 
  
  // checkSelected => only user's post
  else if (myposts === 'true' && search === '') {
    app.get('db').getUserPostsWithoutFilter([userid]).then(posts => {
      res.status(200).send(posts);
    })
  }

  // checkSelected => only user filtering his post
  else if (myposts === "true" && search !== '') {
      app.get('db').getUserPosts([userid, search]).then(posts => {
        res.status(200).send(posts);
      })
    } 

  // Check not selected and search not empty => filtering other's post
  else if (myposts === "false" && search.length !== 0) {
    app.get('db').searchOtherPeoplePost([userid, search]).then(posts => {
      res.status(200).send(posts)
    })
  }   
})

// Part 4
  app.get('/api/post/:postid', (req, res) => {
    const { postid } = req.params;
    console.log(postid)
    app.get('db').getSinglePost([postid]).then(post => {
      res.status(200).send(post);
    })
  })

// Part 5
  app.post('/api/post/:userid', (req, res) => {
    const { title, img, content } = req.body;
    console.log(title, img, content )
    app.get('db').getFormInfo([title, img, content]).then(info => {
      res.status(200).send(info);
    })
  })

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up: ${port}`);
})