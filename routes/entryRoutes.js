const router = require('express').Router();
const { Entry, User, Basket } = require('../db/models');

// ВСЕ ОБЪЯВЛЕНИЯ
router.get('/', async (req, res) => {             // ПУТЬ
	try {
		const entries = await Entry.findAll({
			order: [['id', 'DESC']],
		});
		res.render('НАЙТИ ЖИЛИЩЕ', { entries })         // ХБС!!!
	} catch (error) {
		res.render('error', {
			message: 'Не удалось получить записи из базы данных',
			error: {},
		});
	}
});

// ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ
router.get('/:id', async (req, res) => {
	try {
		const entry = await Entry.findByPk(req.params.id);
		res.render('', { entry });
	} catch (error) {
		res.render('error', {
			message: 'Не удалось получить запись из базы данных',
			error: {},
		});
	}
})

module.exports = router;
