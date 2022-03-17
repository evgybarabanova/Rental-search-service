const express = require('express');
const { Entry } = require('../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
	try {
		const entries = await Entry.findAll({
			order: [['id', 'DESC']],
		});

		console.log('&&&&&&&&&&', entries);
		res.render('index', { entries }); // ХБС!!!
	} catch (error) {
		res.render('error', {
			message: 'Не удалось получить записи из базы данных',
			error: {},
		});
	}
});


module.exports = router;
