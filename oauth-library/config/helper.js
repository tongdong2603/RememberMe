const db = require('./database').dynamodb;
const documentClient = require('./database').documentClient;
const moment = require('moment-timezone').tz.setDefault("Asia/Tokyo");
const nodemailer = require('nodemailer');
let now = moment().toISOString();

exports.createEventAppData = function(domain) {
	let params = {
	    TableName: 'go-stg-event-app',
	    // TableName: 'EventApp',
	    Item: {
	        'domain': domain || 'https://fabbivn.cybozu.com',
	        'garoonEventId': '1',
	        'officeEventId': 'AQMkADAwATZiZmYAZC1jNzM3LTY5YjYtMDACLTAwCgBGAAADTaL8efp5xkOdgpiINv0qUAcA2KY8ByltOkqC2TFEcx3-7gAAAgENAAAA2KY8ByltOkqC2TFEcx3-7gACblv5ggAAAA==',
	        'start_Datetime': '2019-05-14T02:08:27.000Z',
	        'end_Datetime': '2019-05-14T02:08:27.000Z',
	        'subject': 'Subject',
	        'notes': 'notes',
	        'isAllDay': true, // false
	        'attendees': 'Hung, Tan',
	        'creator': 'Hung',
	        'isNeedToSync': "false",
	    }
	}

	// Call DynamoDB to add the item to the table
	documentClient.put(params, function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Success", data);
		}
	});
}

// 
exports.createSettingsData = function(domain,options) {
	var params = {
	    // TableName: 'Setting-Garoon-Office',
	    TableName: 'go-stg-setting',
	    Item: {
	        'domain':  domain,//'xf64e.cybozu.com',
	        'runtime': 10,
	        'serviceld': {
	        	"userId":"huynh@fabbier.onmicrosoft.com",
	            "token_type": "Bearer",
	            "expires_in": 3600,
	            "access_token": "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYOEtjOHNwUWxlNzVmUnJ1TVlTRzdBUUpBUjRmb2x5Y0dlNmFabnlVdE9UbXRFUVU5ZkR5VDFKTkdYd2Nxd2syXzFvZ1FrZmd2UmpmaVBlaHNjYXhoVGlBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIiwia2lkIjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zMzJiZjZjNi02MWMwLTQ2N2QtYjA4Yy0yZjcxNDJmMDRkZGIvIiwiaWF0IjoxNTU4Nzc2MTA1LCJuYmYiOjE1NTg3NzYxMDUsImV4cCI6MTU1ODc4MDAwNSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZSmpERm5mbS9STkdkY01ua25zT05NN0pGVCtSLzdRLzRueXZndnlFTTFGNjZUc0IiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkNhbGVuZGFyIFdlYmhvb2siLCJhcHBpZCI6ImZjZDllM2VmLTRjMTMtNGQ5ZC1iMjA2LWI4NjBjZTU4MTQyZCIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiSHV5bmgiLCJnaXZlbl9uYW1lIjoiTGUiLCJpcGFkZHIiOiIxMDMuODguMTEzLjE0NiIsIm5hbWUiOiJMZSBIdXluaCIsIm9pZCI6ImY1ODcyYTNlLTQ2MTMtNDBhNC05Zjg5LWVjZTkyNTMwY2FhOCIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMDQ0OEEzRjYxIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWQgQ2FsZW5kYXJzLlJlYWQuU2hhcmVkIENhbGVuZGFycy5SZWFkV3JpdGUgQ2FsZW5kYXJzLlJlYWRXcml0ZS5TaGFyZWQgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic3ViIjoiWmF0SHlhcUxwTkVONnhvNGtaUmliemNQb0pxM3NpazB3ejZYc0dnZF9MQSIsInRpZCI6IjMzMmJmNmM2LTYxYzAtNDY3ZC1iMDhjLTJmNzE0MmYwNGRkYiIsInVuaXF1ZV9uYW1lIjoiaHV5bmhAZmFiYmllci5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJodXluaEBmYWJiaWVyLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IkJfNm9DVlJQUGtTcV9BdFlhRXNVQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCJdLCJ4bXNfc3QiOnsic3ViIjoiNXNHVURhTmc1aGRPbWxLNEh5TFBId1lzNUx0c3RxYnA2Uzl5SV80d0RXZyJ9LCJ4bXNfdGNkdCI6MTU1NTQwNjQyN30.aiAHUmZPqCeP7PpNR2fc1n-reBxv_SkivvoKGS4HdsUGnedB7db2KWO8Ii81fXh0gCjOM3wVAGT1rTHoLrakLnKqTAdF55AUNtGDKdkzWHHspvD0KxorXIuqSNQ_BoEzZDpDQz3jSL6_YtNqdykIAPizyjfMM1zoGfMXRxjG-89zy7qYbelgnbNaoqz6Zg1jp-I19YfQvWHNIQnXQeNKil5GYdc33wBLouHvgPLgrsBqQDpSwuNeYb76xD9yT4LH4XZuOCDEMQcG1Sf1yzzXqGX3fQcIvnY6mfXGK2zNDiIMzxS5Fbo_v3yxcJWuNp2QQ1DURXICupxv7GAnbBj7uQ",
	            "refresh_token": "OAQABAAAAAADCoMpjJXrxTq9VG9te-7FXd3ZasBUoPm1mNtW66w3KLmC11H0mXmZsALVA73qqcfAN5yd34dXJHeoeYz7vTVJj2X5MhHn0tL-W2VDzJPoUBlW7fr7vI3MnMlExwfd8VlvWWz5xOpcKTYkIOv6Niyt1V4rAY1t34w3ou9_lPH4GBPqyGRdp60a8CljyfTk9zUcHF0EN0byI8Z59c5Gi9ZC0xdW4miRQFB4DVhXXmPMMo0U6Y0HIRPRKFEk_Hc-9U_e-odM_kFqLXllfVbJiHBZ0Oh4b-vxWjjkN7SQplKQIsmZZg9OCz4HMGdmhYCfdW-iEQo2FfsoLW_K4kWRWEjb757IIPHZxZYQYb6d97-w3BNXMHPdqSisgn4LgiL7qs4QnA4vsxRv3iawe4MRH6ocnyOyy4ipYi9FcVKvcKno975L9i9Z_lJ5DHF0d5HPlFlsJ-N8gzdozGmgBx6cmduVMyJdOAhpXy2PDHLptwk8C7O_1fSzdZDwFeQRYXKWghBYlmkaSlvvaooI3DWttS3yVqUDFSQFkiBQ3Btbp2CUsqmJKmmtQMxf0bMUAhTiVI09ldmhZVxr185Ww5hGzK4DMAgayPNo5D3mgs86Bi91gHZFyKnFn0LjjqagMpSTZ71bBxS-XKXuxhGTAjLB1AfXOs58qPghFzukAwymZK0miHuaWtyc7lh2AUtOIKErJENN6-nvGHZMRurK3j2jFpTTX7LTqnkpYPHY4R65ABjmYKoF9Rm3BlD3hOnu-Z3YrCwt6wCQTXlJ-5RM0p3j9NHBfp30DdfBSVWTrgrTdLolNnIUH26h6C3NVajqneXGUhqAgAA",
	            "expires_on": "2019-05-25T10:26:44.765Z"
	        },
	        "calendarId":"word",
	        'apiToken': "bWluaDoxMTEx",
	        // 'apiToken': "cXVhbmd0YW5lZEBnbWFpbC5jb206ZmFiYmlAMTIz",
	        'userInfo': {
	            'minh': 'minhbkpro@gmail.com'
	        },
	        'garoonUser': {
	            'minh': 'minhbkpro@gmail.com'
	        },
	        'createdTime': "2019-04-15T14:35:50.792Z",
	        'updatedTime': "2019-05-15T14:35:50.792Z"
	    }
	}

	params = Object.assign({},params,options)
	
	// Call DynamoDB to add the item to the table
	documentClient.put(params, function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Success", data);
		}
	});
}

exports.sendMail = async function(mailOptions,handlerError) {
	var transporter = nodemailer.createTransport({
		service:process.env.MAIL_SERVER || 'gmail',
		auth:{
			user:process.env.MAIL_USER || 'tanutc.com@gmail.com',
			pass:process.env.MAIL_PASS || 'quangtan123',
		}
	});
	let params = {
	  from: 'tanutc.com@gmail.com', // sender address
	  to: 'quangtaned@gmail.com', // list of receivers
	  subject: 'Subject of your email', // Subject line
	  html: '<p>Your html here</p>'// plain text body
	};

	params = Object.assign({},params,mailOptions)

	await transporter.sendMail(params, function (err, info) {
	   	if(err) {
	   		if(typeof handlerError === 'function') {
	   			handlerError(null,err)
	   		}
	   	} else {
	   		if(typeof handlerError === 'function') {
	   			handlerError(info,null)
	   		}
	   	}
	});
}

exports.deleteOfficeEvent = async function() {
	
}




















