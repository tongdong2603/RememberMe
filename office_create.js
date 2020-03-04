const axios = require('axios');
const moment = require('moment-timezone');
const officeToken = 'EwB4A8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAVHBUh+gYnNfmKbUGZ4O3Ayq2d6ejqHoDL9KGduEYLreF1vDJEqteGlrlrpsJ/F+B/LsYvBxdxKBRP3mAIDFtB3hjZ2h6Pdm9mBxbWhlpS1VLuWCsBlOglBsTzx89rsPAHkxJgke4T0orawXzBWVjQ6dKSc3mJCvzrulgifaX4SeFvBviIHaCIiOHMXblKh2cK7zGTzSAiavMgyX6RQIN67nHgCQEVPVYaKwmFZTzL8xLWVl3EDQzGkDoEXlANoRODBWIU6B8FQw/FucALQlPqjdnU0Oh5Vg1W5zPDN+uVWqKvDQYZPPpiBS52Ta0AJ40OC5c0OxYbPnbWJ05O0t8AgDZgAACGZZhAKVt3jdSAKdI8L30MSZoIXv3c+U7mJZwzGEXaNTcTDzg48Qt/dmXSgSQ9caAuJRVxJEtTQxHoCzfFfjfT7nx1JxVBNnLj2sPskoiv0HzWjIWeqN0JTo0aw7z7tFwebX5i5AzBKP7G98CnXIiNtuAtoOkiXgIfhehpAQn1SCdbm0ZzfnSfuMDzdoxXB59rCUhRxNsSesgDGtKzI9thXpNugzX+lSTQ9uuBiIQs3tkXJLt3gXAI7aR5H3LnD9FZy6PbxxBr8XGmjoppL6lNPlAsqTk69fc3p74xy+erizmqTiiuHvjSaEexblArgqS5JadyyfY/fyTb+Dem5aHDzPxFmw3WxlNmw6NVeBgou0uNVeG/XmxpQeeerOS/O2slMsAerWgry2+FlPAF332jAvvdu5HYbVQBkE8TaoUbUo+mxR7omQpAU+J3VxVGt5gQamR+HP2GzPzMWA86LkXYcvmcajJp+TlhbjHSphcAX8Om09qfQ864Gi+ZeSBdN8qfQ+2o5dNOh0nHYLp39zNcah1n0YbLQGK4hAqx4R3p8K5+L61WY7WLlcy/AXjSMmOViMDn8+tfU1hoVpQCIhDCLzoddKsyQURxJELTWMAyi09vSJkTXafpEXWmxVrNtrA+zPhsV5FwT2GVE5g8Vgx+TT0NTV4EUzirMbq4r4yK+FjTnubOe0eN9h480ZH6WPwv5/SfKK/PpK7mV081Wxv6EYZkLU5Ckl4agHU6rc46ndQNm4uxeRaNhSeJzMu8Yi65nTh7/M2b2bxu+TzFj/PbJu0H8C'
const event = {
    "categories": [],
    "subject": "office performance",
    "bodyPreview": "",
    "sensitivity": "normal",
    "type": "singleInstance",
    "recurrence": null,
    "start": {
        "dateTime": "2019-09-17T01:30:00",
        "timeZone": "Asia/Tokyo"
    },
    "end": {
        "dateTime": "2019-09-17T02:00:00",
        "timeZone": "Asia/Tokyo"
    },
    "location": {
        "displayName": "",
        "locationType": "default",
        "uniqueIdType": "unknown",
        "address": {},
        "coordinates": {}
    },
    "locations": [],    
}

for (let i = 0; i < 1000; i++) {
    setTimeout(() => {
        axios({
            method: "post",
            url: 'https://graph.microsoft.com/v1.0/me/events',
            headers: {
                'Authorization': `Bearer ${officeToken}`,
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
        .catch(err => {
            console.log('err : ', err);
        })
    }, 200*i)
}