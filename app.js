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
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');
const entriesRoutes = require('./routes/entriesRoutes');
const basketRoutes = require('./routes/basketRoutes');


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
// app.set('views', path.join(process.cwd(), 'views'));
// partials
hbs.registerPartials(path.join(process.cwd(), 'views', 'partials'));
// middlewares
// app.use('/Images', express.static('./Images'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));


// res.locals
app.use((req, res, next) => {

	res.locals.user = req.session?.user;

	console.log("\n\x1b[33m", 'req.session.user :', req.session.user);
	console.log("\x1b[35m", 'res.locals.user:', res.locals.user);
	next();
});

// routes
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/entry', entryRoutes);
app.use('/entries', entriesRoutes);
app.use('/basket', basketRoutes);
app.use((req, res, next) => {
	req.isAdmin = true;
	next();
});

// app.get('/entries/:id', (req, res) => {
//   //res.redirect('./entry/entries/:id');
//   const { id } = req.params;
//   res.send('hello')
// })



app.listen(PORT, () => {
	console.log(`It's all good in da hood: ${PORT}`);
});
