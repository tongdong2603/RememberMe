const axios = require('axios');
const token = 'ya29.a0Ae4lvC0AWPoWsuzH7VfVQNe6U5CZcuduaONzFex4J8_Hq4Xx3h5nQVuxpBeDAzWJuHJd029X80E8EPQ8CTgaoWVqUy6tEjdflEZqE8NPToNrKvTE_MfzMX88XVOvnJwCwoPaRHc2K5au0OwibJgzP7hc0ERuLJ510WY';

var isRunning = 1;

clear();

function clear() {
    if (isRunning) {
        setTimeout(clear, 250000);
    } else {
        console.log('Done!');
    }

    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?limit=1000&singleEvents=true&orderBy=startTime&timeMin=2020-03-31T00:00:00Z', {
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
