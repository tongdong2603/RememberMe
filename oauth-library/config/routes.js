const home = require('../app/controllers/HomeController');
const login = require('../app/controllers/LoginController');
const garoon = require('../app/controllers/GaroonController');
// const office = require('../app/controllers/OfficeController');
const test = require('../app/controllers/TestController');

//you can include all your controllers
module.exports = function (app,middleware) {
  app.get('/oauth2/login',middleware.guest, login.loginForm);
  app.get('/oauth2/garoon', login.loginGaroonForm);
  app.get('/oauth2/google', login.loginGoogleForm);
  app.get('/oauth2/microsoft/callback', login.microsoftCalback);
  app.get('/oauth2/garoon/callback', login.garoonCallback);
  app.get('/oauth2/google/callback', login.googleCallback);
  app.get('/oauth2/service', login.mservice);
  app.get('/', middleware.loggedIn, home.home);//home

  app.get('/logout', login.oauthLogout);//logout

  app.get('/garoonCalendar', garoon.index);//test
  app.get('/test', test.home);//test
  // app.get('/officeCalendar',middleware.loggedIn, office.index);//test
}
