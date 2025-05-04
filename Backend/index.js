const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const app = express()
const port = 3000

const dbConnection = require('./dbConfig/db')

dotenv.config({path: 'config.env'})

dbConnection();


app.get('/', (req, res) => {
  res.send(' branch &&بسم الله توكلنا على الله')
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})
