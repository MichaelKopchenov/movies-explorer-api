require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const InternalServerError = require('./errors/IternalServerError');

const { PORT, DATABASE, corsOptions } = require('./utils/constants');

const app = express();

app.use('*', cors(corsOptions));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE);

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(InternalServerError);

app.listen(PORT);
