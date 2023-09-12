const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .require()
        .min(2)
        .max(30),
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required(),
    }).unknown(true),
}), createUser);

module.exports = router;
