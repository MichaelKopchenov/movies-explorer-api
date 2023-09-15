const { FORBIDDEN_403 } = require('../utils/errorConstants');

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_403;
  }
};
