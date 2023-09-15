const router = require('express').Router();
const {
  editDataOfUser,
  dataOfUser,
} = require('../controllers/users');

const { checkNewInfoUser } = require('../utils/validators/validatorOfUser');

router.get('/me', dataOfUser);

router.patch('/me', checkNewInfoUser, editDataOfUser);

module.exports = router;
