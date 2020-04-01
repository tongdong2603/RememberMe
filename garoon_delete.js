const axios = require('axios');
const object = {
  // mitsumuras: 'bWl0c3VtdXJhczpOb3ZlbDA5MTY=',
  // 'minh': 'bWluaDoxMTEx',
  shimomurak: 'OTF0b25nZG9uZzI2MDMxNEBnbWFpbC5jb206ZmFiYmkxMjM=',
  // 'Administrator': 'QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=',
  // 'fabbi-dev-1': 'ZmFiYmktZGV2LTE6ZmFiYmkxMjM=', // xf64e
  // 'fabbi-dev1': 'ZmFiYmktZGV2MTpGYWJiaUAyMDE5'
}

const urlPackage = 'http://52.69.163.106/scripts/cbgrn/grn.exe/'
const uriApi = 'api/v1/schedule/events'
const tokenPackage = 'bWluaDptaW5o';
const cloudUrl = "https://test-dev-5.cybozu.com/g/"
const tokenCloud = 'OTF0b25nZG9uZzI2MDMxNEBnbWFpbC5jb206ZmFiYmkxMjM='

axios.get(`${cloudUrl}${uriApi}?limit=1000&rangeStart=2020-03-31T12%3A00%3A00%2B09%3A00`, {
  headers: {
    'X-Cybozu-Authorization': `${tokenCloud}`,
    'Authorization': `Bearer ${tokenCloud}`
  }
}).then(async resp => {
  if(resp.data.events.length === 0) {
    isRunning = 0;
  }
  console.log('resp.data.events.length', resp.data.events.length)
  // console.log('resp.data.events[0]', resp.data.events[0]);
  // console.log('resp.data.events[resp.data.events.length-1]', resp.data.events[resp.data.events.length-1]);
  await resp.data.events.forEach((el,i) => {
    setTimeout(function() {
      console.log('Delete event id = ' + el.id);
      axios.delete(`${cloudUrl}${uriApi}/${el.id}`, {
        headers: {
          'X-Cybozu-Authorization': `${tokenCloud}`,
          'Authorization': `Bearer ${tokenCloud}`
        }
      }).catch(err => {
        console.log('err')
      }).then(res => {
        console.log("delete rôi nha")
      })
    }, 50*i)
  })
}).catch(err => {
  console.log('err', err)
})

// Package Delete
// console.log(`${urlPackage}${uriApi}`)
// axios.get(`${urlPackage}${uriApi}?limit=1000&rangeStart=2020-03-25T12%3A00%3A00%2B09%3A00`, {
//   headers: {
//     'X-Cybozu-Authorization': `${tokenPackage}`,
//     'Authorization': `Bearer ${tokenPackage}`
//   }
// }).then(async resp => {
//   if(resp.data.events.length === 0) {
//     isRunning = 0;
//   }
//   console.log('resp.data.events.length', resp.data.events.length)
//   // console.log('resp.data.events[0]', resp.data.events[0]);
//   // console.log('resp.data.events[resp.data.events.length-1]', resp.data.events[resp.data.events.length-1]);
//   await resp.data.events.forEach((el,i) => {
//     setTimeout(function() {
//       console.log('Delete event id = ' + el.id);
//       axios.delete(`${urlPackage}${uriApi}/${el.id}`, {
//         headers: {
//           'X-Cybozu-Authorization': `${tokenPackage}`,
//           'Authorization': `Bearer ${tokenPackage}`
//         }
//       }).catch(err => {
//         console.log('err')
//       }).then(res => {
//         console.log("delete rôi nha")
//       })
//     }, 50*i)
//   })
// }).catch(err => {
//   console.log('err', err)
// })
