const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()

// define path for exppress config
const PublicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partial')

// setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

// setup to Static file directory to serve
app.use(express.static(PublicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Niko'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This Is Pages About',
        name: 'Sabrina Febriani'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'This is Help Pages',
        name: 'Anas Ali Faisal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.addres) {
        return res.send('you must provide addres term')
    }
    geocode(req.query.addres, (error, { latitude, longtitude, location } ={}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longtitude, (eror, forecatData) => {
            if (eror) {
                return res.send({eror})
            }
            res.send({
                forecast: forecatData,
                location,
                addres:req.query.addres 
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            err: 'you must provide a search term'
        })
    } else {
        res.send({
            product: []
        })
    }
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Niko Agustio',
        errormessage: 'Page Not Found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Niko Agustio',
        errormessage: 'Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Niko Agustio',
        errormessage: 'Page Not Found'
    })
})

app.listen(3000);