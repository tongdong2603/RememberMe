const axios = require('axios');
const moment = require('moment-timezone');
const garoonProfile = [{
    id: "2",
    code: "tong dong",
    token: "1.nELDlqSH1xU49k3c4NCKoLmsgJ2chym3DU2nGGSEajjh1v7k" // Administrator:Novel0421
}]

const event = {
    "start": {
        "dateTime": "2020-09-01T01:00:00+09:00",
        "timeZone": "Asia/Tokyo"
    },
    "end": {
        "dateTime": "2020-09-01T01:30:00+09:00",
        "timeZone": "Asia/Tokyo"
    },
    "attendees": [
        {
            "id": "4",
            "type": "USER",
        }
    ],
    "isAllDay": false,
    "eventType": "REGULAR",
    "subject": "Create in Garoon",
    "visibilityType": "PUBLIC",
    "notes": "",
    "eventMenu": "",
    "companyInfo": {
        "name": "",
        "zipCode": "",
        "address": "",
        "route": "",
        "routeTime": "",
        "routeFare": "",
        "phone": ""
    }
}

for (let i = 0; i < 20; i++) {
    setTimeout(() => {
        axios({
            method: "post",
            url: 'https://test-dev-13.cybozu.com/g/api/v1/schedule/events',
            headers: {
                'Authorization': `Bearer ${garoonProfile[0].token}`,
                "Content-Type": "application/json"
            },
            data: {
                ...event,
                start: {
                    dateTime: moment(event.start.dateTime).add(1*i, "day").tz("Asia/Tokyo").format(),
                    "timeZone": "Asia/Tokyo"
                },
                end: {
                    dateTime: moment(event.end.dateTime).add(1*i, "day").tz("Asia/Tokyo").format(),
                    "timeZone": "Asia/Tokyo"
                },
                subject: event.subject + ' ' + i
            }
        })
          .then(function (response) {
              // handle success
              console.log(i);
          })
        .catch(err => {
            console.log('err : ', err);
        })
    }, 100*i)
}
const a = {
    "categories": [],
    "originalStartTimeZone": "UTC",
    "originalEndTimeZone": "UTC",
    "iCalUId": "040000008200E00074C5B7101A82E008000000009831C7275175D601000000000000000010000000248D32F8DBBC8143B4FC8A554DAE6101",
    "reminderMinutesBeforeStart": 15,
    "isReminderOn": true,
    "hasAttachments": false,
    "subject": "Garoonタイトル変更後にスケジュール追加",
    "bodyPreview": "",
    "importance": "normal",
    "sensitivity": "normal",
    "isAllDay": true,
    "isCancelled": false,
    "isOrganizer": true,
    "responseRequested": true,
    "seriesMasterId": null,
    "showAs": "busy",
    "type": "singleInstance",
    "webLink": "https://outlook.office365.com/owa/?itemid=AAMkADYwNzJhOGYzLTBmMTktNGNjNS05ZTJjLTZiNDNlZGJiOTczMgBGAAAAAACQG481ZavnSKj7laNevGYRBwDBaL2yAzEYQZKMfTQl7iP5AAAAAAENAADBaL2yAzEYQZKMfTQl7iP5AABr7%2F%2F4AAA%3D&exvsurl=1&path=/calendar/item",
    "onlineMeetingUrl": null,
    "isOnlineMeeting": false,
    "onlineMeetingProvider": "unknown",
    "allowNewTimeProposals": true,
    "recurrence": null,
    "onlineMeeting": null,
    "responseStatus": {
        "response": "organizer",
        "time": "0001-01-01T00:00:00Z"
    },
    "body": {
        "contentType": "html",
        "content": "<html><head><meta name=\"Generator\" content=\"Microsoft Exchange Server\">\r\n<!-- converted from text -->\r\n<style><!-- .EmailQuote { margin-left: 1pt; padding-left: 4pt; border-left: #800000 2px solid; } --></style></head>\r\n<body>\r\n<font size=\"2\"><span style=\"font-size:11pt;\"><div class=\"PlainText\">&nbsp;</div></span></font>\r\n</body>\r\n</html>\r\n"
    },
    "start": {
        "dateTime": "2020-08-21T00:00:00.0000000",
        "timeZone": "UTC"
    },
    "end": {
        "dateTime": "2020-08-22T00:00:00.0000000",
        "timeZone": "UTC"
    },
    "location": {
        "displayName": "",
        "locationType": "default",
        "uniqueIdType": "unknown",
        "address": {},
        "coordinates": {}
    },
    "locations": [],
    "attendees": []
}
