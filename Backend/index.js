import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
const app = express()
const port = 3000

import dbConnection from './dbConfig/db.js'

dotenv.config({path: 'config.env'})

dbConnection();


app.get('/', (req, res) => {
  res.send(' branch &&بسم الله توكلنا على الله')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
