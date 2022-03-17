const express = require('express');
const { Entry } = require('../db/models');

const router = express.Router();


router.get('/', (req, res) => {
	res.redirect('/entry');
});


module.exports = router;
