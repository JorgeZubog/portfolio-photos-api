//Load enviroment
require('dotenv').config()
//Load portfolios
const portfoliosJson = require('./data/portfolios_photos.json')
const homeJson = require('./data/home_photos.json')



const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./middleware/loggerMiddleware')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')


app.use(cors())
app.use(express.json())

app.use(logger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/portfolios', (request, response) => {
    let portfolios = [];
    for (var key in portfoliosJson) {
        if (portfoliosJson.hasOwnProperty(key)) {
            var value = portfoliosJson[key];
            const containsPhotos = value.files.length > 0

            const card = {
                id: value.id,
                title: value.name,
                description: "description",
                src: containsPhotos ? value.files[0].direct_url : "",
                date: containsPhotos ? value.files[0].server_modified : Date.now()
            }
            portfolios.push(card)
        }
    }
    response.status(200).json(portfolios)
})

app.get('/api/home', (request, response) => {
    let homePhotos = [];
    const photos = homeJson['/home'].files
    for (var key in photos) {
        if (photos.hasOwnProperty(key)) {
            var value = photos[key];
            const photo = {
                id: value.id,
                name: value.name,
                src: value.direct_url,
                date: value.server_modified
            }
            homePhotos.push(photo)
        }
    }
    response.status(200).json(homePhotos)
})

//Handle errors by middlewares
app.use(notFound)
app.use(handleErrors)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})