const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suneel Khatri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Suneel Khatri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Suneel Khatri',
        msg: 'Some helpful text!'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!req.query.address) {
       return res.send({
            error: 'No address found. Please provide address.'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {})=>{
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     address: req.query.address
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        error: 'Help artical not found',
        title: '404',
        name: 'Suneel Khatri'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        error: 'Page not Found',
        title: '404',
        name: 'Suneel Khatri'
    })
})

app.listen(3000, ()=> console.log('Server Connected'))