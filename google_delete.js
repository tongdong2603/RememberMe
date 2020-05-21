const axios = require('axios');
const token = 'ya29.a0AfH6SMAXTjNmyi7Wyvz_Vm5ruTnU_EKpBsX6DwHaySgdqYnwBw601oRU9fPM2R0__FogDnNdo2kKSYpDT6gelKDrhyaJUMu9rcQmvmhcaUO2Xhpgl5C-_piqOQqia4TMGlt9bwlikMnQFfAqx7NDXXgQX021oeSxZQk';

var isRunning = 1;

clear();

function clear() {
    if (isRunning) {
        setTimeout(clear, 250000);
    } else {
        console.log('Done!');
    }

    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?limit=1000&singleEvents=true&orderBy=startTime&timeMin=2020-05-19T00:00:00Z', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async resp => {
      console.log(resp.data.items);
        // const unDeletedEvents = resp.data.items.filter(ev => ev.status !== "cancelled");
        // console.log('resp.data.items.length ', resp.data.items.length, unDeletedEvents.length);
        // if (unDeletedEvents === 0) {
        //     console.log('Done!');
        //     isRunning = 0;
        //     return;
        // }
        // await unDeletedEvents.forEach((el, i) => {
        //     setTimeout(function () {
        //         axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${el.id}`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         }).then(() => {
        //             console.log('delete google ne :', i);
        //         }).catch(err => {
        //             console.log('err : ', err)
        //         })
        //     }, 250 * i)
        // })
    }).catch(err => {
        console.log(err)
    })
}
