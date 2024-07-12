const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
const cors = require('cors')

// app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/desserts', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data')
      return
    }
    res.json(JSON.parse(data))
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})