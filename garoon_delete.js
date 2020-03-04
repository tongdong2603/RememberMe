const axios = require('axios');
const object = {
  // mitsumuras: 'bWl0c3VtdXJhczpOb3ZlbDA5MTY=',
  // 'minh': 'bWluaDoxMTEx',
  shimomurak: '1.kduowWPuMj_-uctyz1GToq1jbKyOLhiy1629_GEdANsUjqes',
  // 'Administrator': 'QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=',
  // 'fabbi-dev-1': 'ZmFiYmktZGV2LTE6ZmFiYmkxMjM=', // xf64e
  // 'fabbi-dev1': 'ZmFiYmktZGV2MTpGYWJiaUAyMDE5'
}

Object.keys(object).forEach(key => {
  let isRunning = 1;
  clear();  
  function clear() {
    if(isRunning) {
      setTimeout(clear, 50000);
    } else {
      console.log('Done!');
    }
    const garoonToken = object[key];
    axios.get('https://xf64e.cybozu.com/g/api/v1/schedule/events?fields=id,subject&limit=1000&orderBy=updatedAt desc&rangeEnd=2019-10-03T17%3A00%3A00%2B09%3A00&rangeStart=2019-10-03T12%3A00%3A00%2B09%3A00', {
      headers: {
        // 'X-Cybozu-Authorization': `${garoonToken}`,
        // 'Authorization': `Basic ZmFiYmktZGV2OkZhYmJpQDIwMTk=`
        'Authorization': `Bearer ${garoonToken}`
      }
    }).then(async resp => {
      if(resp.data.events.length === 0) {
        isRunning = 0;
      }
      console.log('resp.data.events.length', resp.data.events.length)
      // console.log('resp.data.events[0]', resp.data.events[0]);
      // console.log('resp.data.events[resp.data.events.length-1]', resp.data.events[resp.data.events.length-1]);
      await resp.data.events.forEach((el,i) => {
        if (el.id == '117081') return;
        if (el.subject !== '[訪問]ジャストコンサルティング') return;
        setTimeout(function() {
          console.log('Delete event id = ' + el.id);
          axios.delete(`https://xf64e.cybozu.com/g/api/v1/schedule/events/${el.id}`, {
            headers: {
              // 'X-Cybozu-Authorization': garoonToken,
              // 'Authorization': `Basic ZmFiYmktZGV2OkZhYmJpQDIwMTk=`,
              'Authorization': `Bearer ${garoonToken}`
            }
          }).catch(err => {
            console.log('err')
          })
        }, 50*i)      
      })
    }).catch(err => {
      console.log('err', err)
    })
  }
})

// clear();
// function clear() {
//   if(isRunning) {
//     setTimeout(clear, 3000);
//   } else {
//     console.log('Done!');
//   }

//   axios.get('https://xf64e.cybozu.com/g/api/v1/schedule/events?fields=id&limit=120&orderBy=updatedAt desc', {
//     headers: {
//       'X-Cybozu-Authorization': `${garoonToken}`,
//       'Authorization': `Basic ${garoonToken}`,
//       // 'Authorization': `Bearer ${garoonToken}`
//     }
//   }).then(async resp => {
//     if(resp.data.events.length === 0) {
//       isRunning = 0;
//     }

//     await resp.data.events.forEach((el,i) => {      
//       setTimeout(function() {
//         console.log('Delete event id = ' + el.id);
//         axios.delete(`https://xf64e.cybozu.com/g/api/v1/schedule/events/${el.id}`, {
//           headers: {
//             'X-Cybozu-Authorization': garoonToken,
//             'Authorization': `Basic ${garoonToken}`,
//             // 'Authorization': `Bearer ${garoonToken}`
//           }
//         }).catch(err => {
//           console.log('err')
//         })
//       }, 20*i)      
//     })
//   }).catch(err => {
//     console.log('err', err)
//   })
// }