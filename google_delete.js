const axios = require('axios');
const token = 'ya29.a0Adw1xeXqGVJ34Hsu1Mg84WBGY-byd1BRhTrKayW9U6VDpT5sdamNXnd4QzoW7bq24fxVNjG1zyy0EDq9ZZE3vvhzW-E5obHSkqudrqntAPnPXwHsZsyn4uXzU-_XRSN5D0bXYQWYoZ0SA4hyqwUfzF7-FDVFxvkcTnU';

var isRunning = 1;

clear();

function clear() {
    if (isRunning) {
        setTimeout(clear, 250000);
    } else {
        console.log('Done!');
    }

    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?limit=1000', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async resp => {
        const unDeletedEvents = resp.data.items.filter(ev => ev.status !== "cancelled");
        console.log('resp.data.items.length ', resp.data.items.length, unDeletedEvents.length);
        if (unDeletedEvents === 0) {
            console.log('Done!');
            isRunning = 0;
            return;
        }
        await unDeletedEvents.forEach((el, i) => {
            setTimeout(function () {
                axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${el.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    console.log('delete google ne :', i);
                }).catch(err => {
                    console.log('err : ', err)
                })
            }, 250 * i)
        })
    }).catch(err => {
        console.log(err)
    })
}
