const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6ImpYOGFkV0w4MTlncjFPbW5OV0xzZ1gzbS12elNQMXZiUWxuSW5TQUdPaWciLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZDgzNmU0OC05Y2MyLTQ5NjUtYTg0My1mNWE2NzFjMmJlODYvIiwiaWF0IjoxNTk1NTU3MTQyLCJuYmYiOjE1OTU1NTcxNDIsImV4cCI6MTU5NTU2MTA0MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyQmdZREI2emZyK2ZsbG9iOFUvczNybVo5UG43blkyQzh6YWsvMVVjZWFNWWpXTlQ1b0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik9mZmljZSBHYXJvb24gQ2FsZW5kYXIiLCJhcHBpZCI6IjE2NGQzZWVjLTY0YWEtNGYyMS04ZTZlLTViZmMxMGIzOGJkYiIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiTmd1eWVuIiwiZ2l2ZW5fbmFtZSI6Ikh1bmciLCJpcGFkZHIiOiIxMDMuODguMTEzLjE0NiIsIm5hbWUiOiJIdW5nIE5ndXllbiIsIm9pZCI6IjM4MTY2YzI2LTNhNWMtNDZmOS1iNmQ4LTdmM2IwZWU3NzMzMCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMENGNkMxRjQ4Iiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDYWxlbmRhcnMuUmVhZFdyaXRlLlNoYXJlZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im5UYmxRcEs5WXlyOGhXUHBXeU5oT0xXN3M2eTBKakdkU0VlWTBmNFZKZzQiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiI2ZDgzNmU0OC05Y2MyLTQ5NjUtYTg0My1mNWE2NzFjMmJlODYiLCJ1bmlxdWVfbmFtZSI6Imh1bmdudEBmYWJiaWdhcm9vbjMwMC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJodW5nbnRAZmFiYmlnYXJvb24zMDAub25taWNyb3NvZnQuY29tIiwidXRpIjoiRXR5NDRIbjNSRWVabjFQSjAwb0VBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIl0sInhtc19zdCI6eyJzdWIiOiJoUF9ZdDVWSS1hb0RhS1RvaFdFMVlzVnVoY3k5UWhudDZDWF9pZVNSQ1lRIn0sInhtc190Y2R0IjoxNTk0NzE2NDQ3fQ.kuSBzOFMM-6BMDATJt7-Wqr2C1JrdFLPjHkyB7i3hc1RnfqEv6AfZpgsWpIvvUjmES8ePvNd7wlkM91fuNvDZerOU0HMA09y0TZHNrKHaRr6Z6nbEaSKILpW9cqF2L626weqs3e2AHIO-8V2hQ34c8XSDeo72SoosUdGGG-zjmqm1POGAOPj0wkqjR1NF0oPNCxYpnQvD7olrWVidUvByaQ6awgBuT2JoGfykqfXxf_B8bmEANkyRtFGXBqjG0NvUoB1TTpKhQL1LD9eJcQL--PfPgkpdUsim58bQq0xBW10yWpmzkE9e1_tmRhnScMD9oj-SWvvGFUtta7nnaqz4A';

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
