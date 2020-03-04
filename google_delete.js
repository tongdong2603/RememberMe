const axios = require('axios');
const token = 'ya29.Glx5B9t7kVbEycBOOnU008kmsJ3HDk2rbA7zPeDGvztGylIXAgLGGWgW2XjoHtJKgTfE7lzPL6IpPpqjuEUUBTYhVw8aEqu41DBOUJ0R-VqZnE2VZD8NE4pndPXG2Q';

var isRunning = 1;

clear();

function clear() {
    if (isRunning) {
        setTimeout(clear, 250000);
    } else {
        console.log('Done!');
    }

    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?updatedMin=2019-09-04T00%3A00%3A00Z', {
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
