const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { Entry, User, Basket } = require('../db/models');

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

// ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ

// * Подключение multer хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files formate to upload');
  },
}).array('images', 10);


router.get('/lalala', (req, res, next) => {
  res.render('lol')
})
router.post('/new', upload, async (req, res) => {
  console.log('🚀 ~ file: entryRoutes.js ~ line 61 ~ router.post ~ req.body', req.files);
  res.sendStatus(200);
});
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
