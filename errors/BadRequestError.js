const { BAD_REQUEST_400 } = require('../utils/errorConstants');

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_400;
  }
};
