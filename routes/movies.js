const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('../utils/constants');
const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:movieId', celebrate({
  params: Joi
    .object()
    .keys({
      movieId: Joi
        .string()
        .length(24)
        .hex()
        .required(),
    }),
}), deleteMovie);

router.post('/', celebrate({
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
}), addMovie);

module.exports = router;
