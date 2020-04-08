const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


app.use(morgan('common'));
app.use(helmet());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN
	})
);

//fix from stackoverflow
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello World'
	});
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
	console.log(`Listeningn at port ${port}`);
});
