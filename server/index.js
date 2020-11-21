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
Application.get('/task-student', Controllers.Task.GetForStudent);
Application.get('/task', Controllers.Task.Get);
Application.post('/task', Controllers.Task.Create);
Application.patch('/task', Controllers.Task.Update);
Application.delete('/task', Controllers.Task.Delete);

// Endpoint Handler for application
Application.get('/application', Controllers.Application.Get);
Application.post('/application', Controllers.Application.Create);
Application.patch('/application', Controllers.Application.Update);
Application.delete('/application', Controllers.Application.Delete);

// Endpoint Handler for assessment
Application.get('/assessment', async (req, res) => res.json(await Controllers.Assessment.getAssessments()));
Application.get('/assessment/job/:id', async (req, res) => res.json(await Controllers.Assessment.getAssessmentsByJobId(req.params.id)));
Application.get('/assessment/:id', async (req, res) => res.json(await Controllers.Assessment.getAssessment(req.params.id)));
Application.post('/assessment', async (req, res) => res.json(await Controllers.Assessment.postAssessment(req.body)));
Application.patch('/assessment/:id', async (req, res) => res.json(await Controllers.Assessment.patchAssessment(req.params.id, req.body)));
Application.delete('/assessment/:id', async (req, res) => res.json(await Controllers.Assessment.deleteAssessment(req.params.id)));

// Start Listening
Application.listen(Config.PORT, () => {
  console.log(`Application listening on port ${Config.PORT}`)
});