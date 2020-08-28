// const axios = require("axios");
// axios
//   .get("http://3.115.17.206/scripts/cbgrn/grn.exe/api/v1/schedule/events?limit=1000", {
//     headers: {
//       "X-Cybozu-Authorization": `QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=`,
//       Authorization: `Basic QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=`,
//     }
//   })
//   .then(async res => {
//     console.log(res.data.events.length)
//     await  res.data.events.forEach((el, index) => {
//       setTimeout(function() {
//         console.log("Delete event id = " + el.id);
//         axios
//           .delete(
//             `http://3.115.17.206/scripts/cbgrn/grn.exe/api/v1/schedule/events/${el.id}`,
//             {
//               headers: {
//                 "X-Cybozu-Authorization": `QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=`,
//                 Authorization: `Basic QWRtaW5pc3RyYXRvcjpOb3ZlbDA0MjE=`
//               }
//             }
//           ).then(res => {
//             console.log("success roi nha")
//         })
//           .catch(err => {
//             console.log("err: ");
//           });
//       }, 150 * index);
//     });
//   });
// Delete in cloud version
const axios = require("axios");
const domain = "https://test-dev-5.cybozu.com/"
const token = "OTF0b25nZG9uZzI2MDMxNEBnbWFpbC5jb206ZmFiYmkxMjM="
axios
    .get(`${domain}g/api/v1/schedule/events?limit=1000&rangeStart=2020-03-10T12%3A00%3A00%2B09%3A00`, {
      headers: {
        "X-Cybozu-Authorization": token,
        Authorization: `Basic ${token}`,
      }
    })
    .then(async res => {
      console.log(res.data.events.length)
      await  res.data.events.forEach((el, index) => {
        setTimeout(function() {
          console.log("Delete event id = " + el.id);
          axios
              .delete(
                  `${domain}g/api/v1/schedule/events/${el.id}`,
                  {
                    headers: {
                      "X-Cybozu-Authorization": token,
                      Authorization: `Basic ${token}`,
                    }
                  }
              ).then(res => {
            console.log("success roi nha")
          })
              .catch(err => {
                console.log("err: ");
              });
        }, 150 * index);
      });
    });
// const Papa = require('papaparse')
// const fs = require('fs');
// const file = fs.createReadStream("./converted.csv")
//
// Papa.parse(file, {
//   complete: function(results) {
//     console.log("Finished:", results.data[0][0]);
//   }
// });
const myHardWare = {
  'CPU': "intel 5 42100",
  'GPU': 'ndivia geforce 820M',
  'wifi': 'Dell wireless 1705 802.11 b|g|n (2.4GHZ)',
  'hệ điều hành': 'high serria'
}
