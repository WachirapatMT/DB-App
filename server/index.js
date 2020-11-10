const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('./controllers/temp.controllers')(app)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
});