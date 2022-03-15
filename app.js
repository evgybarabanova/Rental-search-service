const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;

// check db
const dbConnectionCheck = require('./helpers/dbConnectionCheck');

dbConnectionCheck();

// routes import
const indexRoutes = require('./routes/indexRoutes');

const sessionConfig = {
	name: 'sid',
	store: new FileStore(),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 1000 * 60 * 60 * 24,
		httpOnly: true,
	},
};

// view setup engine
app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'views'));
// partials
hbs.registerPartials(path.join(process.cwd(), 'views', 'partials'));
// middlewares
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// res.locals
const sessionMiddle = (req, res, next) => {
	res.locals.user = req.session?.user;

	next();
};

app.use(sessionMiddle);

// routes
app.use('/', indexRoutes);

app.listen(PORT, () => {
	console.log(`It's all good in da hood: ${PORT}`);
});