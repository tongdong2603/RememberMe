const axios = require('axios');
const moment = require('moment-timezone');
const garoonProfile = [{
    id: "2",
    code: "tong dong",
    token: "OTF0b25nZG9uZzI2MDNAZ21haWwuY29tOmZhYmJpMTIzCg==" // Administrator:Novel0421
}]

const event = {
    "start": {
        "dateTime": "2019-09-12T01:00:00+09:00",
        "timeZone": "Asia/Tokyo"
    },
    "end": {
        "dateTime": "2019-09-12T01:30:00+09:00",
        "timeZone": "Asia/Tokyo"
    },
    "attendees": [
        {
            "id": "2",
            "type": "USER",
        }
    ],
    "isAllDay": false,
    "eventType": "REGULAR",
    "subject": "gr performance",
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

for (let i = 0; i < 1; i++) {
    setTimeout(() => {
        axios({
            method: "post",
            url: 'https://test-dev-5.cybozu.com/g/api/v1/schedule/events',
            headers: {
                'X-Cybozu-Authorization': `${garoonProfile[0].token}`,
                "Content-Type": "application/json"
            },
            data: {
                ...event,
                start: {
                    dateTime: moment(event.start.dateTime).add(1*i, "hours").tz("Asia/Tokyo").format(),
                    "timeZone": "Asia/Tokyo"
                },
                end: {
                    dateTime: moment(event.end.dateTime).add(1*i, "hours").tz("Asia/Tokyo").format(),
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
