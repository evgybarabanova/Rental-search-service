const express = require('express');

const {
	createUserAndSession,
	checkUserAndSession,
	destroySession,
} = require('../controllers/authControllers');

const router = express.Router();

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
