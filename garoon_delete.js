const axios = require('axios');

const urlPackage = 'http://52.69.163.106/scripts/cbgrn/grn.exe/';
const uriApi = 'api/v1/schedule/events';
const tokenPackage = 'bWluaDptaW5o';
const cloudUrl = "https://test-dev-8.cybozu.com/g/";
const tokenCloud = '1.YXegqNFprHatbDV5yx6wpAAv5rkBN8BTzodb8pZQAeaDPJRT';
let isRunning = 1;

clear();
function clear() {
  if(isRunning) {
    setTimeout(clear, 200000);
  } else {
    console.log('Done!');
  }
  console.log(`${cloudUrl}${uriApi}?limit=1000&rangeStart=2020-05-23T12%3A00%3A00%2B09%3A00`);
  axios.get(`${cloudUrl}${uriApi}?limit=1000&rangeStart=2020-06-22T12%3A00%3A00%2B09%3A00`, {
    headers: {
      // 'X-Cybozu-Authorization': `${tokenCloud}`,
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
        console.log('Delete event id = ' + el.subject);
        axios.delete(`${cloudUrl}${uriApi}/${el.id}`, {
          headers: {
            // 'X-Cybozu-Authorization': `${tokenCloud}`,
            'Authorization': `Bearer ${tokenCloud}`
          }
        }).catch(err => {
          console.log('err')
        }).then(res => {
          console.log("delete rôi nha")
        })
      }, 150*i)

    })
  }).catch(err => {
    console.log('err', err)
  })
//
//   Package Delete
//   console.log(`${urlPackage}${uriApi}`)
//   axios.get(`${urlPackage}${uriApi}?limit=1000`, {
//     headers: {
//       'X-Cybozu-Authorization': `${tokenPackage}`,
//       'Authorization': `Bearer ${tokenPackage}`
//     }
//   }).then(async resp => {
//     if(resp.data.events.length === 0) {
//       isRunning = 0;
//     }
//     console.log('resp.data.events.length', resp.data.events.length)
//     // console.log('resp.data.events[0]', resp.data.events[0]);
//     // console.log('resp.data.events[resp.data.events.length-1]', resp.data.events[resp.data.events.length-1]);
//     await resp.data.events.forEach((el,i) => {
//       setTimeout(function() {
//         console.log('Delete event id = ' + el.id);
//         axios.delete(`${urlPackage}${uriApi}/${el.id}`, {
//           headers: {
//             'X-Cybozu-Authorization': `${tokenPackage}`,
//             'Authorization': `Bearer ${tokenPackage}`
//           }
//         }).catch(err => {
//           console.log('err')
//         }).then(res => {
//           console.log("delete rôi nha")
//         })
//       }, 50*i)
//     })
//   }).catch(err => {
//     console.log('err', err)
//   })
}



// // Package Delete
// console.log(`${urlPackage}${uriApi}`)
// axios.get(`${urlPackage}${uriApi}?limit=1000&rangeStart=2020-06-12T12%3A00%3A00%2B09%3A00`, {
//   headers: {
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
