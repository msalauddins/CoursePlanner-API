//Header File
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET || 'secret'
const auth = require('./modules/checkJWTauth.js');

app.use(express.json());
app.set('json spaces', 4);
app.use(express.static('files')) //to load local files (images/js/css/htm)

var bodyParser = require('body-parser'); //This will allow to pass the data to the server & also convert that data into JSON format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/course_planner', { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('--------------------Mongoose Connected!--------------------');
});

var areaSchema = new mongoose.Schema();
var courseSchema = new mongoose.Schema();
var userSchema = new mongoose.Schema({ name: String, email: String, uid: String, pass: String, timestamp: String });

var Area = mongoose.model('Area', areaSchema);
var Course = mongoose.model('Course', courseSchema);
var User = mongoose.model('User', userSchema);
//------------------------------ (END) ------------------------------

//Get API Links
app.get('/areas', function(req, res) {
  Area.find({}, function (err, area) {
    if (err) throw err;
    res.status(200).send(area);
  });
});

app.get('/courses', function(req, res){
  Course.find({}, function (err, course) {
    if (err) throw err;
    res.status(200).send(course);
  });
});

app.get('/users', function(req, res) {
  User.find({}, function (err, user) {
    if (err) throw err;
    res.status(200).send(user);
  });
});

app.get('Need some more times, i', function(req, res) {
  Course.find({ area_id: req.params.area_id }, function (err, course) {
    if (err) throw err;
    res.status(200).send(course);
  });
});
//------------------------------ (END) ------------------------------

// Single string query request
app.get('/find/areas', function(req, res) {       //This will work for query string  http://localhost:3000/find/areas?areaid=
  Course.find({ area_id: req.query.areaid }, function (err, course) {
  if (err) throw err;
  res.send(course);
  });
});

app.get('/find/course', function(req, res) {        //This will work for query string  http://localhost:3000/find/course?courseid= 
  Course.find({ course_id: req.query.courseid }, function (err, course) {
  if (err) throw err;
  res.send(course);
  });
});

// Multiple string query request
app.get('/find', function(req, res) {       //This will work for query string  http://localhost:3000/find?area=  &course=
  Course.find({ area_id: req.query.area, course_id: req.query.course }, function (err, course) {
  if (err) throw err;
  res.send(course);
  });
});
//------------------------------ (END) ------------------------------

//Send HTML file/data
app.get('', function(req, res) {        
  require('fs').readFile('files/HTML/Connected.html', 'utf8', function(err, data){
    if(err) throw err;
    res.send(data);
  })
});

app.get('/status', function(req, res) {       //Using Redirect
res.status(200).redirect('http://localhost:3000');
});
//------------------------------ (END) ------------------------------

//Call for the HTML form for add/delete/update user data
app.get('/add', function(req, res) {
  require('fs').readFile('files/HTML/SaveUser.html', 'utf8', function(err, data){
    if(err) throw err;
    res.send(data);
  })
});

app.get('/delete', function(req, res) {
  require('fs').readFile('files/HTML/DeleteUser.html', 'utf8', function(err, data){
    if(err) throw err;
    res.send(data);
  })
});

app.get('/update', function(req, res) {
  require('fs').readFile('files/HTML/UpdateUser.html', 'utf8', function(err, data){
    if(err) throw err;
    res.send(data);
  })
});
//------------------------------ (END) ------------------------------

// Different Method (Direct call the file)
app.use("/new/user2", function(req, res) {
  res.sendFile(__dirname +'/files/' + 'HTML/' + 'SaveUser.html');
 });
//------------------------------ (END) ------------------------------

// Add/Delete/Update Operation to Database
 app.post("/new/user/dialog", function(req, res) {       //Add Operation
  var data = new User(req.body);
    data.save()
    .then(item => {
      res.status(201).sendFile(__dirname + '/files/' + 'HTML/' + 'SaveSuccess.html');
    })
    .catch(err => {
      res.status(400).send('Sorry! unable to save to database');
    });
  });

app.delete('/userid/:id', function(req, res) {        //Delete Operation (by id) works on Postman
  User.findByIdAndDelete({ _id: req.params.id }, function (err, userdeleted) {
    if (err) throw err;
     res.send(userdeleted);
  });
});

  app.delete('/delete/user/:uid', function(req, res) {       //Delete Operation (uid) works on Postman
    User.findOneAndDelete({uid: req.params.uid}, function (err, user) {
      if (err) throw err;
      res.status(200).send(user);
    });
  });

    app.put('/update/user/:uid', function(req, res) {       //Update Operation (uid) works on Postman
      uid = req.params.uid;
      User.findOneAndUpdate({uid: uid}, req.body, function (err, userOld, next) {
        if (err) throw err;
        User.find({uid: uid}, function (err, userNew) {
          if (err) throw err;
        res.status(200).send('-----Updated Data----- \r' + userNew + '\r\r-----Old Data-----\r' + userOld);
      });
    });
  });
//------------------------------ (END) ------------------------------

//Login using UserID and Pass (Without JWT)
app.get('/login', function(req, res) {
  require('fs').readFile('files/HTML/Login.html', 'utf8', function(err, data){
    if(err) throw err;
    res.send(data);
  })
});

app.post('/log-in', function(req, res) { 
  User.findOne({uid:req.body.uid, pass:req.body.pass}, function(err,user) {
    if(err) {
      console.log(err);
      return res.status(500).send('Error!');
      } 
 
    if(!user){
      return res.status(404).send('User Not Found!');
      }

    else{
      res.status(200)
      res.redirect(`/home`)
      }
    });
  });

  app.get('/home', function(req, res) {
    require('fs').readFile('files/HTML/Home.html', 'utf8', function(err, data){
      if(err) throw err;
      res.send(data);
    })
  });
//------------------------------ (END) ------------------------------

//Login using JWT and Postman
app.post('/jwt', function(req, res, next) {
  let UserID = req.body.uid;
  User.find({ uid: UserID })
  .exec()
    .then(user => {
      if (user.length < 1) {
        return res.send('Sorry, user ID '+ UserID +' is Not found!');
      }
      else if(req.body.pass != user[0].pass){
        return res.send('Password Incorrect!');
    }
      else if(req.body.pass == user[0].pass){
          const token = jwt.sign({ uid: user[0].uid, role: 'user'}, jwtSecret, {
            expiresIn: 30
          })
          return res.send({ message: "Token Generated Successful", token: token});
      }
    else{
      return res.send('Unknown Error!');
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.get('/jwthome', auth, function(req, res) { //auth test
    require('fs').readFile('files/HTML/HomeJWTAuth.html', 'utf8', function(err, data){
      if(err) throw err;
      res.send(data);
    })
});

//------------------------------ (END) ------------------------------

// Listener..........
app.listen(3000, function () {
  console.log('Server is listening on port 3000')
});
//------------------------------ (END) ------------------------------

//for Mocha test
module.exports = app