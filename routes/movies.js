const router = require('express').Router();
const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

const { checkMovieData, checkMovieDelete } = require('../utils/validators/validatorOfMovie');

router.get('/', getMovies);

router.delete('/:movieId', checkMovieDelete, deleteMovie);

router.post('/', checkMovieData, addMovie);

module.exports = router;
