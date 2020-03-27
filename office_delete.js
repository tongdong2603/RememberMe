const axios = require('axios');
const token = 'EwBwA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAQr0onOWslwQhj5+ZspcM6QTCe6ptdVAQCdVFB3ww7HAH8k6WwMm+eeqMxSB4saHRU8AO5sXsjJDTcPF64ayRkD0tqHVUCUxouYqbYKADq103t01XeJAfc8sIOLmTqafnWfsBSNP0Wx+BZmEgHCr2wMeSiojb6F4dBs1sCxeieOwoK3t2zli8XnkZMzrPaiPZYH1O6a/pLQ0S9b/DcX9LDcdUPxJlzLb4S221zoUMZdw/1aZU/BixypfG5n212EQY8Jhv7CpTMhyNMrjnQPx6JlQSwUS370/Yh5ouayL+LipkXpQ9pilkyPtIuUeMqfUA8Zxd0NACr6aC2yBCeUqyCcDZgAACOe97adiA7cbQAKJnpH19Rfs427hi5s4DQ3Gil23lKUELeKWDhrfxONf9FKJ1GTs6Zgxx2R2TbOb6lmrbHmoaM5IsTeD7RnYnQzjQFwzTpXkZr/3p7OH5zChal1tsPyTjEE3UpZ8bmP+ttdu5jOAAOqUcXFcU559pTx9XdwLI8KhdUd1OqiACqcm5vhqQRXgIAyiuWZW9Xx4QVjF+RAXFg6X1WBkLGpSgvZLukDxfUkfV2MzCQeoMuazm4MUdKJgKIYc9ZI7UdqSHRdbFBnoeGRCRmP446H1ZxBgWki8lORYDv9iYvC4srSqrmULvz00N6DCjeAOlK6bFqB5fsjaajaSgqgF8Gye/pVk2kM3gniyMHEWlLZPdrlD1eQwFz7xhgyeO3eJ4YI41C8L9nGk9rJhfbv+6k3o27TUIN4BUBVm+hmnivUVUZY7v8ggllYTzVQgoudzvZHAAm5uZcUVeP6/obxk1Y354fjwEYEXgKARHWE23p99jEPPrcGVopyJXMqq7J056JjtCYouf+66KpR8PSk5k9hm3E4iqy6j6ypPecY/GInO0vrRMVv7rc+twN9hBRsGCMRpPt76Td7Bj3WASAGKDKDatiowSDhMOi1qZMJuXllbzAAMlhA7E122KBKNZUv1EwwepJ12GMblXDhlb1zmurxQVTVj5cD0HxwvBqNoVr1MwmAaTQYMbAKP1xoAPI+2fdgvt2Q7sLMP6Z4QQcaqlU9cr54Of+G26emqo74xBxTKttrDQ5Qqw2EzsulU9X7tXyvN8uGMAg==';

var isRunning = 1;

clear();

function clear() {
  if(isRunning) {
    setTimeout(clear, 250000);
  } else {
    console.log('Done!');
  }

  axios.get('https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id&startDateTime={start_datetime}', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async resp => {
    if(resp.data.value.length === 0) {
      console.log('Done!');
      isRunning = 0;
      return;
    }
    console.log(resp.data.value.length)
    await resp.data.value.forEach((el,i) => {
      setTimeout(function() {
        axios.delete(`https://graph.microsoft.com/v1.0/me/events/${el.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          console.log('delete office ne', i);
        }).catch(err => {
          console.log('err')
        })
      }, 250*i)
    })
  }).catch(err => {
    console.log(err)
  })
}

// axios.get('https://graph.microsoft.com/v1.0/me/events?$top=1000&$select=id', {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// }).then(async resp => {
//   // console.log('resp', resp.data)
//   await resp.data.value.forEach((el,i) => {
//     setTimeout(function() {
//       axios.delete(`https://graph.microsoft.com/v1.0/me/events/${el.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then(() => {
//         console.log('delete office ne', i);
//       }).catch(err => {
//         console.log('err', err)
//       })
//     }, 250*i)
//   })
//   // res.send('deleted!');
// }).catch(err => {
//   console.log('err', err)
// })
