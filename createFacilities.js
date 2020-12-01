var limit = 200;
const axios = require('axios');
const accessToken = "ya29.a0AfH6SMCbdPzRn1CId0KIoUXcmk8Dj03CXn5umTY3DFMtv0Ho80wbnKk8f8Y_QTgal3oShkSm_nWA1JZChb3UUjLRfSqfdgpxHogujd3gjg-27d-w5Qb3w7ayjtn7SQ8pgkpAEMKiFUBO0A9_V8hHcUfdEqBb8g35TQY"
for (let i = 0; i < limit; i++) {
  const params = {
    "resourceId": `test${i}`,
    "resourceName": `testName${i}`
  };
  const params1 = {
    method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
    data: params,
        url: 'https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars'
  }
  setTimeout(function () {
    axios(params1).then(res => console.log('test')).catch(err => console.log(err.message))
  }, 150);

}
