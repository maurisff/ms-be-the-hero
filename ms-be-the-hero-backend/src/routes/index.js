const express = require('express');
const controllerOngs = require('../controllers/ongController')
const controllerIncidents = require('../controllers/incidentController')
const controllerProfile = require('../controllers/profileController')
const controllerSession = require('../controllers/sessionController')

const routes = express.Router();


routes.post('/ongs', controllerOngs.create)
routes.get('/ongs', controllerOngs.list)

routes.post('/incidents', controllerIncidents.create)
routes.get('/incidents', controllerIncidents.list)
routes.delete('/incidents/:id', controllerIncidents.delete)


routes.get('/profile', controllerProfile.list)
routes.post('/sessions', controllerSession.create)

module.exports = routes; 