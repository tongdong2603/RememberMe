const axios = require("axios");
const access_token =
  "ya29.a0AfH6SMCVP6ReyPJNYQTRs68Qfiq4-2Dhgu4IgmFoa7_-QMgUVuSFsISlWoupH7EhTECxT3uuBeXShQH3pmEMDC2p3KsfKfTDc-FnCUOlLc5nz_Ju4bLGLsgfSrklrDlzr7ZtD38QCjHTlvbJI_HKvTi_DA3JauakVI4";
const getAllFacilitiesGoogle = options => {
  const { access_token, nextPageToken } = options;
  const url = `https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars?${
    nextPageToken ? "pageToken=" + nextPageToken : ""
  }`;
  console.log(url);
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    .then(res => {
      if (res.data.nextPageToken) {
        return getAllFacilitiesGoogle({
          access_token,
          nextPageToken: res.data.nextPageToken
        })
          .then(events => {
            return [...events, ...res.data.items];
          })
          .catch(err => {
            console.log(err.message);
          });
      }
      return res.data.items;
    })
    .catch(err => {
      console.log(err.message);
    });
};
getAllFacilitiesGoogle({ access_token });
