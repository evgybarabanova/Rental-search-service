const router = require('express').Router();
const upload = require('../controllers/multerController')
const { isAuth } = require('../middlewares/userMiddlewares')
const { Entry, User, Basket, Image } = require('../db/models');

// ВСЕ ОБЪЯВЛЕНИЯ
router.get('/', async (req, res) => {
	try {

		const entries = await Entry.findAll({
			include: Image,
			order: [['id', 'DESC']],
			raw: true,
		});

		// console.log("🚀 ~ file: entryRoutes.js ~ line 12 ~ router.get ~ entries", entries)
		const arr = entries.map((e) => {
			e.myImage = e['Images.image']
			return e
		})
		console.log("🚀 ~ file: entryRoutes.js ~ line 15 ~ router.get ~ arr", arr)
		res.render('index', { entries });
	} catch (error) {
		res.render('error', {
			message: 'Не удалось получить записи из базы данных: ' + error.message,
			error,
		});
	}
});

// ДОБАВИТЬ ОБЪЯВЛЕНИЕ
router.get('/new', isAuth, (req, res) => {
	res.render('entry/forrent');
});

router.post('/new', upload, async (req, res) => {
	let entry
	try {
		entry = await Entry.create({
			title: req.body.title,
			body: req.body.body,
			type: req.body.type,
			rooms: req.body.rooms,
			geo: req.body.geo,
			user_id: req.session.user.id
		})

		for (let i = 0; i < req.files.length; i++) {
			const image = await Image.create({ entry_id: entry.id, image: req.files[i].filename })
		}

		// console.log('🚀 ~ file: entryRoutes.js ~ line 61 ~ router.post ~ req.body', req.files);

		res.redirect(`/entry/${entry.id}`);

	} catch (error) {
		res.render('error', {
			message: 'Не удалось создать объявление',
			error: {},
		});
	}


});

// ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ
router.get('/:id', async (req, res) => {
	let entry;
	let images;
	let isAuthor;
	try {
		entry = await Entry.findByPk(req.params.id);
		images = await Image.findAll({ where: { entry_id: entry.id }, raw: true });
		isAuthor = entry.user_id === req.session.user.id || req.session.user.role === 'admin'
		res.render('entry/entry', { entry, isAuthor, images });
	} catch (error) {
		res.render('error', {
			message: 'Не удалось получить запись из базы данных',
			error: {},
		});
	}
});

module.exports = router;
