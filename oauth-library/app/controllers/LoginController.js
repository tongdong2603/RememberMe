var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
// var dateFormat = require('dateformat');
var microsoft = require('./../../lib/microsoft');
var request = require('request')
const querystring = require('querystring');
const AWS = require('aws-sdk');
AWS.config.accessKeyId = 'root';
AWS.config.secretAccessKey = 'root';
AWS.config.region = 'us-west-2';
AWS.config.endpoint = 'http://localhost:8000';
AWS.config.apiVersions = {
  dynamodb: 'latest',
};
const db = new AWS.DynamoDB.DocumentClient();

exports.loginForm = async function(req, res) {
	let parms = { title: 'Home', active: { home: false },layout: false };

  const accessToken = await microsoft.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;
    parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
  } else {
    parms.signInUrl = microsoft.getAuthUrl();
    parms.debug = parms.signInUrl;
  }

  const g = {
    client_id:process.env.GAROON_APP_ID,
    redirect_uri:process.env.GAROON_CALLBACK_URL,
    state:"state1",
    response_type:"code",
    scope:"g:schedule:read g:schedule:write"
  }
  const query = querystring.stringify(g);
  const url = `https://xf64e.cybozu.com/oauth2/authorization?${query}`;
  parms.garoonUrl = url;

  res.render('login', parms);	
}

exports.microsoftCalback = async function(req, res) {
	// Get auth code
  const code = req.query.code;
  // console.log(token = await microsoft.getTokenFromCode(code, res))
  // If code is present, use it
  if (code) {
    let token;
    try {
      token = await microsoft.getTokenFromCode(code, res);
    } catch (error) {
      res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
    }
    
    console.log(token)
    // res.send("OK")
    // Redirect to home
    res.redirect('/oauth2/login');
  } else {
    // Otherwise complain
    res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
  }
}

exports.oauthLogout = function(req, res, next) {
	microsoft.clearCookies(res);

  // Redirect to home
  res.redirect('/');
}

exports.mservice = function(req, res, next) {
  let params ={
    "client_id":process.env.APP_ID,
    "client_secret":process.env.APP_PASSWORD,
    "scope":process.env.APP_SCOPES,
    "grant_type":"client_credentials",
  };
  request.post({
    headers: {
      "Content-type":"application/json",
    },
    uri: `https://login.microsoftonline.com/a5a5f81d-0483-48aa-b917-66cba9eb8ed8/oauth2/v2.0/token`,
    body: JSON.stringify(params)
  },function(err,res,body) {
    console.log(err,"=====",res,"====",body)
  })
}

exports.loginGaroonForm = (req,res) => {
  const params = {
    client_id:process.env.GAROON_APP_ID,
    redirect_uri:process.env.GAROON_CALLBACK_URL,
    state:"state1",
    response_type:"code",
    scope:"g:schedule:read g:schedule:write"
  }
  const query = querystring.stringify(params);
  const url = `https://xf64e.cybozu.com/oauth2/authorization?${query}`;
  res.send(`<a href="${url}">Login</a>`);
}

exports.garoonCallback = async function(req,res) {
  const code = req.query.code;
  const params = {
    "grant_type":"authorization_code",
    "redirect_uri":"https://localhost:3000/oauth2/garoon/callback",
    "code":code,
    "client_id":process.env.GAROON_APP_ID,
    "client_secret":process.env.GAROON_APP_SECRET
  }
  const query = querystring.stringify(params);
  console.log('query', params)
  request.post({
    uri:"https://xf64e.cybozu.com/oauth2/token",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:query
  },(error, response, body) => {
    const statusCode = response.hasOwnProperty('statusCode') ? response.statusCode : null;
    body = JSON.parse(body);
    console.log(statusCode,body);
    res.send(body);
  })
  // res.send("OK");
  // Redirect to home
  // res.redirect('/oauth2/login');
}

exports.loginGoogleForm = (req, res) => {
  const params = {
    client_id:process.env.GOOGLE_CLIENT_ID,
    redirect_uri:process.env.GOOGLE_CALLBACK_URL,
    response_type:"code",
    scope:"g:schedule:read g:schedule:write"
  }
  const query = querystring.stringify(params);
  const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=765707154637-a638nia00o720m9540pi36o5ljjggm2t.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Foauth2%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20openid%20profile%20email&approval_prompt=force&access_type=offline`;
  res.send(`<a href="${url}">Login</a>`);
}

exports.googleCallback = async function(req, res) {
  const code = req.query.code;
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    code,
    grant_type: 'authorization_code'
  };
  const query = querystring.stringify(params);
  request.post({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: query,
    url: process.env.GOOGLE_BASE_URL
  }, (error, response, body) => {
    console.log('body', body);
    res.send(body);
  })
  // res.redirect('/oauth2/login');
}
 
function getTokenFromCode(code) {
  let params ={
    "client_id":process.env.APP_ID,
    "client_secret":process.env.APP_PASSWORD,
    "scope":process.env.APP_SCOPES,
    "grant_type":"client_credentials",
    "code":code,
  };
  let query = querystring.stringify(params)
  request.post({
    headers: {
      "Content-type":"application/json",
    },
    uri: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
    body: JSON.stringify(params)
  },function(err,res,body) {

  })
}

















