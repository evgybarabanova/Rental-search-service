const bcrypt = require('bcrypt');
const { User } = require('../db/models');

exports.isValid = (req, res, next) => {
  const { name, password, email } = req.body;
  if(name && password && email) next();
  else res.status(401).end();
};

exports.createUserAndSession = async (req, res) => {
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
			req.session.user = { id: user.id, name: user.username, role: user.role };
			res.sendStatus(215);
		} else {
			res.send('Такой email уже есть в базе');
		}
	} catch (error) {
		res.sendStatus(500);
	}
};

exports.checkUserAndCreateSession = async (req, res) => {
	try {
		const user = await User.findOne({ where: { email: req.body.email } });

		if (user) {
			const passCheck = await bcrypt.compare(req.body.password, user.password);
			if (passCheck) {
				req.session.user = { id: user.id, name: user.username, role: user.role };
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

exports.destroySession = async (req, res) => {
	if (req.session.user) {
		await req.session.destroy();
		res.clearCookie('sid');
		res.redirect('/');
	} else {
		res.redirect('/');
	}
};

exports.renderSignInForm = (req, res) => res.render('signin', { isSignin: true });

exports.renderSignUpForm = (req, res) => res.render('signup', { isSignup: true });


