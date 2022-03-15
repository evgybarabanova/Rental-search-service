const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	const message = '';
	res.render('index', { message });
});

module.exports = router;
