//Load enviroment
require('dotenv').config()
//Load portfolios
const portfolios = require('./data/portfolios.json')



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
    response.status(200).json(portfolios)
})

//Handle errors by middlewares
app.use(notFound)
app.use(handleErrors)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})