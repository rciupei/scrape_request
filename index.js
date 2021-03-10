var request = require('request');
const Audic = require("audic")


var options = {
  'method': 'POST',
  'url': 'to_be_filled',
  'headers': {
    'Cookie': 'SESSION=to_be_filled',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "countyID": 12, "localityID": null, "name": null, "masterPersonnelCategoryID": -2, "identificationCode": "to_be_filled--cnp", "personnelCategoryID": 14
  })

};

//Cluj 12



let isplaying = false;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

setInterval(() => {

  setTimeout(() => {
    console.log(new Date(Date.now()));
    request(options, function (error, response) {
      console.log(error);
      // console.log(response.body);

      try {
        let parsed = JSON.parse(response.body)
        let slots = parsed.content.map(item => ({ slots: item.availableSlots, name: item.name }))
        // console.log(parsed.content.map(item => ({ slots: item.availableSlots, name: item.name })));
        console.log(slots);
        slots.map(item => {
          if (item.slots !== 0) {
            console.log("place found in ", item.name);
            if (!isplaying) {
              new Audic("Thunderstruck.mp3").play()
            }
            isplaying = true;

          }
        })
      } catch (error) {
        new Audic("sample1.mp3").play()
        console.log("error");
      }
    })
  }, getRandomArbitrary(1000, 10000));

}, 60000);

