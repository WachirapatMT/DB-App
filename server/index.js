const path = require("path")

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const Express = require('express')
const CORS = require('cors')

const Controllers = require('./controllers');

// initialize application
const Application = Express()
const Config = require('./config.js');

// for json body request
Application.use(Express.json())
Application.use(Express.urlencoded({extended: true}))

// Cross Origin Handler
Application.use(CORS())

// Endpoint Handler for application
Application.get('/', Controllers.HelloWorld.GetHelloMessage);

// Endpoint Handler for task
Application.get('/task', Controllers.Task.Get);
Application.post('/task', Controllers.Task.Create);
Application.patch('/task', Controllers.Task.Update);
Application.delete('/task', Controllers.Task.Delete);

// Endpoint Handler for application
Application.get('/application', Controllers.Application.Get);
Application.post('/application', Controllers.Application.Create);
Application.delete('/application', Controllers.Application.Delete);

// Start Listening
Application.listen(Config.PORT, () => {
  console.log(`Application listening on port ${Config.PORT}`)
});