const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlF1aldSTnpDRklFOHBVdER0b1dFMkdwTGhfRVRhSVd3WlRaT0wwcU9pdjAiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84ZjVmZDkzMS0wMzQ5LTQ4ZjEtYWEwMS04ZDUyMDY5YWEwMjcvIiwiaWF0IjoxNTkyODkyMDU3LCJuYmYiOjE1OTI4OTIwNTcsImV4cCI6MTU5Mjg5NTk1NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhQQUFBQTBtRkdpWmFXOE14ODN2WjhyTVlZOHhuakFBTFhjQ3BLbitVcGZ0TUZsZ3M9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJPZmZpY2UgR2Fyb29uIENhbGVuZGFyIiwiYXBwaWQiOiIxNjRkM2VlYy02NGFhLTRmMjEtOGU2ZS01YmZjMTBiMzhiZGIiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6InRpZW4iLCJnaXZlbl9uYW1lIjoidGllbnRpZW4xMjMiLCJpcGFkZHIiOiIxMDMuODguMTEzLjE0NiIsIm5hbWUiOiJ0aWVudGllbjEiLCJvaWQiOiIxOWUyYzRlNC0zZDkwLTQ5OTQtOWQ1OC1mMGY4MDdjMjhlZDciLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDBCREEwQjg0QSIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ2FsZW5kYXJzLlJlYWRXcml0ZS5TaGFyZWQgb3BlbmlkIFBsYWNlLlJlYWQuQWxsIHByb2ZpbGUgVXNlci5SZWFkV3JpdGUgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJFRWFVVTQyYnZpQUh0VmtQOElpMkV6RHl4Um96OUZNS0EyQ0lERml0Y3A4IiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiOGY1ZmQ5MzEtMDM0OS00OGYxLWFhMDEtOGQ1MjA2OWFhMDI3IiwidW5pcXVlX25hbWUiOiJ0aWVudGllbjFAZ2Fyb29uMjAxLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6InRpZW50aWVuMUBnYXJvb24yMDEub25taWNyb3NvZnQuY29tIiwidXRpIjoiZ2o2SVZMaEtyVWVCN3FwU2QycUZBUSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJzb21TeXpHWVpXVGNqODl4TW1vS0lqcHkySTdZNm5DSmdkZDEtWHdoSFE4In0sInhtc190Y2R0IjoxNTg3NzExMjg4fQ.d0JC_QCT0HBWXEpGS3ly0cppRkViDJDjS4FZB2cqEYxFlZP-41vzhr3S3ck07fdok5_k8AMV7Ir-ey7tneMK8vC1Tv4Zdr900T2fQhRtTHmON3YiTdD3ffKaBGwHH027Ji2d8cKnuRBTmNU5QeD6iUnHYyZVFsJ3k7UWEYfxLQ0mQslGuOUuO1SCun9BSI8YYPH19j2CFUJ3cQ4oxvHB0ha60iUvPXv61qj-Si3tMBcVJO-E3-zgzJck5XvDTmQYYzZKPN7OwVQ5KNajuN9KKjirgjXZ9-fRWg2XYHay4JkjiKFTR_gE2sfS6ssAJ8hxaPq8OIHg-UUuw7Us_fcl5w';

var isRunning = 1;

// clear();
//
// function clear() {
//   if(isRunning) {
//     setTimeout(clear, 250000);
//   } else {
//     console.log('Done!');
//   }
//
//   axios.get("https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=subject", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }).then(async resp => {
//     if(resp.data.value.length === 0) {
//       console.log('Done!');
//       isRunning = 0;
//       return;
//     }
//     await resp.data.value.forEach((el,i) => {
//       if(el.subject === 'event xóa đi') {
//         setTimeout(function() {
//           axios.delete(`https://graph.microsoft.com/v1.0/me/events/${el.id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }).then(() => {
//             console.log('delete office ne', i);
//           }).catch(err => {
//             console.log('err')
//           })
//         }, 250*i)
//       }
//     })
//   }).catch(err => {
//     console.log(err)
//   })
// }

axios.get('https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(async resp => {
  console.log('resp', resp.data.value.length)
  await resp.data.value.forEach((el,i) => {

      setTimeout(function() {
        axios.delete(`https://graph.microsoft.com/v1.0/me/events/${el.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          console.log('delete office ne', i);
        }).catch(err => {
          console.log('err')
        })
      }, 250*i)

  })
  // res.send('deleted!');
}).catch(err => {
  console.log('err', err)
})
