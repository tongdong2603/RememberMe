const AWS = require("aws-sdk");
AWS.config.region = "ap-southeast-1";
const dyno_item_size = require("dyno-item-size")
const { calculateItemSize } = require('dynamodb-item-size');

const db = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

const self = this;

const tableName = "garoon-office-dev-task";
const domain = "https://test-11-dev.cybozu.com";

// const testScanDb = (tableName) => {
//   db.scan({
//     TableName: tableName
//   }, ((error, data) => {
//     if (error) {
//       forceSendSystemMailWithoutDomain({
//         errorType: ERROR_CODE_MESSAGE.SYS_02,
//         error,
//         line: generateCurrentLine(),
//         additionalInfo: { settingTable: SETTING_TABLE }
//       });
//       return;
//     }
//     if (typeof data.Items === 'undefined' || data.Items.length <= 0) {
//       return;
//     }
//     console.log(data.Items)
//   }))
// }
//
// testScanDb(tableName);
// get task

// const getTask = (tableName, domain, ExclusiveStartKey) => {
//   return new Promise((resolve, reject) => {
//     const params = {
//       TableName: tableName,
//       IndexName: "domain-garoonId-index",
//       KeyConditionExpression: "#dm = :dm",
//       ExpressionAttributeNames: {
//         "#dm": "domain"
//       },
//       ExpressionAttributeValues: {
//         ":dm": domain
//       }
//     };
//     if (ExclusiveStartKey) {
//       params.ExclusiveStartKey = ExclusiveStartKey;
//     }
//     db.query(params, (err, data) => {
//       if (err) {
//         reject({ err, additionalInfo: { dynamoQueryParams: params } });
//       } else if (data.LastEvaluatedKey) {
//         self
//           .getTask(tableName, domain, data.LastEvaluatedKey)
//           .then(items => {
//             resolve([...items, ...data.Items]);
//           })
//           .catch(error => {
//             reject({
//               err: error,
//               line: generateCurrentLine(),
//               additionalInfo: { dynamoQueryParams: params }
//             });
//           });
//       } else {
//         resolve(data.Items);
//       }
//     });
//   });
// };
//
// const deleteTask = (tableName, domain, taskId) => {
//   return new Promise((resolve, reject) => {
//     const params = {
//       TableName: tableName,
//       Key: {
//         domain,
//         taskId
//       }
//     };
//
//     db.delete(params, err => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log('complete');
//       }
//     });
//   });
// };
// getTask(tableName, domain)
//   .then(data => {
//     data.forEach(el => {
//       deleteTask(tableName, domain, el.taskId)
//     })
//   })
//   .catch(err => console.log(err));

const dynamoEvent = JSON.stringify({
  "eventId": "8575b53f-f80d-42aa-aec5-d4f88eb7306e",
  "subject": "【定例】シス管会議",
  "domain": "https://arces.cybozu.com"
});

const officeEvent = JSON.stringify({
  "isOnlineMeeting": true,
  "lastModifiedDateTime": "2020-07-22T07:16:01.3353348Z",
  "subject": "【定例】シス管会議【会議室(大)】",
  "importance": "normal",
  "webLink": "https://outlook.office365.com/owa/?itemid=AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA%3D&exvsurl=1&path=/calendar/item",
  "iCalUId": "040000008200E00074C5B7101A82E00800000000E81FE7C7F928D601000000000000000010000000623E236935DDC243A7F9F62EAA6B0F02",
  "createdDateTime": "2020-05-13T07:40:31.9769052Z",
  "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
  "onlineMeetingProvider": "teamsForBusiness",
  "originalEndTimeZone": "Asia/Tokyo",
  "type": "seriesMaster",
  "body": {
    "contentType": "html",
    "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
  },
  "allowNewTimeProposals": true,
  "seriesMasterId": null,
  "subEvents": [
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-08-19T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-08-19T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2EPS0OhAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-08-26T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-08-26T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2ElS_cyAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-09-02T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-09-02T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2E7TIrDAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-09-09T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-09-09T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2FRTS5UAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-09-16T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-09-16T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2FnTdHlAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-09-23T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-09-23T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2F9TnV2AAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-09-30T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-09-30T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2GTTxkHAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-10-07T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-10-07T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2GpT7yYAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-10-14T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-10-14T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2G-UGApAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-10-21T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-10-21T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2HVUQO6AAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-10-28T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-10-28T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2HrUadLAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-11-04T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-11-04T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2IBUkrcAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-11-11T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-11-11T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2IXUu5tAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-11-18T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-11-18T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2ItU5H_AAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-11-25T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-11-25T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2JDVDWPAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-12-02T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-12-02T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2JZVNkgAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-12-09T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-12-09T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2JvVXyxAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-12-16T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-12-16T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2KFViBCAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-12-23T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-12-23T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2KbVsPTAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2020-12-30T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2020-12-30T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2KxV2dkAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-01-06T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-01-06T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2LHWAr1AAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-01-13T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-01-13T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2LdWK6GAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-01-20T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-01-20T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2LzWVIXAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-01-27T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-01-27T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2MJWfWoAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-02-03T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-02-03T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2MfWpk5AAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-02-10T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-02-10T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2M1WzzKAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-02-17T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-02-17T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2NLW_BbAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-02-24T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-02-24T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2NhXIPsAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-03-03T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-03-03T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2N3XSd9AAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-03-10T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-03-10T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2ONXcsOAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-03-17T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-03-17T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2OjXm6fAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-03-24T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-03-24T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2O5XxIwAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    },
    {
      "subject": "【定例】シス管会議【会議室(大)】",
      "attendees": [
        {
          "type": "required",
          "emailAddress": {
            "name": "佐藤 薫",
            "address": "sato.kaoru@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "菅野 奈津子",
            "address": "kanno.natsuko@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        },
        {
          "type": "required",
          "emailAddress": {
            "name": "小野寺 賢俊",
            "address": "onodera.masatoshi@arces.co.jp"
          },
          "status": {
            "response": "none",
            "time": "0001-01-01T00:00:00Z"
          }
        }
      ],
      "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
      "start": {
        "dateTime": "2021-03-31T16:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "bodyPreview": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3",
      "type": "occurrence",
      "body": {
        "contentType": "text",
        "content": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n........................................................................................................................................."
      },
      "seriesMasterId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
      "recurrence": null,
      "isAllDay": false,
      "organizer": {
        "emailAddress": {
          "name": "新貝 博幸",
          "address": "shinkai.hiroyuki@arces.co.jp"
        }
      },
      "end": {
        "dateTime": "2021-03-31T17:00:00.0000000",
        "timeZone": "Asia/Tokyo"
      },
      "location": {
        "coordinates": {},
        "locationType": "default",
        "address": {},
        "uniqueIdType": "unknown"
      },
      "locations": [],
      "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwFRAAgI2PPX7XBAAEYAAAAAAZcST0uHXEu67XjowRHb4gcA1mzAV1ZPfES8rkcYGowUJwAAAAABDQAA1mzAV1ZPfES8rkcYGowUJwAC2ks6ewAAEA==",
      "categories": [
        "会議"
      ],
      "sensitivity": "normal"
    }
  ],
  "reminderMinutesBeforeStart": 15,
  "isAllDay": false,
  "end": {
    "dateTime": "2020-05-20T17:00:00.0000000",
    "timeZone": "Asia/Tokyo"
  },
  "id": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
  "categories": [
    "会議"
  ],
  "responseRequested": true,
  "isCancelled": false,
  "originalStartTimeZone": "Asia/Tokyo",
  "showAs": "busy",
  "attendees": [
    {
      "type": "required",
      "emailAddress": {
        "name": "佐藤 薫",
        "address": "sato.kaoru@arces.co.jp"
      },
      "status": {
        "response": "none",
        "time": "0001-01-01T00:00:00Z"
      }
    },
    {
      "type": "required",
      "emailAddress": {
        "name": "菅野 奈津子",
        "address": "kanno.natsuko@arces.co.jp"
      },
      "status": {
        "response": "none",
        "time": "0001-01-01T00:00:00Z"
      }
    },
    {
      "type": "required",
      "emailAddress": {
        "name": "小野寺 賢俊",
        "address": "onodera.masatoshi@arces.co.jp"
      },
      "status": {
        "response": "none",
        "time": "0001-01-01T00:00:00Z"
      }
    }
  ],
  "@odata.etag": "W/\"1mzAV1ZPfES8rkcYGowUJwADBKa+0A==\"",
  "isReminderOn": true,
  "start": {
    "dateTime": "2020-05-20T16:00:00.0000000",
    "timeZone": "Asia/Tokyo"
  },
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('36e3f697-f28e-4689-9b31-281e06fee474')/calendars('AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAEGAADWbMBXVk98RLyuRxgajBQnAADh5oBKAAA%3D')/events/$entity",
  "responseStatus": {
    "response": "organizer",
    "time": "0001-01-01T00:00:00Z"
  },
  "recurrence": {
    "pattern": {
      "month": 0,
      "dayOfMonth": 0,
      "firstDayOfWeek": "sunday",
      "index": "first",
      "interval": 1,
      "type": "weekly",
      "daysOfWeek": [
        "wednesday"
      ]
    },
    "range": {
      "type": "endDate",
      "endDate": "2021-03-31",
      "startDate": "2020-05-20",
      "numberOfOccurrences": 0
    }
  },
  "changeKey": "1mzAV1ZPfES8rkcYGowUJwADBKa+0A==",
  "isOrganizer": true,
  "onlineMeeting": {
    "joinUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d"
  },
  "organizer": {
    "emailAddress": {
      "name": "新貝 博幸",
      "address": "shinkai.hiroyuki@arces.co.jp"
    }
  },
  "onlineMeetingUrl": null,
  "location": {
    "coordinates": {},
    "locationType": "default",
    "address": {},
    "uniqueIdType": "unknown"
  },
  "locations": [],
  "sensitivity": "normal"
})

const garoonEvent = JSON.stringify({
  "repeatId": "202007290700",
  "creator": {
    "name": "新貝 博幸",
    "id": "4",
    "code": "shinkai.hiroyuki"
  },
  "notes": "システム管理室の定例会議\r\n.........................................................................................................................................\r\nMicrosoft Teams 会議に参加\r\nhttps://teams.microsoft.com/l/meetup-join/19%3ameeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy%40thread.v2/0?context=%7b%22Tid%22%3a%227f3ae48e-5783-4f2e-8c54-51f0044fb635%22%2c%22Oid%22%3a%2236e3f697-f28e-4689-9b31-281e06fee474%22%7d\r\n\r\n最寄りの国の電話番号が必要な場合は、ここで取得します。ダイヤルイン PIN を忘れた場合は、リセットできます。\r\n\r\n Teams の詳細を表示 https://aka.ms/JoinTeamsMeeting 会議のオプション: https://teams.microsoft.com/meetingOptions/?organizerId=36e3f697-f28e-4689-9b31-281e06fee474&tenantId=7f3ae48e-5783-4f2e-8c54-51f0044fb635&threadId=19_meeting_OWYwMzMzOTItYjEwZS00NTk3LWI2MjItMTc5ODA0NmNhNTMy@thread.v2&messageId=0&language=ja-JP\r\n\r\n\r\n      フッター\r\n\r\n.........................................................................................................................................",
  "eventMenu": "会議",
  "attendees": [
    {
      "name": "新貝 博幸",
      "id": "4",
      "code": "shinkai.hiroyuki",
      "type": "USER"
    },
    {
      "name": "佐藤 薫",
      "id": "2",
      "code": "sato.kaoru",
      "type": "USER"
    },
    {
      "name": "菅野 奈津子",
      "id": "14",
      "code": "kanno.natsuko",
      "type": "USER"
    },
    {
      "name": "小野寺 賢俊",
      "id": "40",
      "code": "onodera.masatoshi",
      "type": "USER"
    }
  ],
  "subject": "【定例】シス管会議",
  "companyInfo": {},
  "start": {
    "dateTime": "2020-07-29T16:00:00+09:00",
    "timeZone": "Asia/Tokyo"
  },
  "eventType": "REPEATING",
  "repeatInfo": {
    "period": {
      "start": "2020-05-20",
      "end": "2021-03-31"
    },
    "isAllDay": false,
    "dayOfWeek": "WED",
    "isStartOnly": false,
    "exclusiveDateTimes": [
      {
        "start": "2020-06-03T00:00:00+09:00",
        "end": "2020-06-04T00:00:00+09:00"
      },
      {
        "start": "2020-07-15T00:00:00+09:00",
        "end": "2020-07-16T00:00:00+09:00"
      },
      {
        "start": "2020-07-01T00:00:00+09:00",
        "end": "2020-07-02T00:00:00+09:00"
      },
      {
        "start": "2020-07-08T00:00:00+09:00",
        "end": "2020-07-09T00:00:00+09:00"
      },
      {
        "start": "2020-08-05T00:00:00+09:00",
        "end": "2020-08-06T00:00:00+09:00"
      },
      {
        "start": "2020-07-22T00:00:00+09:00",
        "end": "2020-07-23T00:00:00+09:00"
      }
    ],
    "timeZone": "Asia/Tokyo",
    "time": {
      "start": "16:00",
      "end": "17:00"
    },
    "type": "EVERY_WEEK"
  },
  "isAllDay": false,
  "end": {
    "dateTime": "2020-07-29T17:00:00+09:00",
    "timeZone": "Asia/Tokyo"
  },
  "id": "108709",
  "facilities": [
    {
      "name": "会議室(大)",
      "id": "3",
      "code": "会議室(大)"
    }
  ],
  "visibilityType": "PUBLIC",
  "updatedAt": "2020-07-15T06:17:03Z"
});

const Item = {
  "officeState": 0,
  "subject": "【定例】シス管会議【会議室(大)】",
  "officeEventId": "AAMkAGQ5ZDA3OTYzLWVlMTItNDAwZC1hOWM5LWQ3ZjRjNjZiZjMyNwBGAAAAAAABlxJPS4dcS7rteOjBEdviBwDWbMBXVk98RLyuRxgajBQnAAAAAAENAADWbMBXVk98RLyuRxgajBQnAALaSzp7AAA=",
  "dynamoEvent": dynamoEvent,
  "officeEvent": officeEvent,
  "ttl": 1598242082,
  "actionSide": "Office",
  "taskCreatedAt": "2020-07-24T04:08:02.248Z",
  "actionType": "UPDATE_EXCLUSIVE_OFFICE_EVENT",
  "domain": "https://arces.cybozu.com",
  "garoonEvent": garoonEvent,
  "taskId": "eb369e33-210e-4c22-86a6-a9e7fa87dfaa",
  "garoonId": "4"
}
console.log(calculateItemSize(Item))
const putItem = (tableName, domain, Item) => {
  return new Promise(((resolve, reject) => {
    const params = {
      TableName: tableName,
      Item

    }
    db.put(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('complete')
      }
    });
  }))
};
putItem(tableName,domain, Item);
