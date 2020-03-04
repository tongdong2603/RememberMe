const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6InBuVS1mTjY1TVg3WkNIdFNPVWR2RnNzclJoa1A3SGxPeEN5dlluaURiNVEiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyIsImtpZCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNTcwMDcyNTU3LCJuYmYiOjE1NzAwNzI1NTcsImV4cCI6MTU3MDA3NjQ1NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyVmdZT2dUNmY1OTRaNlcvZVZTdmFyZXI1L3FEWTZGSEZzY3JqR0gyZWk4MEF5R0NuWUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ikdhcm9vbiBPZmZpY2UgQ2FsZW5kYXIgU3luYyIsImFwcGlkIjoiZWZiOTJjMGItYmI2OS00OTE5LTljM2YtZmVhYzlmZTU4MjUyIiwiYXBwaWRhY3IiOiIxIiwiaW5fY29ycCI6InRydWUiLCJpcGFkZHIiOiIxMDMuODguMTEzLjE0NiIsIm5hbWUiOiJOZ3V5ZW4gVGllbiBIdW5nIDIwMTQyMTgwIiwib2lkIjoiN2MyYjE3MmQtODA2My00ODFhLTg3YWUtNDFkNmFjODA5Y2VjIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTI3NDYyNTEwMDctMTMyNDU5NTIwNi03ODE2NTQzNTEtMjc1ODciLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzNGRkZBNURFNjc5QSIsInNjcCI6IkNhbGVuZGFycy5SZWFkLlNoYXJlZCBDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic3ViIjoiS25SamV0LUJYS3l6SG1YV0xKWWRuT0I3OVBVTno3bjAzc3h2cVl2SnlvQSIsInRpZCI6IjA2ZjFiODlmLTA3ZTgtNDY0Zi1iNDA4LWVjMWI0NTcwM2YzMSIsInVuaXF1ZV9uYW1lIjoiaHVuZy5udDE0MjE4MEBzaXMuaHVzdC5lZHUudm4iLCJ1cG4iOiJodW5nLm50MTQyMTgwQHNpcy5odXN0LmVkdS52biIsInV0aSI6IlJWWFYySXk3blVDSE9NeENhendJQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiWi1aVDZjTjdQcXVQM1ZqenIwOHczNnI2anBIOHlnNVJuVUFLMWExNGE4WSJ9LCJ4bXNfdGNkdCI6MTUwMjg3MTE0Mn0.jtFqB2dBnA6zPGl8pffNI0W7cwBf0PvwEVymV2A_XBtGIdeeLwCmAdnlaYaPDxD9N9twLV9KUWzLsxrwVUlEp8LGCY2_r-S28lMf27EwpT8uUfJ8nh3Jvc8ma1-qqqYGTrnsM-9aftpv_eqInNW_Zqvy0IqRm-o7ojbuJeCW2R6zKWdTRoI8WALEAse2awEGDm6ORMSiMCGbjEb5CKbuRpf1gf6LOpS4S19Zif_W5Hi2ZHcpYoNVfdtzhrUQWHqcqU3zRoU0GfBc2BcB_0V9O0xBufoQ2bLlOl3QGXXLO3WnjBHEy78EmA7NSZAoaASoA8jHQLi7xFQSWHIsGphCAw';

var isRunning = 1;

clear();

function clear() {
  if(isRunning) {
    setTimeout(clear, 250000);
  } else {
    console.log('Done!');
  }

  axios.get('https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async resp => {
    if(resp.data.value.length === 0) {
      console.log('Done!');      
      isRunning = 0;
      return;
    }
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
  }).catch(err => {
    console.log(err)
  })
}

// axios.get('https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id', {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// }).then(async resp => {
//   // console.log('resp', resp.data)
//   await resp.data.value.forEach((el,i) => {
//     setTimeout(function() {
//       axios.delete(`https://graph.microsoft.com/v1.0/me/events/${el.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then(() => {
//         console.log('delete office ne', i);
//       }).catch(err => {
//         console.log('err', err)
//       })
//     }, 250*i)    
//   })
//   // res.send('deleted!');
// }).catch(err => {
//   console.log('err', err)
// })