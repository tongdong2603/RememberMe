const axios = require('axios');
const moment = require('moment-timezone');
const officeToken = 'EwCAA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAako6vEDZ4AGDLsf+qwJ2A/R3lRVgNaJw6CJ1fhNNExR1fjRSOITMStkmB4qEwnOpU5Cn27LWwXvjhQ0XM0Jbjta/40T1LT+dV7HnhpYCkMMKwE6MU0ETVIg1WcTYlgZ7jfabGNI0MJ/Uhgypntp0Q22wRp7t2P4pqDs6qkjm6u9p/8vN1vWW8UuXW6pEbVWCSKUsXdfX+El+1KG+AZnncCv5JDnFdJSwjkmVNMgfCvS0yEuKz0S/njOTYwJYoWfYwO2oQ2YSVHTJUGUAghaNVtizwQ5S8B8ixRRMubkh/hpkUWRNzy61wfH/vOMvC9wZkX8nKLBG/HGCEk2n8zqtJEDZgAACMaqNloiOS66UALRrVp3TqkmAsRkFs+T8zBE1Vbdi3KBiVJMeDXXdiYvMbQVSB7my5R1mR/OfJMwQs2i6g+Vef9iegoHCM7YZusQIdae887DzJL73+dI1BXYIpPbSPGrhSyzpEIozQ6TfDFeKLJ0UQZxO4rDLqPUnLEw8sn/xEqr7erdFnEHEZn+CJPGhxmmr2K7pIz46rR9i/GqZTzloUYADk9cMo3cbmNQn2AdEonNnmta3AaZlco+y9zjKbko1e91ZvGWohP0+miXhCZu8uvjxgHtz5FNrcCOnZgoX3IrC0qSHbxTb+H3z+vizYY4DIYkUBE+GuiAVdCv5GWHbq7qhpGM49nhzIIoFxU+I36CPYwzawoUwvqXHntGGb7PpdQ30M8SE7S1uE4ylQ78fVqvGwOIu/0M0srwmrXg8UMckAlGCHYreNkI67RrJF+GLSTtPgBL25ceZUQnOmBq2IKwshXajsmjbyrA2qIAatsB0NiIte9kK0zfpcGf+OsofK8uu2NTn+H4NlQh0FSgg8pSenQPfBQV9t9YJoww7O1KBKeP5nkN5ZCzZGX9w7mBB6AWagDj6eZDuHUp+i7XNE20jfS83dfscM1dsE+6pQ5EobtoD6CGyTxSHRtTryMXaIPCZ5aB3prbkvpOr/2Z/EoJP26+z0pacR0A3WvUKCFJVuMlagm1bKJkZxvIEkbnaf1sNJ0St1jN8FgTcvd6bnHlSboKZkdEgfOQ8jxjrO/249xSlO7VVA9CmE7wFqtZEJT/LIKjKx4EvTsx8Ax/JZh6j5l+AUfuIal6jAI='
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
        .then(function (response) {
            // handle success
            console.log(i);
        })
        .catch(err => {
            console.log('err : ', err);
        })
    }, 200*i)
}
