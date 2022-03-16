const router = require('express').Router();

const {
	createUserAndSession,
	checkUserAndSession,
	destroySession,
} = require('../controllers/authControllers');

// Регистрация пользователя
 router.get('/registration', (req, res) => {
 	res.render('user/registration');
 });

router.post('/registration', createUserAndSession);

// Вход
router.get('/login', (req, res) => {
	res.render('user/login');
});

router.post('/login', checkUserAndSession);

// Выход
router.get('/logout', destroySession);

module.exports = router;
