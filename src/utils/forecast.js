const request = require('request');

const forecast = (long, lat, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURI(lat) + '&lon=' + encodeURI(long) + '&appid=72a4b5d78a1ac08a0672e29cf1557c83';
    request({ url, json: true }, (eror, {body}) => {
        if (eror) {
            callback('Unable to  Connect  to Wheather Service !', undefined)
        } else if (body.eror) {
            callback('body error', undefined)
        } else {
            callback(undefined, 'temp is ' + body.main.temp_max)
        }
    })
}
module.exports = forecast