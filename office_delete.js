const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlRPYXJsRW8zZ0VlNTlrZHJ6OE4tLWE2N1ByNGpDQmJENk82WnpEZjZRSnciLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZDgzNmU0OC05Y2MyLTQ5NjUtYTg0My1mNWE2NzFjMmJlODYvIiwiaWF0IjoxNTk4NTc3NjUxLCJuYmYiOjE1OTg1Nzc2NTEsImV4cCI6MTU5ODU4MTU1MSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyQmdZTGhWdnB5cjBTNSsrWXFsRzlJbDVmZUo5ZDhKVzc3TGEzWjZlMmZscG9uUjBSa0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ikdhcm9vbiBPZmZpY2UgQ2FsZW5kYXIgU3luYyIsImFwcGlkIjoiZWZiOTJjMGItYmI2OS00OTE5LTljM2YtZmVhYzlmZTU4MjUyIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4iLCJnaXZlbl9uYW1lIjoiSHVuZyIsImlwYWRkciI6IjE4My45MS40LjMxIiwibmFtZSI6Ikh1bmcgTmd1eWVuIiwib2lkIjoiMzgxNjZjMjYtM2E1Yy00NmY5LWI2ZDgtN2YzYjBlZTc3MzMwIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAwQ0Y2QzFGNDgiLCJyaCI6IjAuQUFBQVNHNkRiY0tjWlVtb1FfV21jY0staGdzc3VlOXB1eGxKbkRfLXJKX2xnbEpXQURvLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkLlNoYXJlZCBDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIG9wZW5pZCBQbGFjZS5SZWFkLkFsbCBwcm9maWxlIFVzZXIuUmVhZC5BbGwgVXNlci5SZWFkV3JpdGUgZW1haWwiLCJzdWIiOiJuVGJsUXBLOVl5cjhoV1BwV3lOaE9MVzdzNnkwSmpHZFNFZVkwZjRWSmc0IiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiNmQ4MzZlNDgtOWNjMi00OTY1LWE4NDMtZjVhNjcxYzJiZTg2IiwidW5pcXVlX25hbWUiOiJodW5nbnRAZmFiYmlnYXJvb24zMDAub25taWNyb3NvZnQuY29tIiwidXBuIjoiaHVuZ250QGZhYmJpZ2Fyb29uMzAwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Ik1ESzZfOTFDZFU2UHlBM1dqN2k1QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImYyZWY5OTJjLTNhZmItNDZiOS1iN2NmLWExMjZlZTc0YzQ1MSIsIjliODk1ZDkyLTJjZDMtNDRjNy05ZDAyLWE2YWMyZDVlYTVjMyIsIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCJdLCJ4bXNfc3QiOnsic3ViIjoid0ZZUy15UFI0TWF5Mm55TVU0Vm00RUZsdWtYSVVHZnNYb2luQzdNMlpiQSJ9LCJ4bXNfdGNkdCI6MTU5NDcxNjQ0N30.NGcfvv5rLr3wPXznqWNuLIAm1UxZTPDHw1Pz_iSFm9BN55luZR0S_Qccd71YapZO39nzMQfKntI2k_R2HBbF1jUUWTFoZos24HxhOR_WKV8eRWBdUpmH4sb2-X01BKG0Hg3dXIpPP3HvKXawD40X-s3fJS53I7cvhHLWTFZ1kikKiF7-rng58TWWz7zgHJZ6TyRr-96nWHGDyLMtqhTyKRBDKCig48N0BOlyTC73RNnEBxkIL11hAhA7aZZVZNnDRybqv7ysfi1918mxu5DZ-v7gOz-5cmTAh1C0NZEVcYt1Ey1lETKLyX-FmN8eVElvhdZhoqZH_x1BEu5L7WvuYA';

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

axios.get('https://graph.microsoft.com/v1.0/me/events?startDateTime=2020-08-04T09:00:00.0000000&endDateTime=2020-08-08T09:00:00.0000000&$top=1000&$select=id,subject', {
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
