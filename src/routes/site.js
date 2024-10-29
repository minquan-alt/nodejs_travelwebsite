const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController.js');

router.use('/', siteController.home);

module.exports = router;
