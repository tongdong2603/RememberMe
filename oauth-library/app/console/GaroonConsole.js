// const microsoft = require('./../../lib/microsoft');
const garoon = require('./../../lib/garoon');
const kintone = require('./../../lib/kintone');
// const db = require('./../../config/database');
const helper = require('./../../config/helper');
// load models
const EventApp = require('./../models/EventAppTbl');
const Office = require('./../models/OfficeTbl');
const Settings = require('./../models/SettingsTbl');
// end load models

const moment = require('moment-timezone').tz.setDefault("Asia/Tokyo");
// const moment = require('moment')
const graph = require('@microsoft/microsoft-graph-client');
// const domain = process.env.GAROON_BASE_URL
const GAROON_BASE_URI = process.env.GAROON_BASE_URI
const KINTONE_BASE_URI = process.env.KINTONE_BASE_URI

exports.console = async function() {
	let listSettings = await Settings.fetchAll()
	if(!!listSettings.Items) {

		// list setting
		listSettings.Items.filter(async function(settings,index) {
			// garoon event
			let garoonEvents = await listGaroonEvents(settings)
			let garoonArrayKey = []
			let garoonArrayData = []
			
			if(!!garoonEvents && Object.keys(garoonEvents).length) {
				let domain = settings.domain
				let serviceld = settings.serviceld
				let userInfo = settings.userInfo
				let garoonUser = settings.garoonUser
				let garoonUserInfo = userInfo;

				let accessToken = await Office.getAccessToken(domain,serviceld)
				let client = graph.Client.init({
								authProvider: (done) => {
									done(null, accessToken);
								}
							});

				garoonEvents.filter(async function(event,i) {
					let obj = {
							garoonEventId:event.id,
							domain:settings.domain,
						}
						garoonArrayKey.push(obj)
						garoonArrayData[event.id] = event
				})

				// kintone record
				let kintoneRecords = []

				// list event need update
				let events = await EventApp.batchGetItem(garoonArrayKey)
				if(!!events.Responses && !!events.Responses.EventApp) {

					events.Responses.EventApp.filter(async function(val,i) {
						let officeEventId = val.officeEventId
						let garoonEventId = val.garoonEventId
						let event = garoonArrayData[val.garoonEventId]
						let params = buildParams(event)
						delete garoonArrayData[val.garoonEventId];
						await Office.updateEvent(client,officeEventId,params, async function(r,e) {
							if (e) {
								OfficeEventSyncHandlerError(e,garoonUser,event)
							} else {
								if(!!r.id) {
									params.garoonEventId = garoonEventId
									params.officeEventId = r.id
									params.creator = garoonUser.name
									UpdateEventApp({
										domain:domain,
										garoonEventId:garoonEventId,
										officeEventId:officeEventId,
										isNeedToSync:false
									})
									pushKintoneEventApp({
										domain:domain,
										apiToken:settings.apiToken,
										record:buildKintoneParams(params),
									})
								}
							}
						})
					})

					// create event
					await garoonArrayData.filter(async function(val,i) {
						let garoonEventId = val.id
						let params = buildParams(val)
						Office.createEvent(client,params,async function(r,e) {
							if (e) {
								OfficeEventSyncHandlerError(e,garoonUser,val)
							} else {
								// console.log(r)
								if(!!r.id) {
									params.garoonEventId = garoonEventId
									params.officeEventId = r.id
									params.creator = garoonUser.name
									
									CreateEventApp({
										domain:domain,
										garoonEventId:garoonEventId,
										officeEventId:r.id,
										isNeedToSync:false
									})
									
									pushKintoneEventApp({
										domain:domain,
										apiToken:settings.apiToken,
										record:buildKintoneParams(params),
									})
								}
								
							}
						})
					})

				}
				
			}
		})
	}
	
}

/**
 * get events from garoon.
 *
 * @var Object
 */
async function listGaroonEvents(settings,offset,limit) {
	let now = moment()
  	let start = moment().subtract(1, 'months').toISOString();
  	let end = now;
	let domain = settings.domain+process.env.GAROON_BASE_URI
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
	  	return;
	}
	domain = domain.slice('/',-1)
	domain = domain+'/schedule/events';

  	let client = new garoon(domain,headers);
  
  	limit = typeof limit === 'undefined' ? 1000 : limit
  	offset = typeof offset === 'undefined' ? 0 : offset
  	try {
    	result = await client.get({
	        limit:limit,
	        offset:offset,
	        // fields:'*',
	        orderBy:'updatedAt desc',
	        rangeStart:updatedTime.toISOString(),
	        rangeEnd:now.toISOString(),
	        // target:100,
	        // targetType:100,
	        // keyword:'Subject', // Subject,Company,information,Notes,Comments
	        // excludeFromSearch:'Subject',
      	});
  	} catch(e) {
	    result = e
  	}
  	if(!!result.error) {
  		return GaroonEventSyncHandlerError(settings,result.error)
  	} 
  	return result.events
}

function GaroonEventSyncHandlerError(settings,e) {
	
}

async function OfficeEventSyncHandlerError(e,garoonUserInfo,event) {
	try {
		await helper.sendMail({
			from: process.env.MAIL_USER, // sender address
		  	to: garoonUserInfo.email, // list of receivers
		  	subject: 'Update event to office error!!', // Subject line
		  	html: JSON.stringify(e) // plain text body
		})
	} catch(e) {
		console.log(e)
	}
}

function UpdateEventApp(object) {
	try {
		EventApp.update(object)
	} catch(e) {
		console.log(e)
	}
}

function CreateEventApp(object) {
	try {
		EventApp.create(object)
	} catch(e) {
		console.log(e)
	}
}

/**
 * build office attendees from garoon attendees.
 *
 * @var Object
 */
function buildParams(event) {
  let start  = event.start
  let end  = event.end
  let attendees  = event.attendees
  let creator  = event.creator
  let isAllDay  = event.isAllDay
  if(isAllDay) {
    startDateTime = moment(event.start).format('YYYY-MM-DD')
    endDateTime = moment(event.start).add(1,'days').format('YYYY-MM-DD')
    start = {
    	dateTime: startDateTime,
      	timeZone: 'Asia/Tokyo'
    }
    end = {
    	dateTime: endDateTime,
      	timeZone: 'Asia/Tokyo'
    }
  }
  return {
    "start": start,
    "end": end,
    "attendees":buildAttendees(attendees),
    bodyPreview:event.notes,
    body:{
      contentType: 'text', 
      content: event.notes
    },
    // "organizer": {
    //   "emailAddress": {
    //     "address": creator.code,
    //     "name": creator.name
    //   }
    // },
    subject:event.subject,
    showAs:"unknown",
    sensitivity:event.visibilityType != "private" ? "normal" : "private", // normal, personal, private, confidential
    isAllDay:event.isAllDay,
    "recurrence": null,
    "isReminderOn": true
  }
}

/**
 * build office attendees from garoon attendees.
 *
 * @var Object
 */
function buildAttendees(attendees) {
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

function buildKintoneParams(params) {
	let attendees = params.attendees
	let attendeesStr = ""
	if(Object.keys(attendees).length) {
		attendees.filter(function(val,i) {
			let emailAddress = val.emailAddress
			attendeesStr+=emailAddress.name+","
		})
	}
	attendeesStr = attendeesStr.slice(',',-1)
	return {
            "start_Datetime": {
                "value": params.start.dateTime
            },
            "creator": {
                "value": params.creator
            },
            "notes": {
                "value": params.body.content || ""
            },
            "subject": {
                "value": params.subject
            },
            "attendees": {
                "value": attendeesStr
            },
            "officeEventId": {
                "value": params.officeEventId
            },
            "end_Datetime": {
                "value": params.end.dateTime
            },
            "isNeedToSync": {
                "value": []
            },
            "garoonEventId": {
                "value": params.garoonEventId
            },
            "isAllDay": {
                "value": [
                    params.isAllDay ? "Yes" : "No"
                ]
            }
        }
}

async function pushKintoneEventApp(obj) {
	try {
		let k = new kintone(`${obj.domain}/k/v1/records.json`,{
			accessToken:obj.apiToken
		})
		let s = await k.post({
			app:process.env.KINTONE_APP,
			record:obj.record
		},function(r,err) {
			console.log(r,err)
		})
	} catch(e) {
		console.log(e)
	}
}























