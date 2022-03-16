const router = require('express').Router();
const upload = require('../controllers/multerController')
const { Entry, User, Basket, Image } = require('../db/models');

// ВСЕ ОБЪЯВЛЕНИЯ
router.get('/', async (req, res) => { // ПУТЬ
	try {
		const entries = await Entry.findAll({
			order: [['id', 'DESC']],
		});
		res.render('НАЙТИ ЖИЛИЩЕ', { entries }); // ХБС!!!
	} catch (error) {
		res.render('error', {
			message: 'Не удалось получить записи из базы данных',
			error: {},
		});
	}
});

// ДОБАВИТЬ ОБЪЯВЛЕНИЕ
router.get('/new', (req, res) => {
	res.render('entry/forrent');
});

router.post('/new', upload, async (req, res) => {

	try {
		const entry = await Entry.create({
			title: req.body.title,
			body: req.body.body,
			type: req.body.type,
			rooms: req.body.rooms,
			geo: req.body.geo,
		})

		for (let i = 0; i < req.files.length; i++) {
			const image = await Image.create({ entry_id: entry.id, image: req.files[i].filename })
			console.log('IMG -->', image);
		}
		console.log('NEW ENTRY >>>', entry);

		// console.log('🚀 ~ file: entryRoutes.js ~ line 61 ~ router.post ~ req.body', req.files);

		res.send('НОВОЕ ОБЪЯВЛЕНИЕ ===>>>', entry);

	} catch (error) {
		res.render('error', {
			message: 'Не удалось создать объявление',
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
});

module.exports = router;
