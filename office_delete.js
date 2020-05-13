const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Il8xc2ZRQUdQQmV0QnRORnhnQnZPTVNZbjEwXzhlTElqNnZ3eDdQdm9CNEEiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSIsImtpZCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84ZjVmZDkzMS0wMzQ5LTQ4ZjEtYWEwMS04ZDUyMDY5YWEwMjcvIiwiaWF0IjoxNTg5MjQ4ODUyLCJuYmYiOjE1ODkyNDg4NTIsImV4cCI6MTU4OTI1Mjc1MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhQQUFBQTFxa0luZlRJREg5NENhUmFuUE5ySlkxazZOVTJyY0dCUUpDT2xIRytZRjQ9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJPZmZpY2UgR2Fyb29uIENhbGVuZGFyIiwiYXBwaWQiOiIxNjRkM2VlYy02NGFhLTRmMjEtOGU2ZS01YmZjMTBiMzhiZGIiLCJhcHBpZGFjciI6IjEiLCJpcGFkZHIiOiIyNy43Mi4xMDMuNzciLCJuYW1lIjoidGllbnRpZW4xMCIsIm9pZCI6IjU0MDE1ZWJjLWIwYjEtNGRhOC1hY2U0LWJlYzlmN2MxM2VmOSIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMEJEQTFFOUIzIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDYWxlbmRhcnMuUmVhZFdyaXRlLlNoYXJlZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInN1YiI6IkNpRC1La2VxZjUtaGVseEtvSF9GYkI5c3FoOU5DbGZYTzNXTjI5a0tKb2ciLCJ0aWQiOiI4ZjVmZDkzMS0wMzQ5LTQ4ZjEtYWEwMS04ZDUyMDY5YWEwMjciLCJ1bmlxdWVfbmFtZSI6InRpZW50aWVuMTBAZ2Fyb29uMjAxLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6InRpZW50aWVuMTBAZ2Fyb29uMjAxLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Ikh6bWZDWWJKXzBXLXk1bXVDZk1TQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiMzdFWDVZRlVZUjNmU0I5bnp2SEU5aWhET3E4SWZJbDVlQzZHSEdUbGVpOCJ9LCJ4bXNfdGNkdCI6MTU4NzcxMTI4OH0.yyNdgc0cBcg9WGeWUJRjTBprUxLoqguo7ZXTpzMWyComLUcv8fd2EBDt2Da3_Rwtekn1ulZA_kGqIdiuzcI4rFD8noy2K_yT4rxD2TXbi5d2fh4W4RfzZfK2u-YJoOWhsUwSePHMS-KwV7bIj9ubJrtOjbqW5-7RvkCCJ0kK53Ipx4wpUKUI3U9Li6l6svdmNTuix8_RvzQSc7_gkOZUSEwVAJJsGhFjO1KXLurnalLMZKI1pi22qIIyy2xYbXm9kgickHdGVdIW3L4SOf0FUiqVeZBXApDjChQ_9ZWfnccM7smFxrKi_NwEM7ZYbOLWhP0DatdWns-EvR1GYy68dw';

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
  // console.log('resp', resp.data)
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
