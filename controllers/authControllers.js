const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const createUserAndSession = async (req, res) => {
	const {
		name,
		email,
		password,
	} = req.body;

	const hash = await bcrypt.hash(password, 10);

	try {
		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				username: name,
				password: hash,
				email,
				role: 'test',
			},
			raw: true,
		});

		if (created) {
			req.session.user = { id: user.id, name: user.username };
			res.send(user); // Переписать на ответ статусом на фронт когда будут там фетчи
		} else {
			res.send('Такой email уже есть в базе');
		}
	} catch (error) {
		res.send('500'); // Переписать на ответ статусом на фронт когда будут там фетчи
	}
};

const checkUserAndSession = async (req, res) => {
	try {
		const user = await User.findOne({ where: { email: req.body.email } });
		console.log('USER>>>>>', user);
		if (user) {
			const passCheck = await bcrypt.compare(req.body.password, user.password);
			if (passCheck) {
				req.session.user = { id: user.id, name: user.username };
				res.send('Юзер зашел'); // Переписать на ответ статусом на фронт когда будут там фетчи
			} else {
				res.send('Вы ввели неправильный пароль...');
			}
		} else {
			res.send('Такого пользователя не существует. Зарегистрирутесь.');
		}
	} catch (error) {
		res.send(500); // Переписать на ответ статусом на фронт когда будут там фетчи
	}
};

const destroySession = async (req, res) => {
	if (req.session.user) {
		await req.session.destroy();
		res.clearCookie('sid');
		res.redirect('/');
	} else {
		res.redirect('/');
	}
};

module.exports = { createUserAndSession, checkUserAndSession, destroySession };
