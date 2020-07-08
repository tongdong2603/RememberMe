const microsoft = require('./../../lib/microsoft');
const graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone').tz.setDefault("Asia/Tokyo");
const db = require('./../../config/database').documentClient;
updateEvent = async function(client,eventId,body,callback) {
	try {

		result = await client
		  	.api(`/me/events/${eventId}`)
		  	.header("content-type", "application/json")
		  	.patch(body);
		  	// console.log(result)
		  	if(typeof callback === 'function') {
				callback(result,null)
			}
		  return result
	} catch(e) {
		if(typeof callback === 'function') {
			callback(null,e)
		}
	}

}
exports.updateEvent = updateEvent

createEvent = async function(client,body,callback) {
	try {
	  result = await client
		  .api(`/me/events`)
		  .header("content-type", "application/json")
		  .post(body);
	  	if(typeof callback === 'function') {
			callback(result,null)
		}
	  return result
	} catch(e) {
		if(typeof callback === 'function') {
			callback(null,e)
		}
	}

}
exports.createEvent = createEvent

/**
 * access_token
 * serviceld.expiresIn.N: INT
 * serviceld.expires_on.N: access_token expires on 
 */
exports.getAccessToken = async function(domain,serviceld) {
	let now = moment()
	let timeNow = now.valueOf() // 1557285529770
	let expires_in = serviceld.expires_in
	let expires_on = moment(serviceld.expires_on).valueOf()
	let access_token = serviceld.access_token
	let refresh_token = serviceld.refresh_token
	let valueOfMinutes = 300000 //Expire 5 minutes early to account for clock differences
	let expiration = (expires_on - valueOfMinutes) 
	if(expiration > timeNow) {
		return access_token
	} else {
		const credentials = {
		  client: {
		    id: process.env.APP_ID,
		    secret: process.env.APP_PASSWORD,
		  }, 
		  auth: {
		    tokenHost: 'https://login.microsoftonline.com',
		    authorizePath: 'common/oauth2/v2.0/authorize',
		    tokenPath: 'common/oauth2/v2.0/token'
		  }
		};
		const jwt = require('jsonwebtoken');
		const oauth2 = require('simple-oauth2').create(credentials);
		try	{
			const newToken = await oauth2.accessToken.create({refresh_token: refresh_token}).refresh();
  			// console.log(newToken.token)
  			let _access_token = newToken.token.access_token
  			let _expiresIn = newToken.token.expires_in
  			let _expires_on = moment(newToken.token.expires_at).valueOf()
  			// let refresh_token = newToken.token.refresh_token
		 	let params = {
			  	ExpressionAttributeNames: {
				   "#S": "serviceld"
			  	}, 
			  	ExpressionAttributeValues: {
				   ":s": {
				     	"access_token":_access_token,
		        		"TokenType":"Bearer",
		        		"expiresIn":_expiresIn,
		        		"expires_on":_expires_on,
		        		// "resource":{"S":"https://service.contoso.com/"}, // if request auth 
		        		"refresh_token":refresh_token,
		        		// "scope":{"S":"https%3A%2F%2Fgraph.microsoft.com%2Fmail.read"}, // if request auth 
		        		// "idToken":{"S":"aw1asSa"}
				    }
			  	}, 
			  	Key: {
				   	"domain": domain
			  	}, 
			  	ReturnValues: "ALL_NEW", 
			  	TableName: "Setting-Garoon-Office", 
			  	UpdateExpression: "SET #S = :s"
		 	};
			await db.update(params, function(err, data) {
				console.log(err,data)
			})	
			return access_token	 
		} catch(e) {
			console.log(e)
		}
	}

}








