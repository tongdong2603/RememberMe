const AWS = require('aws-sdk');
AWS.config.accessKeyId = "root";
AWS.config.secretAccessKey = "root";
AWS.config.region = "us-west-2";
AWS.config.endpoint = "http://localhost:8000";
AWS.config.apiVersions = {
  //dynamodb: '2011-12-05',
  //ec2: '2013-02-01',
  dynamodb: 'latest'
}
const docClient = new AWS.DynamoDB.DocumentClient();
const nodemailer = require('nodemailer');
const request  = require('request')
const moment = require('moment-timezone').tz.setDefault("Asia/Tokyo");
const querystring = require('querystring')
const graph = require('@microsoft/microsoft-graph-client');
const simpleOauth2 = require('simple-oauth2')
const GAROON_BASE_URI = "/g/api/v1/"
const OFFICE_CLIENT_ID = "beb0efd8-4809-415c-8de1-6c45330aec34"
const OFFICE_CLIENT_SECRET = "welkPB9775$(*zbvVGEYB4]"
const SETTING_TABLE = "go-stg-setting"
const EVENTAPP_TABLE = "go-stg-event-app" 
exports.index = async function(req, res) {
	try	{
		let t = await getAllOfficeEvent()
	} catch(e) {
		console.log(e)
	}
    let listSettings = docClient.scan({
	  	'TableName' : SETTING_TABLE 
  	}, function(err, data) {
	    if (err) {
	      console.log(err)
	    } else {
	    	if(typeof data.Items !== 'undefined' && Object.keys(data.Items).length > 0) {
	    		data.Items.filter(function(settings,index) {
		    		loopSettings(settings)
		    	})
	    	}
	    }
  	});
	res.send('test');	
}

function loopSettings(settings,offset,limit) {
	let now = moment()
  	let start = moment().subtract(1, 'months').toISOString();
  	let end = now;
	let domain = settings.domain+GAROON_BASE_URI
	let runTime = !!settings.runTime && Object.keys(settings.runTime).length ? parseInt(settings.runTime)*60000 : 30000 
	let updatedTime = !!settings.updatedTime && Object.keys(settings.updatedTime).length ? moment(settings.updatedTime) : moment().subtract(1, 'months')
	let userInfo = settings.userInfo
	let apiToken = settings.apiToken // garoon token
	let result = {};
	let headers = {
  		'X-Cybozu-Authorization':apiToken,
  		'Authorization':'Basic '+apiToken,
  	}
	// return
	if(now.diff(updatedTime) < runTime) {
		console.log(`${domain} already exists update record`)
	  	return;
	}
	domain = domain.slice('/',-1)
	domain = domain+'/schedule/events';
  	limit = typeof limit === 'undefined' ? 1000 : limit
  	offset = typeof offset === 'undefined' ? 0 : offset
  	let params = {
        limit:limit,
        offset:offset,
        orderBy:'updatedAt desc',
        // rangeStart:updatedTime.toISOString(),
        // rangeEnd:now.toISOString(),
  	}
  	let query = querystring.stringify(params)
  
  	request.get({
        headers: headers,
        uri: `${domain}?${query}`,
    }, function(error, response, body){
    	if(response.hasOwnProperty("statusCode") && typeof response.statusCode !=='undefined' && response.statusCode == 200) {
    		let result = JSON.parse(body)
    		if(typeof result.events !=='undefined' && Object.keys(result.events).length >0) {
    			garoonDataGenerate(result.events,settings)
    		}
    	}
    });
	
}

function garoonDataGenerate(data,settings) {
	let garoonArrayKey = []
	let garoonArrayData = []
	let domain = settings.domain
	let serviceld = settings.serviceld
	let userInfo = settings.userInfo
	let garoonUser = settings.garoonUser
	let garoonUserInfo = userInfo;
	data.filter(async function(ev,i) {
		let obj = {
				garoonEventId:ev.id,
				domain:settings.domain,
			}
		garoonArrayKey.push(obj)
		garoonArrayData[ev.id] = ev
	})
	let accessToken = generateOfficeAccessToken(domain,serviceld)
	let client = graph.Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		}
	});

	eventAppData(garoonArrayKey).then(res => {
		
		if(!!res.Responses && !!res.Responses[EVENTAPP_TABLE]) {
			let events = res.Responses[EVENTAPP_TABLE]
			events.filter(function(val,i) {
				let officeEventId = val.officeEventId
				let garoonEventId = val.garoonEventId
				let event = garoonArrayData[val.garoonEventId]
				let params = buildOfficeParams(event)
				delete garoonArrayData[val.garoonEventId];
				updateOfficeEvent(client,officeEventId,params).catch(eU => {
					console.log("Error update event to office :"+JSON.stringify(eU))
				})
			})
		} // endif

		// console.log(garoonArrayData)
		// create event
		garoonArrayData.filter(function(val,i) {
			let garoonEventId = val.id
			let params = buildOfficeParams(val)
			createOfficeEvent(client,params).then(res => {
				if(!!res.id) {
					try {
						let obj = {
							TableName:EVENTAPP_TABLE,
							Item:{
								start_Datetime:val.start.dateTime,
								isAllDay:val.isAllDay ? "true" : "false",
								creator:val.creator.name,
								// notes:val.notes,
								subject:val.subject,
								attendees:buildEventAppAttendees(val.attendees),
								domain:domain,
								officeEventId:res.id,
								end_Datetime:val.end.dateTime,
								isNeedToSync:"false",
								garoonEventId:garoonEventId,
							}
						}
						if(val.notes !== '') {
							obj.notes = val.notes
						}
					  	docClient.put(obj, function(err, data) {
					    	if(typeof callback === 'function') {
						   		if(err) {
						   			// throw(err)
						   		}
						   	}
					  	});
						
						putEventAppKintone(settings,obj).catch(eK => {
							console.log("Error put event to KINTONE :"+JSON.stringify(eK))
						})
					} catch(e) {
						console.log("Error create EventApp"+JSON.stringify(e))
					}
				}
				
			}).catch(eT => {
				console.log("Error create office event :",JSON.stringify(eT))
			})
			
		})
	});
	// console.log(garoonArrayKey)
	// console.log(events)
}


function generateOfficeAccessToken(domain,serviceld) {
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
			    id: OFFICE_CLIENT_ID,
			    secret: OFFICE_CLIENT_SECRET,
			  }, 
			  auth: {
			    tokenHost: 'https://login.microsoftonline.com',
			    authorizePath: 'common/oauth2/v2.0/authorize',
			    tokenPath: 'common/oauth2/v2.0/token'
			  }
			};
			const oauth2 = simpleOauth2.create(credentials);
			return officeRefreshToken(credentials,refresh_token).then(newToken => {
				let _access_token = newToken.token.access_token
	  			let _expiresIn = newToken.token.expires_in
	  			let _expires_on = moment(newToken.token.expires_at).valueOf()
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
				  	TableName: SETTING_TABLE, 
				  	UpdateExpression: "SET #S = :s"
			 	};
			 	try	{
					docClient.update(params, function(err, data) {
						// console.log(err,data)
					})	
				} catch(e) {
					log(e)
				}
				return (access_token) 
			})
			
  			
		}
	
}

function officeRefreshToken(credentials,refresh_token) {
	return new Promise((resolve,reject) => {
		try {
			const oauth2 = simpleOauth2.create(credentials);
			const newToken = oauth2.accessToken.create({refresh_token: refresh_token}).refresh();
			resolve(newToken)
		} catch(e) {
			reject(e)
		}
	})
}

function eventAppData(array) {
	return new Promise((resolve,reject) => {
		var params = {
	    	"RequestItems" : {}
		};

		params.RequestItems[EVENTAPP_TABLE] = {
			"Keys" : array
		}
		docClient.batchGet(params, function(err, data) {
	      	if (err) {
	      		reject(err)
	      	} else {
	        	resolve(data)
	      	}
    	});
	})
}

function buildOfficeParams(event) {
  let start  = event.start
  let end  = event.end
  let attendees  = event.attendees
  let creator  = event.creator
  let isAllDay  = event.isAllDay
  
  if(isAllDay) {
    let startDateTime = moment(start.dateTime)
    let endDateTime = moment(start.dateTime)
    startDateTime = moment(startDateTime).format('YYYY-MM-DDTHH:mm:ss')
    endDateTime = moment(endDateTime).add(1,"days").format('YYYY-MM-DDTHH:mm:ss')
    start = {
    	dateTime: startDateTime,
      	timeZone: 'Asia/Tokyo'
    }
    end = {
    	dateTime: endDateTime,
      	timeZone: 'Asia/Tokyo'
    }
  } else {
  	start = event.start
  	end  = event.end
  }
  // return
  return {
    "start": start,
    "end": end,
    "attendees":buildOfficeAttendees(attendees),
    bodyPreview:event.notes,
    body:{
      contentType: 'text', 
      content: event.notes
    },
    subject:event.subject,
    showAs:"unknown",
    sensitivity:event.visibilityType != "private" ? "normal" : "private", // normal, personal, private, confidential
    isAllDay:event.isAllDay,
    "recurrence": null,
    "isReminderOn": true,
    "createdDateTime":event.createdAt,
    "lastModifiedDateTime":event.updatedAt,
  }
}

function buildOfficeAttendees(attendees) {
  let attendeesArr = []
  attendees.filter(function(att,index) {
    let attObj = {
        "status": {
          "response": "None",
          "time": moment().toISOString()
        },
        "type": "optional",
        "emailAddress": {
          "address": att.code,
          "name": att.name
        }
      } 
    attendeesArr.push(attObj)
  })
  return attendeesArr;
}

function buildEventAppAttendees(attendees) {
	let str = "";
	attendees.filter(function(att,index) {
		str +=`${att.name},`
  	})
  	return str
}

function updateOfficeEvent(client,officeEventId,params) {
	return new Promise((resolve,reject) => {
		try {
			let result = client.api(`/me/events/${officeEventId}`)
	  			.header("content-type", "application/json")
	  			.patch(params);
  			resolve(result)
		} catch(e) {
			reject(e)
			log("office update event error: "+ JSON.stringify(e))
		}
	})
}

function createOfficeEvent(client,params) {
	return new Promise((resolve,reject) => {
		try {
		    let result = client
			  .api(`/me/events`)
			  .header("content-type", "application/json")
			  .post(params);
		  	resolve(result)
		} catch(e) {
			reject(e)
		}
	})
}

function putEventAppKintone(settings,params) {
	return new Promise((resolve,reject) => {
		let apiToken = settings.apiToken // garoon token
		let headers = {
	  		"X-Cybozu-Authorization":apiToken,
	  		"Authorization":"Basic "+apiToken,
	  		"Content-Type":"application/json"
	  	}
		let item = params.Item
	  	let obj = {
	  		"app":KINTONE_APP_ID,
	  		"record":{
	  			"start_Datetime": {
	                "value": item.start_Datetime
	            },
	            "creator": {
	                "value": item.creator
	            },
	            "notes": {
	                "value": item.notes || ""
	            },
	            "subject": {
	                "value": item.subject
	            },
	            "attendees": {
	                "value": item.attendees
	            },
	            "officeEventId": {
	                "value": item.officeEventId
	            },
	            "end_Datetime": {
	                "value": item.end_Datetime
	            },
	            "isNeedToSync": {
	                "value": []
	            },
	            "garoonEventId": {
	                "value": item.garoonEventId
	            },
	            "isAllDay": {
	                "value": [
	                    item.isAllDay
	                ]
	            }
	  		}
	  	}
	  	
	  	request.post({
	        headers: headers,
	        uri: `${settings.domain}/k/v1/record.json`,
	        body:JSON.stringify(obj)
	    }, function(error, response, body){
	    	if(error) {
	    		console.log("Error 500 insert data to KINTONE "+JSON.stringify(error) + JSON.stringify(response))
	    	}
	    	if(response.hasOwnProperty("statusCode") && typeof response.statusCode !== 'undefined' && response.statusCode !== 200) {
	    		console.log("Error insert data to KINTONE "+JSON.stringify(response))
	    	}
	    });
	})
}


function log(params) {
	console.log(JSON.stringify(params))
}

async function getAllOfficeEvent() {
	let client = graph.Client.init({
		authProvider: (done) => {
			done(null, "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYalBCMk1YNmRoWUNlYVNtb2w2eFpkM3BMVjNFb2NmNVhTZWJGVGQtX0lzU3NTSzdlX1BXUGszSmFjbTFSeU9hTy1pcDJXcE1xVDJVYzA0TGdlV0IwNFNBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIiwia2lkIjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzMyYmY2YzYtNjFjMC00NjdkLWIwOGMtMmY3MTQyZjA0ZGRiLyIsImlhdCI6MTU1ODM0MzE3OCwibmJmIjoxNTU4MzQzMTc4LCJleHAiOjE1NTgzNDcwNzgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBU1FBMi84TEFBQUFmRWRkUDVJYmlUV2Z4ZGV3QjVrYnNxYTQ4V3RTcW5Vc240bW8rdnJnazBnPSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoid2ViaG9vayIsImFwcGlkIjoiZDA0NjY2ODEtNDQyOC00YWM1LWE1NTItMzBmYjMyY2NiNjY5IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJMZSIsImlwYWRkciI6IjEwMy44OC4xMTMuMTQ2IiwibmFtZSI6IkxlIEh1eW5oIiwib2lkIjoiZjU4NzJhM2UtNDYxMy00MGE0LTlmODktZWNlOTI1MzBjYWE4IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAwNDQ4QTNGNjEiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZCBDYWxlbmRhcnMuUmVhZC5TaGFyZWQgQ2FsZW5kYXJzLlJlYWRXcml0ZSBDYWxlbmRhcnMuUmVhZFdyaXRlLlNoYXJlZCBVc2VyLlJlYWQiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJaYXRIeWFxTHBORU42eG80a1pSaWJ6Y1BvSnEzc2lrMHd6NlhzR2dkX0xBIiwidGlkIjoiMzMyYmY2YzYtNjFjMC00NjdkLWIwOGMtMmY3MTQyZjA0ZGRiIiwidW5pcXVlX25hbWUiOiJodXluaEBmYWJiaWVyLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6Imh1eW5oQGZhYmJpZXIub25taWNyb3NvZnQuY29tIiwidXRpIjoiT1dlOU80UFdZMDJUYklzQWJDbk9BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIl0sInhtc190Y2R0IjoxNTU1NDA2NDI3fQ.jP65SRmdxjujBgJ_GLv0IcitGQm6AZyXv6-VALpNP_2PP3oSflJZ2BnywqnmgGokb0CVMK8X_RUdyKVwWxY7kbIhtw4llbpjZoeE_mQt4GQJn_D03Fn8GvldFQsgc2HGel5RSQbtPHkzLHrP7tED3dIJH9-2Eil-FacksX6GNl-zmhC103YZYm_wTSEkJXkxhkGWkCuC69A4XiZ1VbIisKmX4GmYNcxfEdV7_8RjIZeMzLYDcg6mNtyJsBGEKdtUf-twC2faYIwaP9dgcvS5J8IfL0mcYTh648xDbgCbpglYwBcWSsUNVpUXFswSZwNZ0q-RY2vrdQTxqC7Hi2YHVg");
		}
	});
	try	{
		let es = await client.api(`/me/events`)
	  			.header("content-type", "application/json")
	  			.get();
		es.value.filter(async function(val,i) {
			await deleteAllOfficeEvent(val)
		})
	} catch(ee) {
		log(ee)
	}
} 

async function deleteAllOfficeEvent(val) {
	try	{
		await client.api(`/me/events/${val.id}`)
  			.header("content-type", "application/json")
  			.delete();
	} catch(ee) {
		log(ee)	
	}
}




















