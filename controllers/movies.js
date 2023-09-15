const {
  ValidationError,
  CastError,
} = require('mongoose').Error;
const {
  OK_200,
  CREATED_201,
  INCORRECT_MOVIE_ID_MESSAGE,
  DELETE_ALIEN_MOVIE,
  DELETE_MOVIE_SUCCESSFULLY,
} = require('../utils/errorConstants');
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
      .status(CREATED_201)
      .send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res
      .status(OK_200)
      .send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError(INCORRECT_MOVIE_ID_MESSAGE)))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError(DELETE_ALIEN_MOVIE));
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res
            .status(OK_200)
            .send({ message: DELETE_MOVIE_SUCCESSFULLY }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(INCORRECT_MOVIE_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};
