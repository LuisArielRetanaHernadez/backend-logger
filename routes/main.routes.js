'use strict';

const router = require('express').Router();
const prefix = 'logs';

const controller = require('../controllers/main.controller');

// middleware
const { authJWT } = require('../middlewares/authJWT');
const AuthorizationService = require('../middlewares/authorizations.middleware')

router.get(`/${prefix}/`, controller.all);
router.post(`/${prefix}/`, controller.create);
router.get(`/${prefix}/:id`, authJWT, AuthorizationService.protect, AuthorizationService.protectById, controller.info);
router.put(`/${prefix}/:id`, authJWT, AuthorizationService.protect, AuthorizationService.protectById, controller.update);
router.delete(`/${prefix}/:id`, authJWT, AuthorizationService.protect, AuthorizationService.protectById, controller.delete);
router.post(`/${prefix}/login`, authJWT, AuthorizationService.protect, controller.login);

module.exports = router;