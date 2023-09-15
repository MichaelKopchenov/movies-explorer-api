const { NOT_FOUND_404 } = require('../utils/errorConstants');

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_404;
  }
};
