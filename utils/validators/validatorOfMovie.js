const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('../constants');

const checkMovieData = celebrate({
  body: Joi
    .object()
    .keys({
      country: Joi
        .string()
        .required(),
      director: Joi
        .string()
        .required(),
      duration: Joi
        .number()
        .required(),
      description: Joi
        .string()
        .required(),
      year: Joi
        .string()
        .required(),
      image: Joi
        .string()
        .required()
        .pattern(urlValidator),
      trailerLink: Joi
        .string()
        .required()
        .pattern(urlValidator),
      thumbnail: Joi
        .string()
        .required()
        .pattern(urlValidator),
      movieId: Joi
        .number()
        .required(),
      nameRU: Joi
        .string()
        .required(),
      nameEN: Joi
        .string()
        .required(),
    }),
});

const checkMovieDelete = celebrate({
  params: Joi
    .object()
    .keys({
      movieId: Joi
        .string()
        .length(24)
        .hex()
        .required(),
    }),
});

module.exports = {
  checkMovieData,
  checkMovieDelete,
};
