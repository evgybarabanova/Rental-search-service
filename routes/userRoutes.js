const router = require('express').Router();

const {
	createUserAndSession,
	checkUserAndSession,
	destroySession,
} = require('../controllers/authControllers');

// Регистрация пользователя
 router.get('/signup', (req, res) => {
 	res.render('signup');
 });

router.post('/signup', createUserAndSession);

// Вход
router.get('/signin', (req, res) => {
	res.render('signin');
});

router.post('/signin', checkUserAndSession);

// Выход
router.get('/logout', destroySession);

module.exports = router;
