"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failure = void 0;
class Failure {
    constructor(msg, param) {
        this.msg = msg;
        this.param = param;
    }
}
exports.Failure = Failure;
class ValidationError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
        this.msg = 'ValidationError';
    }
}
exports.default = ValidationError;
