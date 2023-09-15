const router = require('express').Router();
const { createUser } = require('../controllers/users');

const { checkNewUser } = require('../utils/validators/validatorOfUser');

router.post('/', checkNewUser, createUser);

module.exports = router;
