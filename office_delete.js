const axios = require('axios');
const token = 'EwBwA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAZMvNiz2U5HwvoRp9cVUfPI69YAyl/5x/8+0TU52cGvuTU2U1uTymr2ckhy93T10iA7v2CJZeJ9k1ondu8Zv7jV9DZq3TAAude3fr21E/VgwvxzwmgDnsiBO69IhcM6M5CbR65kDkC2H5CqYjaEqBWdUtXDtSh//bdkuyTY7dh4X6suwMJYGomTtdAcBt7Ke/6BWz5ZzKIIJ3P8XmoHrOSCM1BAHRWLCgqoZBv2ofW43izfTbgjtF32vwDxizYoEOEb/XrlZ1Ltp8LjP0Fv5anaxyxleGw1ubKH/JkQ54hkuZ3fpQ6GWySLiGkGWPql0lazZ7xjWCfKmHZ2xjSyYMW8DZgAACCL+f8rnwSt9QALwclvPENR6iWw2BukQGxzFkJdaPFQRLKh37Oc+CK/shoaMgJZXRO7dNWrnpwLh6CJ5M4fjRcqZ+tDhY9NRy1HSaW1wOVRUm4Hwhw9xpv0+NAgXCGJW1V5xJCSSPk/uiGq5ilVC8APqHC2WDWizkr27yGXorXcRTVU+2jsXeTDZq3l+bGpWxnB2tQXDeYcXO7WDdx0KHJkZSqBEWQ4MpFiUVa1mBu58giTEIDkMkg48Cuov0hTuaNSpL7sqOSTV54bghLOoAVQYJoMDGit3t14aPvEg/naHtInchAS54RqPACplXj/Gi2pAvd3HZipvfxewWts8Nu6GX4VzUv5+Q4oJbsxwhe9esE+z1zssqycUXeJBA+fff9L7RJrGr3KpDtdHOI45zRehvNl+YbWqolR8SwVPI0gsgJTH2GKTrrA5mvzBTzW/0HrVtE/s2VzWcVBKmVtGRJR5FlWZaDAkYgWOyzS3yVZz0a/6nykWxd113hZtUgDLQwrITmxFvFDvMfC2iUNtlu00O5MZcQmIUS18ge/MtgCWe1fY62Hg+jn5Q5m1HJVYILSjLrF+nYko3Y8HW23xMKsUXg4e6zGT1AzLymP62mBfWIhisvf1apjiQ1GIt+so4oZkzsX8jY59cl8Lp52oofWOSKw8lE9fL5AzVWYzNffpsUAvnkYCSEVuOfBahByr5zZk+5IilitVISrW4AWbFS0KI3jHtOXStOeY4tFY2ZMOudpoKwYSECtgQtLxS5fY0LtQECOZovH1dEqMAg==';

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
