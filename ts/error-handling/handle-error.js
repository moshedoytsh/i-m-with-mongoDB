"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, err, statusCode = 400, message = 'Something went wrong') => {
    console.error(err);
    res.status(statusCode).send(message);
};
exports.handleError = handleError;
