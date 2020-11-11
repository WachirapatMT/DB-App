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

// Endpoint Handler
Application.get('/', Controllers.HelloWorld.GetHelloMessage);

// Start Listening
Application.listen(Config.PORT, () => {
  console.log(`Application listening on port ${Config.PORT}`)
});