const request = require("request-promise");
const token = "QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=";

const getEvents = (step) => {
    let uri = `https://xf64e.cybozu.com/g/api/v1/schedule/events?limit=1000&offset=${step*1000}`;
    return request
        .get({
            headers: {
                'X-Cybozu-Authorization': token
            },
            uri,
            json: true
        })
        .then(body => {
            if (body.hasNext) {
                return getEvents(step += 1).then(events => [...events, ...body.events]);
            }
            return body.events;
        })
        .catch(err => {
            console.log('err', err)
        })
}

const garoonEventsFunc = getEvents(0);

Promise.all([garoonEventsFunc]).then(results => {
    garoonEvents = results[0];
    console.log('gr : ', garoonEvents.length)
})