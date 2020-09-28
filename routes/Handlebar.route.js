const express = require('express');
const Handlebars = require('../controllers/Handlebars.controller');

const router = express.Router();

router.get('/', Handlebars.Handlebars_get_all);

module.exports = router;