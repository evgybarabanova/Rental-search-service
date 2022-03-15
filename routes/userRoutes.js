const router = require('express').Router();

const {
	createUserAndSession,
	checkUserAndSession,
	destroySession,
} = require('../controllers/authControllers');

// Регистрация пользователя
router.get('/registration', (req, res) => {
	res.render(''); // ХБС!!!!!
});

router.post('/registration', createUserAndSession);

// Вход
router.get('/login', (req, res) => {
	res.render(''); // ХБС!!!!!
});

router.post('/login', checkUserAndSession);

// Выход
router.get('/logout', destroySession);

module.exports = router;
