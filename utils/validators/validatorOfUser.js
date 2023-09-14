const { celebrate, Joi } = require('celebrate');

const checkNewUser = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required(),
    }),
});

const checkLoginInfo = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required(),
    }),
});

const checkNewInfoUser = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .min(2)
        .max(30)
        .required(),
      email: Joi
        .string()
        .required()
        .email(),
    }),
});

module.exports = {
  checkNewInfoUser,
  checkNewUser,
  checkLoginInfo,
};
