const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchController');
router.use('/', searchController.index);

module.exports = router;
