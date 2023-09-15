const { INTERNAL_SERVER_ERROR_500 } = require('../utils/errorConstants');

const IternalServerError = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_500
        ? 'Ошибка сервера'
        : message,
    });
  next();
};

module.exports = IternalServerError;
