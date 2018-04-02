require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const sc = require('./controller')

const app = express();
app.use(bodyParser.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));

massive(process.env.DB_STRING).then(db => {
  app.set('db', db);
});

// authentication__________________________
app.post('/api/auth/register', (req, res, next) => {
  const { username, password, profile_pic } = req.body;
  app.get('db').create_user([username, password, profile_pic]).then((userInfo) => {
    // if (!req.session.userid) {
      req.session.userid = userInfo[0].id;
    // }
    res.status(200).send(userInfo)
  })
});

app.post('/api/auth/login', (req, res, next) => {
  const { username, password } = req.body;
  app.get('db').login_user([username, password]).then((userInfo) => {
    // if (!req.session.userid) {
      req.session.userid = userInfo[0].id; //careful with tables here
    // }
    res.status(200).send(userInfo)
  })
})

// auth end points traditionally use post endpoints!!!
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
});

// session
app.get('/api/auth/me', (req, res) => {
  console.log(req.session)
  app.get('db').getMe([req.session.userid]).then(myInfo => {
    console.log(myInfo)
    res.status(200).send(myInfo);
  })
})

// Logical end points!_______________________
app.get('/api/posts', (req, res) => {
  const { userid } = req.session; //important node that using session.id than params.id
  const { search, myposts } = req.query;
  // console.log(search, myposts, userid)

  // when user logs first time
  if ((myposts === "false" && search === '') || (myposts === undefined && search === undefined) || 
  (myposts === "true" && search === "undefined") 
) {
    app.get('db').getAllPosts().then(posts => {
      res.status(200).send(posts)
    })
  } 
  
  // checkSelected => only user's post
  else if (myposts === 'true' && search === '') {
    console.log(`search: ${search.length}, mypost: ${myposts}, id: ${userid}`)
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
  app.get('/api/post/:postid', (req, res) => {   //postid has a problem!!!
    const { postid } = req.params;
    console.log(postid)
    app.get('db').getSinglePost([postid]).then(post => {
      res.status(200).send(post);
    })
  })

// Part 5 
  app.post('/api/post', (req, res) => {
    const { userid } = req.session;
    const { title, img, content } = req.body;
    app.get('db').createNewPost([title, img, content, userid]).then(info => {
      res.status(200).send(info);
    })
  })




const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up: ${port}`);
})