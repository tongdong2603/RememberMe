const request = require('request-promise');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IkZmTlFfakh5UUlEMDkyNUJMT2hJcUZzNHItWURUa1JERFdTWWpBaWRFVTQiLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCIsImtpZCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNTY4MTAyMTI3LCJuYmYiOjE1NjgxMDIxMjcsImV4cCI6MTU2ODEwNjAyNywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyRmdZQ2g3NGZudjRBZHh0bytIdGpXc0Q5cXJHTkRrb1h3N1pibElBNmRkTTZPd2FDQUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik9mZmljZSBHYXJvb24gQ2FsZW5kYXIiLCJhcHBpZCI6IjE2NGQzZWVjLTY0YWEtNGYyMS04ZTZlLTViZmMxMGIzOGJkYiIsImFwcGlkYWNyIjoiMSIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMTAzLjg4LjExMy4xNDYiLCJuYW1lIjoiTmd1eWVuIFRpZW4gSHVuZyAyMDE0MjE4MCIsIm9pZCI6IjdjMmIxNzJkLTgwNjMtNDgxYS04N2FlLTQxZDZhYzgwOWNlYyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yNzQ2MjUxMDA3LTEzMjQ1OTUyMDYtNzgxNjU0MzUxLTI3NTg3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMzRkZGQTVERTY3OUEiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZC5TaGFyZWQgQ2FsZW5kYXJzLlJlYWRXcml0ZSBDYWxlbmRhcnMuUmVhZFdyaXRlLlNoYXJlZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IktuUmpldC1CWEt5ekhtWFdMSllkbk9CNzlQVU56N24wM3N4dnFZdkp5b0EiLCJ0aWQiOiIwNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEiLCJ1bmlxdWVfbmFtZSI6Imh1bmcubnQxNDIxODBAc2lzLmh1c3QuZWR1LnZuIiwidXBuIjoiaHVuZy5udDE0MjE4MEBzaXMuaHVzdC5lZHUudm4iLCJ1dGkiOiJEbGdJVFkwd3FrdVhjSnNWVDNFU0FBIiwidmVyIjoiMS4wIiwieG1zX3N0Ijp7InN1YiI6IklGdmJ4X3R2Y2NoMUJOUy0yTGE1eVYyVGRXS0RwZXo5Y0dSS2YwWkRkWjAifSwieG1zX3RjZHQiOjE1MDI4NzExNDJ9.Zkx5tsn03RIyz0bc38nlac4wYrIqVZV9bTpiUVqiazU3AZl4OLfoLOvOEAc9VS1dS0xUcUs_pJ1QDgnC49g6TaT8yut9W3mEFEPDcZnxwwNXSjqdzwqj1GahxUqQgblmil0YnKjK4U_9lOYmumegGchGyoB370W9-b4Qwxq0Bc6EMJUrVf4BLD7eypIlwAMzl_r9oU5Mp1Fr-oIrUsn6kWEySkunn7JlEinf8cJSRJ3MZRsYOjEvHiCshP_hqjFL0Z03lmiH9AbcGQk4DYLKM4t47QaDtdeLxrbq_no0c_2sRbKMP5ENFe_6Cnhxkvr-x6ZbPFpxaQWx1y2PG9G1oA'

const getEvents = (nextLink) => {
    let uri = 'https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id'
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
    officeEvents = results[0];
    console.log('officeEvents : ', officeEvents.length)
})