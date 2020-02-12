const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Event = require('../models/event')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          handle: 'ckapak',
          firstName: 'christine',
          surname: 'kapak',
          email: 'ckapak@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          handle: 'testy',
          firstName: 'test',
          surname: 'mctesty',
          email: 'test@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => {
      console.log(`${'😃'.repeat(createdUsers.length)} users created`)
      return Event.create([
        {
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('January 18, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW47AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          latitude: '51.46180',
          longitude: '-0.13831',
          requiredPeople: 10,
          user: createdUsers[0]
        },
        {
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('January 10, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW47AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          latitude: '51.46180',
          longitude: '-0.13831',
          requiredPeople: 10,
          user: createdUsers[0]
        },
        {
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('February 22, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW47AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          latitude: '51.46180',
          longitude: '-0.13831',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Field hockey game',
          category: 'Field Hockey',
          date: new Date('February 14, 2020'),
          time: '03:00 PM',
          location: 'Millfields Park',
          postcode: 'E50AR',
          description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.',
          latitude: '51.55712',
          longitude: '-0.04406',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Badminton Doubles',
          category: 'Badminton',
          date: new Date('February 23, 2020'),
          time: '10:00 AM',
          location: 'Highbury Fields',
          postcode: 'N52AB',
          description: 'Desperately in need of one person to join our doubles championship! Please bring your own racket.',
          latitude: '51.55352',
          longitude: '-0.09818',
          requiredPeople: 2,
          user: createdUsers[0]
        }, {
          name: 'Dogwalking',
          category: 'Walking',
          date: new Date('February 23, 2020'),
          time: '15:00 PM',
          location: 'Canning Town Tube Station',
          postcode: 'N52AB',
          description: 'We\'re going on a 10 mile walk from Canning Town station to the Greenwich Peninsula. Fancy coming?',
          latitude: '51.5535',
          longitude: '-0.09818',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 22, 2020'),
          time: '10:00 AM',
          location: 'Blackheath Common',
          postcode: 'SE37AP',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47444',
          longitude: '0.01261',
          requiredPeople: 15,
          user: createdUsers[0]
        }, {
          name: 'Fun Run',
          category: 'Running',
          date: new Date('February 23, 2020'),
          time: '10:00 AM',
          location: 'Brockwell Park',
          postcode: 'SE249BJ',
          description: 'Fun run around Brockwell Park, taking in the views of London.',
          latitude: '51.44637',
          longitude: '-0.10615',
          requiredPeople: null,
          user: createdUsers[0]
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('February 29, 2020'),
          time: '11:00 AM',
          location: 'Greenwich Park',
          postcode: 'SE108QY',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk within the park where we will mix uphill and down hill walking around the park',
          latitude: '51.47300',
          longitude: '0.00298',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Football Match',
          category: 'Football',
          date: new Date('February 29, 2020'),
          time: '12:00 PM',
          location: 'Tooting Bec Common',
          postcode: 'SW178JU',
          description: 'Dont have a team? no problem! Turn up, play and enjoy a game with us. We get a light warm up and stretch done then get into a match',
          requiredPeople: 22,
          latitude: '',
          longitude: '',
          user: createdUsers[0]
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '12:00 PM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15,
          latitude: '51.43412',
          longitude: '-0.14887',
          user: createdUsers[0]
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('February, 2020'),
          time: '11:00 PM',
          location: 'Streatham Common',
          postcode: 'SW163BX',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk within the park where we will mix uphill and down hill walking around the park',
          requiredPeople: 10,
          latitude: '51.4762',
          longitude: '-0.16083',
          user: createdUsers[0]
        }, {
          name: 'Football Match',
          category: 'Football',
          date: new Date('March 01, 2020'),
          time: '11:00 AM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'Dont have a team? no problem! Turn up, play and enjoy a game with us. We get a light warm up and stretch done then get into a match ',
          requiredPeople: 22,
          latitude: '51.44743',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('June 15, 2020'),
          time: '12:00 PM',
          location: 'Wimbledon Park',
          postcode: 'SW198AU',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15,
          latitude: '51.4377',
          longitude: '-0.20280',
          user: createdUsers[0]
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('March 01, 2020'),
          time: '06:00 PM',
          location: 'Southwark Park',
          postcode: 'SE162TX',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class',
          requiredPeople: 15,
          latitude: '51.49533',
          longitude: '-0.05355',
          user: createdUsers[0]
        }, {
          name: 'Tag Rugby For Beginners',
          category: 'Rugby',
          date: new Date('February 15, 2020'),
          time: '02:00 PM',
          location: 'Victoria Park',
          postcode: 'E35TB',
          description: 'Interested in Rugby? come and learn the game and how it works without worrying about full contact',
          requiredPeople: 30,
          latitude: '51.53325',
          longitude: '-0.04070',
          user: createdUsers[0]
        }, {
          name: 'Run Club',
          category: 'Running',
          date: new Date('February 16, 2020'),
          time: '10:00 AM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'If you enjoy running but not alone then this is the place for you. Come and join our group of runners',
          requiredPeople: 20,
          latitude: '51.44743',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Run Run Run',
          category: 'Running',
          date: new Date('February 18, 2020'),
          time: '08:00 PM',
          location: 'Tooting Bec Station',
          postcode: 'SW177AA',
          description: 'If you enjoy running but not alone then this is the place for you. Come and join one of our group of runners where you can do 5k or 10k. Starting point and finishing point will be at the station',
          requiredPeople: 20,
          latitude: '51.43621',
          longitude: '-0.15924',
          user: createdUsers[0]
        }, {
          name: 'Lunchtime Burst',
          category: 'Running',
          date: new Date('February 17, 2020'),
          time: '12:00 PM',
          location: 'Canary Wharf Station',
          postcode: 'E145NY',
          description: 'Like running but you dont want to run in the evenings? come and join us for a 5k run. comeplete a runa nd get back to your text all within a hour!',
          requiredPeople: 20,
          latitude: '51.50308',
          longitude: '-0.01860',
          user: createdUsers[0]
        }, {
          name: 'Football For Fun',
          category: 'Football',
          date: new Date('February 22, 2020'),
          time: '03:00 PM',
          location: 'Finsbury Park',
          postcode: 'N41EE',
          description: 'Join us for a fun game of football without the commitment.',
          requiredPeople: 22,
          latitude: '51.57462',
          longitude: '-0.10335',
          user: createdUsers[0]
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '12:00 PM',
          location: 'Blackheath Commmon',
          postcode: 'SE37AP',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15,
          latitude: '51.47444',
          longitude: '0.01261',
          user: createdUsers[0]
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('February 23, 2020'),
          time: '01:00 PM',
          location: 'Greenwich Park',
          postcode: 'SE108QY',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk within the park where we will mix uphill and down hill walking around the park',
          requiredPeople: 10,
          latitude: '51.47300',
          longitude: '0.00298',
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 22, 2020'),
          time: '10:00 AM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 26, 2020'),
          time: '03:00 PM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 25, 2020'),
          time: '03:00 PM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 22, 2020'),
          time: '10:00 AM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 29, 2020'),
          time: '08:00 AM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 29, 2020'),
          time: '03:00 PM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '03:00 PM',
          location: 'Victoria Park',
          postcode: 'E35TB',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class',
          latitude: '51.53325',
          longitude: '-0.04070',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '03:00 PM',
          location: 'Battersea Park',
          postcode: 'SW114NJ',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class',
          latitude: '51.47623',
          longitude: '-0.16083',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Dogwalking',
          category: 'Walking',
          date: new Date('February 29, 2020'),
          time: '03:00 PM',
          location: 'Tooting Bec Common',
          postcode: 'SW177AA',
          description: 'Come and join us on our leap year walk where we will be walking round the radius of the common and going through Balham triangle to end up in Clapham Common',
          latitude: '51.43621',
          longitude: '-0.15924',
          requiredPeople: 10,
          user: createdUsers[0]
        }, {
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('February 29, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW47AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          requiredPeople: 18,
          latitude: '51.46180',
          longitude: '-0.13831',
          user: createdUsers[0]
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('February 29, 2020'),
          time: '12:00 PM',
          location: 'Millfields Park',
          postcode: 'E50AR',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 15,
          latitude: '51.55712',
          longitude: '-0.04406',
          user: createdUsers[0]
        }, {
          name: 'Field hockey game',
          category: 'Field Hockey',
          date: new Date('February 29, 2020'),
          time: '01:00 PM',
          location: 'Blackheath Common',
          postcode: 'SE37AP',
          description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.',
          requiredPeople: 10,
          latitude: '51.47444',
          longitude: '0.01261',
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 29, 2020'),
          time: '10:00 AM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          requiredPeople: 10,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Beginners Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '11:00 AM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'If you are new to yoga and dont know where to start come to our beginners class where you can learn with like minded people and start your journey',
          requiredPeople: 10,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Bootcamp',
          category: 'Bootcamp',
          date: new Date('February 22, 2020'),
          time: '11:30 AM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'This boot camp will be mainly working on plyometric based exercises that focuses on bodyweight to increase strength and increase heart rate',
          requiredPeople: 10,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('February 22, 2020'),
          time: '11:45 AM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'Casual game of football on Dulwich Park, located by the changing rooms. Everybody and anybody is welcome!',
          requiredPeople: 22,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Dogwalking',
          category: 'Walking',
          date: new Date('February 22, 2020'),
          time: '12:00 PM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'Come and join us on our walk where we will be walking round the radius of the park',
          requiredPeople: 10,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Advanced Yoga',
          category: 'Yoga',
          date: new Date('February 22, 2020'),
          time: '01:00 PM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'For experienced people that want to push themselves even further. Come and join us for this advanced class',
          requiredPeople: 10,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('February 22, 2020'),
          time: '01:30 PM',
          location: 'Dulwich Park',
          postcode: 'SE217EB',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk where we will be walking around the park',
          requiredPeople: 10,
          latitude: '51.4474',
          longitude: '-0.07614',
          user: createdUsers[0]
        }, {
          name: 'Power walking',
          category: 'Walking',
          date: new Date('February 23, 2020'),
          time: '01:30 PM',
          location: 'Victoria park',
          postcode: 'E35TB',
          description: 'For people not comfotable with running and would like to still get some light cardio come and join us on our long walk where we will be walking around the park',
          requiredPeople: 10,
          latitude: '51.53325',
          longitude: '-0.04070',
          user: createdUsers[0]
        }

      ])
    })
    .then(createdEvents => console.log(`${'🏃🏻‍♂️ '.repeat(createdEvents.length)} events created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})

