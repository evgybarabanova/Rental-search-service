const express = require('express')
const router = express.Router();
const jsonBodyParser = express.json()

const {
	createUserAndSession,
	checkUserAndSession,
	destroySession,
} = require('../controllers/authControllers');

// Регистрация пользователя
 router.get('/registration', (req, res) => {
 	res.render('user/registration');
 });


router.post('/registration', jsonBodyParser, createUserAndSession);

// Вход
router.get('/login', (req, res) => {
	res.render('user/login');
});

router.post('/login', jsonBodyParser, checkUserAndSession);

// Выход
router.get('/logout', destroySession);

module.exports = router;
