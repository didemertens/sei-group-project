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
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW4 7AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          requiredPeople: 10
        }, {
          name: 'Field hockey game',
          category: 'Field Hockey',
          date: new Date('February 14, 2020'),
          time: '03:00 PM',
          location: 'Millfields Park',
          postcode: 'E5 0AR',
          description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.',
          requiredPeople: 10
        }, {
          name: 'Badminton Doubles',
          category: 'Badminton',
          date: new Date('July 18, 2020'),
          time: '10:00 AM',
          location: 'Highbury Fields',
          postcode: 'N5 2AB',
          description: 'Desperately in need of one person to join our doubles championship! Please bring your own racket.',
          requiredPeople: 2
        }, {
          name: 'Dogwalking',
          category: 'Walking',
          date: new Date('September 18, 2020'),
          time: '15:00 PM',
          location: 'Canning Town Tube Station',
          postcode: 'E16 1DQ',
          description: 'We\'re going on a 10 mile walk from Canning Town station to the Greenwich Peninsula. Fancy coming?',
          requiredPeople: 10
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('March 20, 2020'),
          time: '10:00 AM',
          location: 'Blackheath Common',
          postcode: 'SE3 7AP',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          requiredPeople: 15
        }, {
          name: 'Fun Run',
          category: 'Running',
          date: new Date('April 20, 2020'),
          time: '10:00 AM',
          location: 'Brockwell Park',
          postcode: 'SE24 9BJ',
          description: 'Fun run around Brockwell Park, taking in the views of London',
          requiredPeople: null
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('June 18, 2020'),
          time: '11:00 PM',
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
          time: '12:00 PM',
          location: 'Battersea Park',
          postcode: 'SW11 4NJ',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('June 14, 2020'),
          time: '11:00 PM',
          location: 'Streatham Common',
          postcode: 'SW16 3BX',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk within the park where we will mix uphill and down hill walking around the park',
          requiredPeople: 10
        }, {
          name: 'Football Match',
          category: 'Football',
          date: new Date('July 1, 2020'),
          time: '11:00 PM',
          location: 'Dulwich Park',
          postcode: 'SE21 7EB',
          description: 'Dont have a team? no problem! Turn up, play and enjoy a game with us. We get a light warm up and stretch done then get into a match ',
          requiredPeople: 22
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('June 15, 2020'),
          time: '12:00 PM',
          location: 'Wimbledon Park',
          postcode: 'SW19 8AU ',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey'  ,
          requiredPeople: 15
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('March 25, 2020'),
          time: '06:00 PM',
          location: 'Southwark Park',
          postcode: 'SE16 2TX',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class'  ,
          requiredPeople: 15
        }, {
          name: 'Tag Rugby For Beginners',
          category: 'Rugby',
          date: new Date('February 15, 2020'),
          time: '02:00 PM',
          location: 'Victoria Park',
          postcode: 'E3 5TB',
          description: 'Interested in Rugby? come and learn the game and how it works without worrying about full contact'  ,
          requiredPeople: 30
        }, {
          name: 'Run Club',
          category: 'Running',
          date: new Date('February 16, 2020'),
          time: '10:00 AM',
          location: 'Dulwich Park',
          postcode: 'SE21 7EB',
          description: 'If you enjoy running but not alone then this is the place for you. Come and join our group of runners'  ,
          requiredPeople: 20
        }, {
          name: 'Run Run Run',
          category: 'Running',
          date: new Date('February 18, 2020'),
          time: '08:00 PM',
          location: 'Tooting Bec Station',
          postcode: 'SW17 7AA',
          description: 'If you enjoy running but not alone then this is the place for you. Come and join one of our group of runners where you can do 5k or 10k. Starting point and finishing point will be at the station'  ,
          requiredPeople: 20
        }, {
          name: 'Lunchtime Burst',
          category: 'Running',
          date: new Date('February 17, 2020'),
          time: '12:00 PM',
          location: 'Canary Wharf Station',
          postcode: 'E14 5NY',
          description: 'Like running but you dont want to run in the evenings? come and join us for a 5k run. comeplete a runa nd get back to your text all within a hour!'  ,
          requiredPeople: 20
        }, {
          name: 'Football For Fun',
          category: 'Football',
          date: new Date('February 22, 2020'),
          time: '03:00 PM',
          location: 'Finsbury Park',
          postcode: 'N4 1EE',
          description: 'Join us for a fun game of football without the commitment.'  ,
          requiredPeople: 22
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '12:00 PM',
          location: 'Blackheath Commmon',
          postcode: 'SE3 7AP',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15
        },{
          name: 'Power walking',
          category: 'Walking',
          date: new Date('February 23, 2020'),
          time: '01:00 PM',
          location: 'Greenwich Park',
          postcode: 'SE10 8QY',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk within the park where we will mix uphill and down hill walking around the park',
          requiredPeople: 10
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 22, 2020'),
          time: '10:00 AM',
          location: 'Battersea Park',
          postcode: 'SW11 4NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          requiredPeople: 10
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '03:00 PM',
          location: 'Victoria Park',
          postcode: 'E3 5TB',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class'  ,
          requiredPeople: 10
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '03:00 PM',
          location: 'Battersea Park',
          postcode: 'SW11 4NJ',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class'  ,
          requiredPeople: 10
        }, {
          name: 'Dogwalking',
          category: 'Walking',
          date: new Date('February 29, 2020'),
          time: '03:00 PM',
          location: 'Tooting Bec Common',
          postcode: 'SW17 7AA',
          description: 'Come and join us on our leap year walk where we will be walking round the radius of the common and going through Balham triangle to end up in Clapham Common',
          requiredPeople: 10
        },{
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('February 29, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW4 7AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          requiredPeople: 10
        },{
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('February 29, 2020'),
          time: '12:00 PM',
          location: 'Millfields Park',
          postcode: 'E5 0AR',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15
        }, {
          name: 'Field hockey game',
          category: 'Field Hockey',
          date: new Date('February 29, 2020'),
          time: '01:00 PM',
          location: 'Blackheath Common',
          postcode: 'SE3 7AP',
          description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.',
          requiredPeople: 10
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 29, 2020'),
          time: '10:00 AM',
          location: 'Dulwich Park',
          postcode: 'SE21 7EB',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          requiredPeople: 10
        }
      ])
    })
    .then(createdEvents => console.log(`${'🏃🏻‍♂️ '.repeat(createdEvents.length)} events created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})

