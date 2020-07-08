const moment = require('moment')
exports.home = async function(req, res) {

	let parms = { title: 'Home', active: { home: true },layout:false };
  	console.log("xxxx")
  	console.log("222")
  	res.render('test', parms);
}


async function getEvent(id) {
	let client = new garoon('schedule/events/'+id);
	try {
		let result = await client.get();
		console.log(result);
	} catch(e) {
		console.log(e);
	}
}

async function listEvents() {
	let client = new garoon('schedule/events');
	let start = moment().toISOString();
  // Set end of the calendar view to 7 days from start
  let end = moment().add(7, 'days').toISOString();
	try {
		let result = await client.get({
        limit:100,
        offset:0,
        // fields:'*',
        orderBy:'updatedAt desc',
        rangeStart:start,
        rangeEnd:end,
        // target:100,
        // targetType:100,
        keyword:'Subject', // Subject,Company,information,Notes,Comments
        // excludeFromSearch:'Subject',
      });
		console.log(result);
	} catch(e) {
		console.log(e);
	}
}

async function addEvent() {
	let client = new garoon('schedule/events');
	try {
		let result = await client.post({
    	"eventType": "REGULAR", // ALL_DAY, REGULAR
		  // "eventMenu": "conference",
		  "subject": "Update event 7 ",
		  "notes": "Toi test",
		  "visibilityType": "PUBLIC",
		  "useAttendanceCheck": true,
		  // "companyInfo": {
		  //   "address": "2-7-1, Nihombashi, Chuo-ku, Tokyo",
		  //   "name": "Cybozu, Inc.",
		  //   "phone": "03-4306-xxxx",
		  //   "route": "Nihombashi Sta. - Ginza Line - Shibuya Sta.",
		  //   "routeFare": "195",
		  //   "routeTime": "18",
		  //   "zipCode": "103-xxxx"
		  // },
		  // "attachments": [{
		  //   	"name": "test.txt",
		  //   	"contentType": "plain/text",
		  //     "content": "dGVzdA=="
		  // }],
		  "start": {
		    "dateTime": "2019-04-26T07:08:32Z",
		    "timeZone": "Asia/Tokyo"
		  },
		  "end": {
		    "dateTime": "2019-04-26T18:08:32Z",
		    "timeZone": "Asia/Tokyo"
		  },
		  // "isAllDay": "false",
		  // "isStartOnly": "false",
		   "attendees": [
		    {
		      "type": "USER",
		      "code": "tannguyen"
		    }
		  ],
		  // "watchers": [
		  //   {
		  //     "type": "USER",
		  //     "code": "c000001"
		  //   }
		  // ],
		  // "facilities": [
		  //   {
		  //     "code": "A01"
		  //   }
		  // ],
		  // "facilityUsingPurpose": "Because of the explanation of a new plan.",
		  // "additionalItems": {
		  //   "item": {
		  //     "value": "string"
		  //   }
		  // }
    });
		console.log(result);
	} catch(e) {
		console.log(e);
	}
}

async function updateEvent(id) {
	let client = new garoon('schedule/events/'+id);
	try {
		let result = await client.request('patch',{
	  	"eventType": "ALL_DAY", // ALL_DAY, REGULAR
		  "eventMenu": "conference",
		  "subject": "Update event 7 ",
		  "notes": "Toi test",
		  "visibilityType": "PUBLIC",
		  "useAttendanceCheck": true,
		  // "companyInfo": {
		  //   "address": "2-7-1, Nihombashi, Chuo-ku, Tokyo",
		  //   "name": "Cybozu, Inc.",
		  //   "phone": "03-4306-xxxx",
		  //   "route": "Nihombashi Sta. - Ginza Line - Shibuya Sta.",
		  //   "routeFare": "195",
		  //   "routeTime": "18",
		  //   "zipCode": "103-xxxx"
		  // },
		  // "attachments": [{
		  //   	"name": "test.txt",
		  //   	"contentType": "plain/text",
		  //     "content": "dGVzdA=="
		  // }],
		  "start": {
		    "dateTime": "2019-04-26T07:08:32Z",
		    "timeZone": "Asia/Tokyo"
		  },
		  "end": {
		    "dateTime": "2019-04-26T18:08:32Z",
		    "timeZone": "Asia/Tokyo"
		  },
		  // "isAllDay": "false",
		  // "isStartOnly": "false",
		  //  "attendees": [
		  //   {
		  //     "type": "USER",
		  //     "code": "c000001"
		  //   }
		  // ],
		  // "watchers": [
		  //   {
		  //     "type": "USER",
		  //     "code": "c000001"
		  //   }
		  // ],
		  "facilities": [
		    {
		      "code": "A01"
		    }
		  ],
		  // "facilityUsingPurpose": "Because of the explanation of a new plan.",
		  // "additionalItems": {
		  //   "item": {
		  //     "value": "string"
		  //   }
		  // }
	  });
	  console.log(result);
	} catch(e) {
		console.log(e);
	}
}

async function deleteEvent(id) {
	try	{
		let client = new garoon('schedule/events/'+id);
		client.request('delete');
		console.log('Delete success')
	} catch(e) {
		console.log(e);
	}
}

async function searchAvailableTimes() {
	try	{
		let client = new garoon('schedule/searchAvailableTimes');
		let result = await client.request('post',{
		  "timeRanges": [
		    {
		      "start": "2019-01-01T09:00:00+09:00",
		      "end": "2019-11-02T09:00:00+09:00"
		    }
		  ],
		  "timeInterval": "60",
		  // "attendees": [
		  //   {
		  //     "id": "1",
		  //     "type": "USER",
		  //     "code": "c000001"
		  //   }
		  // ],
		  "facilities": [
		    {
		      // "id": "A01",
		      "code": "A01"
		    }
		  ],
		  // "facilitySearchCondition": "OR"
		});
		console.log(result.availableTimes)
	} catch(e) {
		console.log(e);
	}
}

async function facilities() {
	let client = new garoon('schedule/facilities');
	try {
		let result = await client.get({
		  "limit":100,
		  "offset":0,
		  // "name":"",
		});
		console.log(result)
	} catch(e) {
		console.log(e)
	}
}

async function facilityGroups() {
	let client = new garoon('schedule/facilityGroups')
	try {
		let result = await client.get({
		  "limit":100,
		  "offset":0,
		});
		console.log(result)
	} catch(e) {
		console.log(e)
	}
}






























    
