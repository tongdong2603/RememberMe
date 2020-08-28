const axios = require('axios');
const _ = require('lodash');

const domain = "https://test-dev-13.cybozu.com/g/" ;
const uriApi = "api/v1/schedule/events";
const token = "1.TqOaRxef2D4nMDusZ9-j5FEjyf_ewZIgAkkEhWCb4nSu98Et";
const titleEvent = 'Create in Garoon';


const getEvents = () => {
  let uri = `${domain}${uriApi}?limit=1000&rangeStart=2020-05-23T12%3A00%3A00%2B09%3A00`;
  axios.get(uri, {
    headers: {'Authorization': `Bearer ${token}`}
  }).then(res => {
    if (res.data.events.length !== 0) {

      const eventEditteds = res.data.events.filter((el) => {
        return el.subject.includes(titleEvent);
      });
      for (let i = 0, len = eventEditteds.length/2; i <= len; i++) {
       setTimeout( () => updateEvent(eventEditteds[i]), i * 300) ;
      }
    }
  })
};

const updateEvent = (params) => {
  let uri =`${domain}${uriApi}/${params.id}`;
  const event = _.pick(params, ["start", "end", "attendees", "visibilityType", "subject", "notes", "eventMenu", "companyInfo"])
  let data = {
    ...event,
    subject: event.subject + ' eddit in garoon'
  };
  axios.patch(
      uri,data, {headers: {'Authorization': `Bearer ${token}`} }
      ).then(res => {
        console.log('sửa thành công')
  }).catch(err => {
    console.log('sửa fail rồi :( : ', err);
  })
};

getEvents();
