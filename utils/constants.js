const rateLimit = require('express-rate-limit');

const urlValidator = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const {
  DATABASE = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
  NODE_ENV,
  SOME_SECRET_KEY,
} = process.env;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://fr-kmv-movies-diplom.nomoredomainsicu.ru',
    'https://fr-kmv-movies-diplom.nomoredomainsicu.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  urlValidator,
  limiter,
  DATABASE,
  PORT,
  corsOptions,
  NODE_ENV,
  SOME_SECRET_KEY,
};
