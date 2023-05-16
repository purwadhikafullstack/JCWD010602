const express = require('express');
const router = express.Router();
const { tenantAuthController } = require('../controllers');

router.post('/v1', validate2, tenantAuthController.register);
router.post('/v2', tenantAuthController.login)