const axios = require('axios');
const token = 'EwBwA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAQ++1LjL/BvyTcFGuHap5Sl16cGsH/vwh8+A4QnGlAqYxYdJENw+bI0VjC1PubDlTcwdL0AP1ioXiE64tAIUGL0bUphtzN1lgHkRLR7KxWeTFkDze0gfHXy+Kw428x8PmjpCF7gPbdlbdtgSQ9vMkpFX2pWth7Nob1mSuAFRY9Ro/8btv5U4K+ERTVcbOZp8/3dS6ap7MUfoU1Z06QHmsOC/IloE6TMfKN4/Vk0+Wb1ciOanR55ltfjRMIx4TNOEsN4WSaLJWLhM523jrI9EoTVfEbaAp5U8J+089wnF0vZvFDxSFp87Zv9rXLE5vYWBKiP+JnD72O5jmavh65K2ShYDZgAACIlcJ2gsQLy6QAICNkxNCni94qtQC/ek9pqDIO3PhItdb69qyb3G/D/CArUsDRmqLkgcF9YZRlmHImFACnoTJeX+MYRytAgL2iYJslLHndL2WTu1ThNESUNaqKI9nrFbHND1gqBx9oOs15GtxIZbt7mEIY9Csb3aNj9MbVs3fyQ9sGVOhV9FVgH/efY27u4gQYHeH5Gl1LxikI0IN6IxMkG9mGrCFZIKclbTO2l2xAsRsZ+8ZvhPaXQr/i616W+ISuOY2f6Sa798igXwZcxdGyWfkMLMV8rBnkPM2otESazFIgOg2IwmLG6pJG57b/zRmlYjXJm0DWVwTk+Jrij87acafRhz9e2KaJEOTTiS8guN/qDodjPaVorjVTACSZAsaxgqFN3Q3a0Gbdh0iEvOpewS/FLBgz7h/1k3D8y4hSTQLY65K1ab3Czgf5mYab1VEGVbtoZ8oq5RttTWYTJa2/qE4pswRQO+tL0J1Ef3/VUAAmYiqGH0m/OukY7DbNnN/BXO8V1uKlisggSe75zNR63IrzhD2zSWrNS5ANmhtM9+GHtnnfzDNVtyYTXzaevVKUrJK0peQSRBEBi3nrCKFp51Y1h7NwmqfjySyCV00KEmvhAEHDHX6gN/+ocMRcqaC1Tr3/Li0nruW76FUVFoC/Uzz6U3kOeQ9z1tPU5cD5gKd+y8oAyu/5+9lJwKQpOavRoCuL6jmH06f4OpyCTyXvDY24+2rNd1itObCK9+Zt0K9PXgEGHrWOT7XwFpPNlBwnC7MRGWjBn/vpmIAg==';

var isRunning = 1;

clear();

function clear() {
  if(isRunning) {
    setTimeout(clear, 250000);
  } else {
    console.log('Done!');
  }

  axios.get('https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id&startDateTime={start_datetime}', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async resp => {
    if(resp.data.value.length === 0) {
      console.log('Done!');
      isRunning = 0;
      return;
    }
    console.log(resp.data.value.length)
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
