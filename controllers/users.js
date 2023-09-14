const {
  ValidationError,
  DocumentNotFoundError,
} = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  OK_200,
  CREATED_201,
  DUPLICATION_ERROR_11000,
  RECURRING_EMAIL_MESSAGE,
  INCORRECT_USER_ID_MESSAGE,
} = require('../utils/errorConstants');
const User = require('../models/user');

const { SOME_SECRET_KEY, NODE_ENV } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res
        .status(CREATED_201)
        .send({
          name: user.name,
          email: user.email,
          _id: user._id,
        }))
      .catch((err) => {
        if (err.code === DUPLICATION_ERROR_11000) {
          next(new ConflictError(RECURRING_EMAIL_MESSAGE));
        } else if (err instanceof ValidationError) {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SOME_SECRET_KEY : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.dataOfUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res
      .status(OK_200)
      .send(user))
    .catch(next);
};

module.exports.editDataOfUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: 'true', runValidators: true },
  )
    .orFail()
    .then((user) => res
      .status(OK_200)
      .send(user))
    .catch((err) => {
      if (err.code === DUPLICATION_ERROR_11000) {
        next(new ConflictError(RECURRING_EMAIL_MESSAGE));
      } else if (err instanceof ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(INCORRECT_USER_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};
