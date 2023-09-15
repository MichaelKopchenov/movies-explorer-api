const router = require('express').Router();
const { login } = require('../controllers/users');

const { checkLoginInfo } = require('../utils/validators/validatorOfUser');

router.post('/', checkLoginInfo, login);

module.exports = router;
