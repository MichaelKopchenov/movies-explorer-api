const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const {
  ValidationError,
  CastError,
} = require('mongoose').Error;
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((card) => res
      .status(HTTP_STATUS_CREATED)
      .send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res
      .status(HTTP_STATUS_OK)
      .send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError(`Фильм с _id: ${req.params.movieId} не найден.`)))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Фильм другого пользователя.'));
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res
            .status(HTTP_STATUS_OK)
            .send({ message: 'Фильм удален' }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(`Некорректный _id фильма: ${req.params.movieId}`));
      } else {
        next(err);
      }
    });
};