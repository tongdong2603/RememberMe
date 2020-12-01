const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlZYd1JuekxNeEs1REZQSkNuQ1ZMemVHYnE4LWdGN1pPOXZFU1ZncDRxMlEiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81YTViNTEzMi02YmQzLTQ1MjItYTc2OC0xNzliMGEwNjFmMzgvIiwiaWF0IjoxNjAzNDE3MTQyLCJuYmYiOjE2MDM0MTcxNDIsImV4cCI6MTYwMzQyMTA0MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyUmdZRmlkR1Bma1pFT0haL2htZFVrelJpY3Z3WjByNTBaTGZqcC96SDdWQ3RaYisxa0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik9mZmljZSBHYXJvb24gQ2FsZW5kYXIiLCJhcHBpZCI6IjE2NGQzZWVjLTY0YWEtNGYyMS04ZTZlLTViZmMxMGIzOGJkYiIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiVG9uZyIsImdpdmVuX25hbWUiOiJEb25nIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTAzLjg4LjExMy4xNDYiLCJuYW1lIjoiRG9uZyBUb25nIiwib2lkIjoiMjVhZWNiOWMtNGU4MC00OWQ1LTg4MTMtM2E2ZjA5YmY3NjNlIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAwRTk3RjZEMjkiLCJyaCI6IjAuQUFBQU1sRmJXdE5ySWtXbmFCZWJDZ1lmT093LVRSYXFaQ0ZQam01Yl9CQ3ppOXR3QUhvLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ2FsZW5kYXJzLlJlYWRXcml0ZS5TaGFyZWQgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkV3JpdGUgZW1haWwiLCJzdWIiOiJTRkd3MllyUjBEUWQwclFXT3ZVelBoNnpXSFM0MVRNMmM1MDViSG5xRk9JIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiNWE1YjUxMzItNmJkMy00NTIyLWE3NjgtMTc5YjBhMDYxZjM4IiwidW5pcXVlX25hbWUiOiJ0ZG9uZ0BnYXJvb252My5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJ0ZG9uZ0BnYXJvb252My5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJpNGVEWVBIQ2IwdXJFakd6OHFlbkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6IjRWNUt4VXNRbDU3UHRTcGZKQWk2VjhGQXBmb0x5Q1JWM210al9ITFJuZWMifSwieG1zX3RjZHQiOjE2MDE1NDc1MzF9.vZi2xqDnHcpR5IKVop_foWJ_hNgq-tqaoqt2kh0PJL8omIyKkC75TML6DsAUo2xQfpBrv78fVxpAbMTMuZ_nBQRhziKCJzj7_U0vR4zrE-42G4Nr2ONIEsqfGBZslBa_dApClUbrGM5PddFTd_4X4OcXWhET-cnFeAao8bxldCsjLEBHW68dVK2cfpDjrchC-jNN6pKqzXmuCJiWgReuXE_LTIJEwTuKdVsubG7Y5hMbXabp3DMMc-oXt5QwQoQ5SIWh6vluUeNHUv2E77HLFGH2ok3uhKgjZgOW04KjK5IwZijajoTwnlaW66DvGHBeh_j6p5hD2PnJ_qlsiHnbjw';

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

axios.get('https://graph.microsoft.com/v1.0/me/events?startDateTime=2020-08-04T09:00:00.0000000&$top=1000&$select=id,subject', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(async resp => {
  console.log('resp', resp.data.value.length);
  await resp.data.value.forEach((el,i) => {

      // if (el.subject === 'Let\'s go for lunch') {
        console.log(el.subject)
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
      // }

  })
  // res.send('deleted!');
}).catch(err => {
  console.log('err', err)
})
