const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
// passport can be used for allot of difference site google, facebook, github etc
const passport = require('passport');
// this will allows us to restore the user we get back from github
const session = require('express-session');
// installed npm i passport-github2 to focus on github
const GitHubStrategy = require('passport-github2').Strategy;
// install cors npm i cors as we are using it
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

// create a swagger.json file each time you make changes "node swagger.js"

app
  .use(bodyParser.json())
  .use(session({
    // this is setting up to use a cookee and "secret" is the name of the cookee
    // in production make is some random number
    secret: "secret",
    resave: false ,
    saveUninitialized: true,
  }))
  // This is the basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  //allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({method: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes/index.js'));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done){
    //User.findOrCreate({ githubID: profile.id }, function(err, usser){
    return done(null, profile);
    //});
  }
));

// passport requires two functions serializeUser and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// this checks the session user and see if its been set if yes it will display the logged in name otherwise it will show logged out
app.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged out")
});


//this is what github sends back to us
app.get('/github/callback', passport.authenticate('github' , {
  failureRedirect: '/api-docs', session: false}),
(req, res) => {
  // req.user is the user github sends back. this eq.session.user is our user
  req.session.user = req.user;
  res.redirect('/');
  console.log(req.session.user);
});



// these are new and this is one way to handle erros - its a catch all and wil print all errors in console
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// there is no routes.js so it them looks at the dir routes for index.js

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

