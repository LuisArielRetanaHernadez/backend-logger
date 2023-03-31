'use strict';

const router = require('express').Router();
const prefix = 'logs';

const controller = require('../controllers/main.controller');

// middleware
const { authJWT } = require('../middlewares/authJWT');
const AuthorizationService = require('../middlewares/authorizations.middleware')

// joi
const { validator } = require('../joi/validator.joi')
const { aplicationsJoi } = require('../joi/schema/log/aplications.joi')
const { logsJoi } = require('../joi/schema/log/logs.joi')

router.get(`/${prefix}/`, controller.all);
router.post(`/${prefix}/`, validator(aplicationsJoi), controller.create);
router.post(`/${prefix}/create`, authJWT, AuthorizationService.protect, validator(logsJoi), controller.createLog);

router.get(`/${prefix}/:id`, authJWT, AuthorizationService.protect, AuthorizationService.protectLogById, controller.info);
router.put(`/${prefix}/:id`, authJWT, AuthorizationService.protect, AuthorizationService.protectLogById, controller.update);
router.delete(`/${prefix}/:id`, authJWT, AuthorizationService.protect, AuthorizationService.protectLogById, controller.delete);

router.post(`/${prefix}/login`, validator(aplicationsJoi), controller.login);

module.exports = router;