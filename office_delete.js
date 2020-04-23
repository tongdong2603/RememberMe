const axios = require('axios');
const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlJmU2o1ZVVaMWlIRHctUUJhcFN2M0JHQ0FZalRqcGlaZmpLWmYyOTFuaTgiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hNWE1ZjgxZC0wNDgzLTQ4YWEtYjkxNy02NmNiYTllYjhlZDgvIiwiaWF0IjoxNTg2NDU5OTk3LCJuYmYiOjE1ODY0NTk5OTcsImV4cCI6MTU4NjQ2Mzg5NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyZGdZR2gydDFwdFBldlVuaGRGNFgxK00zVjRYeGx1VUJJU2pmOVdrL0RSK3NQanBYc0IiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ikdhcm9vbiBPZmZpY2UgQ2FsZW5kYXIgU3luYyIsImFwcGlkIjoiZWZiOTJjMGItYmI2OS00OTE5LTljM2YtZmVhYzlmZTU4MjUyIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJtaXRzdW11cmEiLCJnaXZlbl9uYW1lIjoic2F0b3NoaSIsImlwYWRkciI6IjExMi42OS40NC45NSIsIm5hbWUiOiJtaXRzdW11cmFzIiwib2lkIjoiYTQ5YWFlODEtMjIxYi00MTk2LTk3NGMtN2I5YzBlYzBlYmU5IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAwQTA0NDRFQTEiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZCBDYWxlbmRhcnMuUmVhZC5TaGFyZWQgQ2FsZW5kYXJzLlJlYWRXcml0ZSBDYWxlbmRhcnMuUmVhZFdyaXRlLlNoYXJlZCBEaXJlY3RvcnkuQWNjZXNzQXNVc2VyLkFsbCBEaXJlY3RvcnkuUmVhZC5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkLkFsbCBVc2VyLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkV3JpdGUgVXNlci5SZWFkV3JpdGUuQWxsIGVtYWlsIiwic3ViIjoiYnRFSk9yXzROc2dMa1RqdWZ1bDRtc1EtWk0zUXc1dTZhQ1F2dGMwOFIwVSIsInRpZCI6ImE1YTVmODFkLTA0ODMtNDhhYS1iOTE3LTY2Y2JhOWViOGVkOCIsInVuaXF1ZV9uYW1lIjoibWl0c3VtdXJhc0Bub3ZlbC1kZXYub25saW5lIiwidXBuIjoibWl0c3VtdXJhc0Bub3ZlbC1kZXYub25saW5lIiwidXRpIjoiUTc0MndQcnJDMGlLcUlkQWVyd3FBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJfYWJoRlVRbEF1RGxIRWRweDkzSk9kZVZnbjVhZUExamNjZVVyUGVGU3BrIn0sInhtc190Y2R0IjoxNDIzNjQ4NDM3fQ.AZ69YC-WrRbD5SO9XU-6eKvYiJV3kU91qZOUoibEquRO4wK2DYw3yIj623hIcvOj7ca4xkiCCgu-y_GR-CrTVuMQMRfQiVlUF_dyldN_9ixYpzmIx0kXgVbKaHBERNc55ZtkD18uM064rPERUSG1cbHt-O5KCYBwGPlPJmfZurYeoyZBoah1FQJoHE_Qd7hHTwef7YYvHUdAJ5LCbybNwgWpxn1LuSKNZAZiAbtWcB_IStVvZ8skxaZM7c7faCoO4FIP_9O2rvleVIe0Q2QKtvUILNS61iuqPkaXLY-3up7iFQfZeQbxlsSIjykMylsPMZa0Jf8-vAJeRuTAovNplg';

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
    if(el.subject === 'event xóa đi') {
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
    }
  })
  // res.send('deleted!');
}).catch(err => {
  console.log('err', err)
})
