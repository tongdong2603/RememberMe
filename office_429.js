const rp = require('request-promise');

const office_access_token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Inc3RDlZZjRMODdVVDVIWjlyNlNVRzVqRHNUV1dSc2lFaFBOb1FvR1dHVE0iLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCIsImtpZCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNTY2OTgzNzQwLCJuYmYiOjE1NjY5ODM3NDAsImV4cCI6MTU2Njk4NzY0MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhNQUFBQWhDeDdNZkpMWWhMNzlMNUI1Qy9EQ0ptMzBaUDJ2ZDkrMndER29HTEcybjA9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJPZmZpY2UgR2Fyb29uIENhbGVuZGFyIiwiYXBwaWQiOiIxNjRkM2VlYy02NGFhLTRmMjEtOGU2ZS01YmZjMTBiMzhiZGIiLCJhcHBpZGFjciI6IjEiLCJpbl9jb3JwIjoidHJ1ZSIsImlwYWRkciI6IjEwMy44OC4xMTMuMTQ2IiwibmFtZSI6Ik5ndXllbiBUaWVuIEh1bmcgMjAxNDIxODAiLCJvaWQiOiI3YzJiMTcyZC04MDYzLTQ4MWEtODdhZS00MWQ2YWM4MDljZWMiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjc0NjI1MTAwNy0xMzI0NTk1MjA2LTc4MTY1NDM1MS0yNzU4NyIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzM0ZGRkE1REU2NzlBIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWQuU2hhcmVkIENhbGVuZGFycy5SZWFkV3JpdGUgQ2FsZW5kYXJzLlJlYWRXcml0ZS5TaGFyZWQgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkV3JpdGUgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJLblJqZXQtQlhLeXpIbVhXTEpZZG5PQjc5UFVOejduMDNzeHZxWXZKeW9BIiwidGlkIjoiMDZmMWI4OWYtMDdlOC00NjRmLWI0MDgtZWMxYjQ1NzAzZjMxIiwidW5pcXVlX25hbWUiOiJodW5nLm50MTQyMTgwQHNpcy5odXN0LmVkdS52biIsInVwbiI6Imh1bmcubnQxNDIxODBAc2lzLmh1c3QuZWR1LnZuIiwidXRpIjoiT3VTREFvX2M3RTJobUl5Zk9tNTBBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJJRnZieF90dmNjaDFCTlMtMkxhNXlWMlRkV0tEcGV6OWNHUktmMFpEZFowIn0sInhtc190Y2R0IjoxNTAyODcxMTQyfQ.YqL_R_VrkXXteOCgKXrBNdF9WocWAJjkOTEscxIZ7U70tGurAmfb15wutSR6VhYo4vCWxBM_EcPoW2O8q-yGsSGjMRjygrN73zNwAG4LwGbmWJ6WHawER7vhLJbVrx4lTNsAg2Kcy3goVpzqGuE3aiebEPhRWB3Jm5fOtZROn94Km5BZjVceCGPeJ1kRmbvaXJc-WUPmDL7FqSsltrdS-VSPKwlvFr9qK0skQC-kYkDDba84usZlVius5GuKdbu9dJ0Qi6LE8HYEKN2qOMv9uXCf4ApTPZluI260omHLJGRehiQxOEpQxnEua2C7OZlYEjQwJxe0wM1SxbAn825TiQ'

const obj = {
  "categories": [],
  "originalStartTimeZone": "Tokyo Standard Time",
  "originalEndTimeZone": "Tokyo Standard Time",
  "iCalUId": "040000008200E00074C5B7101A82E00800000000C246E470B05CD50100000000000000001000000044B495DB11471F44B9EDC2308DE4F971",
  "reminderMinutesBeforeStart": 15,
  "isReminderOn": true,
  "hasAttachments": false,
  "subject": "test",
  "bodyPreview": "",
  "importance": "normal",
  "sensitivity": "normal",
  "isAllDay": false,
  "isCancelled": false,
  "isOrganizer": true,
  "responseRequested": true,
  "seriesMasterId": null,
  "showAs": "busy",
  "type": "singleInstance",
  "webLink": "https://outlook.office365.com/owa/?itemid=AQMkAGU4M2FkM2E1LTIwMjYtNGE1ZS04NWJlLWY4YjYzZTA4YmZjZABGAAADRd98T5vr0UyLiB%2BeiGTR9AcAwEuUr2SMkkKBtkHSmBVPRwAAAgENAAAAwEuUr2SMkkKBtkHSmBVPRwABfazvkwAAAA%3D%3D&exvsurl=1&path=/calendar/item",
  "onlineMeetingUrl": null,
  "recurrence": null,
  "responseStatus": {
    "response": "organizer",
    "time": "0001-01-01T00:00:00Z"
  },
  "body": {
    "contentType": "html",
    "content": "<html><head><meta name=\"Generator\" content=\"Microsoft Exchange Server\">\r\n<!-- converted from text -->\r\n<style><!-- .EmailQuote { margin-left: 1pt; padding-left: 4pt; border-left: #800000 2px solid; } --></style></head>\r\n<body>\r\n<font size=\"2\"><span style=\"font-size:11pt;\"><div class=\"PlainText\">&nbsp;</div></span></font>\r\n</body>\r\n</html>\r\n"
  },
  "start": {
    "dateTime": "2019-08-27T09:00:00.0000000",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2019-08-27T09:30:00.0000000",
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
  "attendees": [],
  "organizer": {
    "emailAddress": {
      "name": "Nguyen Tien Hung 20142180",
      "address": "hung.nt142180@sis.hust.edu.vn"
    }
  }
}

class ApiErrorException extends Error {
  constructor(err, ...params) {
    super(...params);
    this.statusCode = err.statusCode;
    this.err = err;
    this.message = "Error when call API";
    this.name = "ApiErrorException";
  }
}

for (let i = 0; i < 1000; i++) {
  rp({
    method: "post",
    uri: 'https://graph.microsoft.com/v1.0/me/events',
    headers: {
      Authorization: `Bearer ${office_access_token}`,
      "Content-Type": "application/json"
    },
    body: obj,
    json: true
  }).catch(err => {
    const error = new ApiErrorException(err)
    console.log('err : ', JSON.parse(err.message.split(' - ')[1]).error.code);
    console.log('error : ', error instanceof ApiErrorException, JSON.parse(error.err.message.split(' - ')[1]).error.code === 'ApplicationThrottled');
    console.log('error : ', error instanceof ApiErrorException, error.err.response.body.error.code);
  })
}