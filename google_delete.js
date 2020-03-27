const axios = require('axios');
const token = 'ya29.a0Adw1xeXvQkWL_rEq_0TkaO-yAepOe_4bGyvMa1rsKoA3SKnwUU84-98qG6t5VcKy4mbbkaz87_3oJ94UBE0QLWfca-QuSzoPDSGYCpuMXZ-1AiAwvl3V0q5_Nq2eNlnR9i7RCC4X5CbZ8xbLxYqkE2WFpGEFmt5kOho';

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
