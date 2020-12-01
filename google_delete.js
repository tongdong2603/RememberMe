const axios = require("axios");
const token =
  "ya29.A0AfH6SMAxIKLD3Bb7Lg6AOMtQI2xTr70x5xLMDmAknZ8UjyrtGddgIQCyCBKCpZubT1JcakLdMaiQ8xCg25Y_H3kxyE1baT_2WgXXLSez-4VsnoNQtJsMiWvPmMil2lNva2naH9UdjfCw6RTIb2Ede1IrjnjqTsfYKNVTMNRujHY";
const arrDelete = [
  "event with quan(no s)",
  "「Garoonから」クアン（sなし）と打ち合わせ",
  "oriens-lms 定例会",
  "休み",
  "$$$$$",
  'Third "x" Anniversary',
  "sinh nhật Công te",
  "My birthday",
  "Aniversary",
  "Wedding aniversary",
  "First kiss Anniversary"
];
let uri =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=2020-10-30T00:00:00Z&maxResults=2500";

var isRunning = 1;
const getEvent = options => {
  const { google_access_token, pageToken } = options;
  if (pageToken) {
    uri = `${uri}&pageToken=${pageToken}`;
  }
  return axios
    .get(uri, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(body => {
      if (body.data.nextPageToken) {
        return getEvent({
          ...options,
          pageToken: body.data.nextPageToken
        }).then(events => [...events, ...body.data.items]);
      }
      return body.data.items;
    })
    .catch(err => console.log(err));
};

clear().then(res => {
  console.log("res");
});

async function clear() {
  if (isRunning) {
    setTimeout(clear, 250000);
  } else {
    console.log("Done!");
  }
  const allEvent = await getEvent({});
  const eventDelete = deleteEventKeepOneEvent({ unDeletedEvents: allEvent });
  const eventDeleteForce = allEvent.filter(
    el => !eventDelete.some(ev => ev.id === el.id)
  );
  console.log(eventDeleteForce.length);
  console.log(eventDelete.length);
  console.log(allEvent.length);
  await eventDeleteForce.forEach((el, i) => {
    setTimeout(function() {
      axios
        .delete(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events/${el.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          console.log("delete google ne :", i);
        })
        .catch(err => {
          console.log("err : ", err);
        });
    }, 250 * i);
  });
}
const deleteEventKeepOneEvent = options => {
  const { unDeletedEvents } = options;
  return unDeletedEvents.reduce((a, b) => {
    if (a.length === 0) {
      return [...a, b];
    }
    if (
      a.some(el =>
        el.summary === b.summary && el.start.date
          ? el.start.date === b.start.date
          : el.start.dateTime === b.start.dateTime && el.end.date
          ? el.end.date === b.end.date
          : el.end.dateTime === el.end.dateTime
      )
    ) {
      return [...a];
    } else {
      return [...a, b];
    }
  }, []);
};
