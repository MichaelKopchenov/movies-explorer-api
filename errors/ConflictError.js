const { CONFLICT_409 } = require('../utils/errorConstants');

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_409;
  }
};
