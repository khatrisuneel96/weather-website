const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5eb3659d19c05cb4dd07240df091f931&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body })=>{
        if(error){
            callback('Unable to connect with location services!', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '! This is Currently ' + body.current.temperature + ' degrees out, and it feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity + '% There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast