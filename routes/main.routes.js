'use strict';

const router = require('express').Router();
const prefix = 'logs';

const controller = require('../controllers/main.controller');

// middleware
const { authJWT } = require('../middlewares/authJWT');
const authorization = require('../schema/authorizations.schema');

router.get(`/${prefix}/`, controller.all);
router.post(`/${prefix}/`, controller.create);
router.get(`/${prefix}/:id`, authJWT, authorization, controller.info);
router.put(`/${prefix}/:id`, controller.update);
router.delete(`/${prefix}/:id`, controller.delete);
router.post(`/${prefix}/login`, controller.login);

module.exports = router;