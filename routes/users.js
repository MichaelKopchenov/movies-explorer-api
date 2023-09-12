const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editDataOfUser,
  dataOfUser,
} = require('../controllers/users');

router.get('/me', dataOfUser);

router.patch('/me', celebrate({
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
}), editDataOfUser);

module.exports = router;
