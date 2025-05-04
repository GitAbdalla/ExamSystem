const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 3000

dotenv.config()
app.get('/', (req, res) => {
  res.send(' branch &&بسم الله توكلنا على الله')
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})
