var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
// var dateFormat = require('dateformat');
var microsoft = require('./../../lib/microsoft');

exports.home = async function(req, res) {
	let parms = { title: 'Home', active: { home: true } };
  const _b64Str = Buffer.from(`minh:1111`).toString('base64');
  console.log(_b64Str) 
  const accessToken = await microsoft.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;
    parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
  } else {
    parms.signInUrl = microsoft.getAuthUrl();
    parms.debug = parms.signInUrl;
  }

  res.render('index', parms);
}



    
