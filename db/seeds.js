const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Event = require('../models/event')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return Event.create([
        {
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('June 18, 2020'),
          time: '0600PM',
          location: 'Clapham Common',
          postcode: 'SW4 7AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          requiredPeople: 10
        }, {
          name: 'Field hockey game',
          category: 'Field Hockey',
          date: new Date('February 14, 2020'),
          time: '0300PM',
          location: 'Millfields Park',
          postcode: 'E5 0AR',
          description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.',
          requiredPeople: 10
        }, {
          name: 'Badminton Doubles',
          category: 'Badminton',
          date: new Date('July 18, 2020'),
          time: '1000AM',
          location: 'Highbury Fields',
          postcode: 'N5 2AB',
          description: 'Desperately in need of one person to join our doubles championship! Please bring your own racket.',
          requiredPeople: 2
        }, {
          name: 'Dogwalking',
          category: 'Walking',
          date: new Date('September 18, 2020'),
          time: '1500PM',
          location: 'Canning Town Tube Station',
          postcode: 'E16 1DQ',
          description: 'We\'re going on a 10 mile walk from Canning Town station to the Greenwich Peninsula. Fancy coming?',
          requiredPeople: 10
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('March 20, 2020'),
          time: '1000AM',
          location: 'Blackheath Common',
          postcode: 'SE3 7AP',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          requiredPeople: 15
        }, {
          name: 'Fun Run',
          category: 'Running',
          date: new Date('April 20, 2020'),
          time: '1000AM',
          location: 'Brockwell Park',
          postcode: 'SE24 9BJ',
          description: 'Fun run around Brockwell Park, taking in the views of London',
          requiredPeople: null
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('June 18, 2020'),
          time: '1100PM',
          location: 'Greenwich Park',
          postcode: 'SE10 8QY',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk within the park where we will mix uphill and down hill walking around the park',
          requiredPeople: 10
        }, {
          name: 'Football Match',
          category: 'Football',
          date: new Date('August 20, 2020'),
          time: '1100PM',
          location: 'Tooting Bec Common',
          postcode: 'SW17 8JU',
          description: 'Dont have a team? no problem! Turn up, play and enjoy a game with us. We get a light warm up and stretch done then get into a match',
          requiredPeople: 22
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('May 15, 2020'),
          time: '1200PM',
          location: 'Battersea Park',
          postcode: 'SW11 4NJ',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15
        }
      ])
    })
    .then(createdEvents => console.log(`${'🏃🏻‍♂️ '.repeat(createdEvents.length)} events created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})

