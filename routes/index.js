const router = require('express').Router();
const routerOfUsers = require('./users');
const routerOfMovies = require('./movies');
const auth = require('../middlewares/auth');
const routerOfRegistration = require('./registration');
const routerOfLogin = require('./login');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signup', routerOfRegistration);
router.use('/signin', routerOfLogin);

router.use(auth);

router.use('/users', routerOfUsers);
router.use('/movies', routerOfMovies);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;
