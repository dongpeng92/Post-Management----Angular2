var express = require('express'),
  app = express();
  cors = require('cors'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/post_management');
var db = mongoose.connection;
db.on('error', function () {
  console.log("Error happens!!");
});
db.on('open', function () {
  console.log("Connection established!!!");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var user_schema = mongoose.Schema({
  username: String,
  password: String,
});
var user_model = mongoose.model('users', user_schema);

var post_schema = mongoose.Schema({
  uname: String,
  title: String,
  description: String,
  comments: Array,
  likes: Array
});
var post_model = mongoose.model('posts', post_schema);

app.post('/register', function (req, res) {
  console.log(req.body);
  var new_user = user_model(req.body);
  new_user.save(function (err) {
    if (!err) {
      console.log("user save!");
      res.send({
        flg: true
      });
    }
  });
});

app.post('/authenticate', function (req, res) {
  console.log(req.body);
  var token = jwt.sign({'uname': req.body.username}, 'marlabs-secret-key', {
    expiresIn: '1h'
  });
  user_model.findOne({'username': req.body.username, 'password': req.body.password}, function (err, user) {
    if (!err && user) {
      res.send({
        isLoggedIn: true,
        token: token
      });
    } else {
      res.send({
        isLoggedIn: false
      });
    }
  });
});

app.use(function (req, res, next) {
  var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
  jwt.verify(token, 'marlabs-secret-key', function (err, decoded) {
    if (err) {
      res.send({
        err: true,
        msg: 'Invalid request'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

app.post('/create', function (req, res) {
  console.log(req.decoded);
  var new_post = post_model({
    'uname': req.decoded.uname,
    'title': req.body.title,
    'description': req.body.description,
  });
  new_post.save(function (err) {
    if (!err) {
      console.log("post save!");
      res.send({
        flg: true
      });
    }
  });
});

app.get('/getposts', function (req, res) {
  post_model.find({'uname': req.decoded.uname}, function (err, posts) {
    if(!err) {
      console.log(posts);
      res.send(posts);
    }
  })
});

app.get('/getpost', function (req, res) {
  console.log(req.query.id);
  post_model.findOne({'_id': req.query.id}, function (err, post) {
    if(!err) {
      console.log(post);
      res.send(post);
    }
  })
});

app.post('/savecomments', function (req, res) {
  post_model.update({'_id': req.query.id}, {'comments' : req.body}, function (err,raw) {
    if(!err) {
      res.send({
        flg: true
      });
    }
  })
});

app.post('/addlike', function (req, res) {
  console.log(req.body);
  console.log(req.decoded.uname);
  var likes = res.body ? res.body : [];
  likes.push(req.decoded.uname);
  post_model.update({'_id': req.query.id}, {'likes' : likes}, function (err,raw) {
    if(!err) {
      console.log(raw);
      if(likes.includes(req.decoded.uname)) {
        res.send({
          liked: true
        });
      }
    }
  })
});

app.post('/editpost', function (req, res) {
  console.log(req.query.id);
  var query = {'title': req.body.title, 'description': req.body.description}
  post_model.update({'_id': req.query.id}, query, function (err, doc) {
    if(!err) {
      res.send({
        flg: true
      })
    }
  })
});

app.get('/deletepost', function (req, res) {
  post_model.remove({'_id': req.query.id}, function (err) {
    if(!err) {
      res.send({
        flg: true
      })
    }
  })
});

app.listen(3000, function () {
  console.log("Sever running @ localhost:3000");
});

