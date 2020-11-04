require('dotenv').config()
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override')

//Login admi
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
//---------------

var personal = require('./routes/personal');

var index = require('./routes/index');
var users = require('./routes/users');
var requisito = require('./routes/requi');
var globalmente = require('./routes/globalmente');
var documento = require('./routes/docume');
var docevento = require('./routes/doce_evento');
var logeven = require('./routes/logeven');
var semestr = require('./routes/semestr');
var alumno = require('./routes/alumno');
var asignatura = require('./routes/asignatura');

//var config = require('./routes/config');
//var usuario   = require('./routes/Usuario');


mongoose.connect(process.env.URI, function (error) {
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});


var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//configuracion del login
app.use(session({ secret: process.env.TOKEN })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


require('./routes/rutas')(app, passport);
require('./routes/passport')(passport);


//pruebas de tiempo
/*app.get('/hola', function(req, res){
  //2011-03-10T17:42:18.922Z
  /*var ahorautc = moment().utc();
  console.log(req._startTime);
  console.log(req._startTime+"");
  console.log(moment().dayOfYear());
  console.log(moment().get('year'));
  console.log(moment().get('hour'));
  console.log(ahorautc.get('hour'));
  console.log(ahorautc);
  console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a, Z"));
  console.log(ahorautc.format("dddd, MMMM Do YYYY, h:mm:ss a, Z"));
  console.log("la hora de la subida es"+moment().format("h:mm:ss a"));
  console.log("la fecha de la subida es"+moment().format("D M YYYY"));*/
/*var hora = moment("2010-April-20 4:30 pm +0000","YYYY-MMMM-DD HH:mm a Z");
console.log(hora.toISOString());
res.send('hola');
});*/

/* app.get('/pruebax', function (req, res) {
  res.render('prueba');
}); */


app.get('/hee', globalmente.cabeza);


//Get data Web Page
app.get('/GetRequi', globalmente.ObAjxRequi);
app.get('/GetProfe', globalmente.ObAjxProf);
app.get('/GetCrono', globalmente.ObAjxCrono);
//get data prof page web
app.get('/profe/:id', personal.show2);
app.get('/GetBal/:tipo', documento.getDocc);

//Bot Facebook
/*app.get('/webhook', (req, res) => {
  console.log('hola');
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'camila') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});*/

/* For Facebook Validation */
/* app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
}); */

/* Handling all messenges */
/* app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
}); */


/* const request = require('request');

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAADkMJYn1rgBAOPrJZAsxMiXLP1e6PM8nv80ePDeQDGTtOCltniJ380hMZBOg4iTcIFUtnKiRH9YnnGIrfvUKvMc8T8ZCSiX0POroxvgSuGj7oaONPgIatXgtZCDrsHPp4VdutmXAjyZAApEKvnVOAs763MDfRkATedODgxenZBwJs0ZB8N6FiA' },
    method: 'POST',
    json: {
      recipient: { id: sender },
      message: { text: text }
    }
  }, function (error, response) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
} */


/*
function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
      sendMessage(senderId, {text: message});
    });
  }
}

function sendMessage(recipientId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message: message,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.status == 404)
    res.render('err404');
  else
    res.render('error');
});

module.exports = app;
