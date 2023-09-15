const { UNAUTHORIZED_401 } = require('../utils/errorConstants');

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_401;
  }
};
