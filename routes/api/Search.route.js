const express = require('express');
const search_file = require('../../controllers/api/Search.controller');

const router = express.Router();

router.post('/', search_file.search_File);
router.get('/', search_file.get_all);

module.exports = router;