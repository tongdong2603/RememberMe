const request = require('request-promise');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IjFPUWFMSk0wYjk1RERrejA2cjNjdFJDSmRUUjRWSGJVVzU1LTIxclgxbDgiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZDgzNmU0OC05Y2MyLTQ5NjUtYTg0My1mNWE2NzFjMmJlODYvIiwiaWF0IjoxNTk3ODkxOTYwLCJuYmYiOjE1OTc4OTE5NjAsImV4cCI6MTU5Nzg5NTg2MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyQmdZRWlic3Rua29jbk4yNitkMzhhdEtMSVNXN3ZTL1AyMjc4MVI0bG9oRXRHTjkwTUIiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik9mZmljZSBHYXJvb24gQ2FsZW5kYXIiLCJhcHBpZCI6IjE2NGQzZWVjLTY0YWEtNGYyMS04ZTZlLTViZmMxMGIzOGJkYiIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiZG9uZyIsImdpdmVuX25hbWUiOiJ0b25nIiwiaXBhZGRyIjoiMTgzLjkxLjQuMzEiLCJuYW1lIjoidG9uZyBkb25nIiwib2lkIjoiN2I3ZjJlMWItZTExYS00MDI5LTliY2MtOGYxMWUyNjI0ODQ3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAwRDFERUVFQzkiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiVFE3S0hYMnYwS1J0c0dHZDFmYWZiZnN0VWY5SXBRam5qcTBHTWx0M3Q1OCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6IjZkODM2ZTQ4LTljYzItNDk2NS1hODQzLWY1YTY3MWMyYmU4NiIsInVuaXF1ZV9uYW1lIjoidGRvbmdAZmFiYmlnYXJvb24zMDAub25taWNyb3NvZnQuY29tIiwidXBuIjoidGRvbmdAZmFiYmlnYXJvb24zMDAub25taWNyb3NvZnQuY29tIiwidXRpIjoiN2oxcWdYbWgtVXljbTJlOFpyaTBBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiZjAyM2ZkODEtYTYzNy00YjU2LTk1ZmQtNzkxYWMwMjI2MDMzIiwiZjJlZjk5MmMtM2FmYi00NmI5LWI3Y2YtYTEyNmVlNzRjNDUxIiwiOWI4OTVkOTItMmNkMy00NGM3LTlkMDItYTZhYzJkNWVhNWMzIiwiZmU5MzBiZTctNWU2Mi00N2RiLTkxYWYtOThjM2E0OWEzOGIxIiwiNzI5ODI3ZTMtOWMxNC00OWY3LWJiMWItOTYwOGYxNTZiYmI4IiwiZjI4YTFmNTAtZjZlNy00NTcxLTgxOGItNmExMmYyYWY2YjZjIiwiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiMjkyMzJjZGYtOTMyMy00MmZkLWFkZTItMWQwOTdhZjNlNGRlIiwiNjkwOTEyNDYtMjBlOC00YTU2LWFhNGQtMDY2MDc1YjJhN2E4Il0sInhtc19zdCI6eyJzdWIiOiJpV19QQ1pLaEdFcXpUaDlydjdZdXV5RnIxdG1IQjY3UEYwN3BKUG5jUXVNIn0sInhtc190Y2R0IjoxNTk0NzE2NDQ3fQ.XJKVDbwNRWQlr3E94JfCy52kS5yuI0yNaIspBsVbzYAslGPyZ2oBc0eWkwOItxaDlC-ZGNsexf8wqkiIr_saxk_dmqwco_ofnWA8fBCkYxyX0nr53ztU5toD7YoY2aZ782UzIrD6RiafPaqScg1WJb7jmg66xsjPnsV1jxn8FGspxYnxZ7pmfl2J7SJlmo3wnuD9Qpn0-nsQV8F5keGIwiHNbentAcvj5PPVhSCbxc2xEIUwPjPvpU7jJJS2-xEIXiVbC5vI_SxTjHqJrnsnLhy5yO_Q6PEqnAm-dhCORB3nHP6kx-O0hovV46R9Nip-NRYJ6NTt7mhKX2pX7uLr9Q'
const _ = require('lodash');
const axios = require('axios');
const titleEvent = 'Create in Garoon';
const getEvents = (nextLink) => {
    let uri = 'https://graph.microsoft.com/v1.0/me/events?$top=1000&$';
    if (nextLink) {
        uri = nextLink;
    }
    return request.get({
        headers: {
            Authorization: `Bearer ${token}`
        },
        uri,
        json: true
    }).then(body => {
        if (body['@odata.nextLink']) {
            return getEvents(body['@odata.nextLink']).then(events => [...events, ...body.value]);
        }
        return body.value
    }).catch(err => {
        console.log('err', err)
    })
}

const officeEventsFunc = getEvents();

Promise.all([officeEventsFunc]).then(results => {
    let officeEvents = results[0];
    console.log('officeEvents : ', officeEvents.length);
    let eventEddited = officeEvents.filter(el => el.subject.includes(titleEvent));
    for (let i = 0, len = eventEddited.length/2; i < len; i++) {
        setTimeout( () => updateEvent(eventEddited[i]), i * 300)
    }
});

const updateEvent = (event) => {
        let uri = `https://graph.microsoft.com/v1.0/me/events/${event.id}`;

        let  eventEdit = _.pick(event, ['categories', 'bodyPreview', 'subject', 'sensitivity', 'type', 'recurrence', 'start', 'end', 'start', 'location', 'locations', 'attendees'])
        let data = {
            ...eventEdit,
            subject: eventEdit.subject + ' Edit in office'
        };
        return axios.patch(uri, data, {
            headers:  {'Authorization': `Bearer ${token}`}
        })
            .then(res => console.log('complete'))
            .catch(err => console.log(err));
};
