const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const chalk = require('chalk')
//Defines paths for expressconfig
const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials'
)

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Brandon Smith'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Brandon Smith'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Here\'s some help',
    title: 'Help',
    name: 'Brandon Smith'
  })
})
// const aboutPage = path.join(__dirname, '../public/about.html')
// app.use(express.static(aboutPage))
// const helpPage = path.join(__dirname, '../public/help.html')

// app.get(helpPage, (req, res) => {
//   res.send([{
//     name: 'Brandon'
//   }, {
//     name: 'Andrew'
//   }
//   ])
// })


// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send ({
      error: `You must give your HOUSE location bitch`
    })
  }
  
  geocode(req.query.address, (error, { latitude , longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({  
        forecast: forecastData, location,
        address: req.query.address
      })
    })
  })
  
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    helpError: 'Help Article not found',
    name: 'Brandon Smith'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    generalError: 'Page not found',
    name: 'Brandon Smith'
  })
})
//starts up server
app.listen(3000, () => {
  console.log('Server is up on port 80.');
})
