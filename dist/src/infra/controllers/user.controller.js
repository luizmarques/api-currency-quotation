"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = __importDefault(require("../../domain/errors/validation.error"));
class UserController {
    constructor(registerNewUser, updateUserUseCase, loginUserUseCase) {
        this.registerNewUser = registerNewUser;
        this.updateUserUseCase = updateUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }
    postUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const user = yield this.registerNewUser.execute(body);
                if (!user) {
                    response.status(401);
                }
                else {
                    response.status(201).json(user);
                }
            }
            catch (e) {
                let statusCode;
                if (e instanceof validation_error_1.default) {
                    statusCode = 400;
                }
                else {
                    statusCode = 500;
                }
                response.status(statusCode).json(e);
            }
        });
    }
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const user = yield this.updateUserUseCase.execute(body);
                response.status(201).json(user);
            }
            catch (e) {
                let statusCode;
                if (e instanceof validation_error_1.default) {
                    statusCode = 400;
                }
                else {
                    statusCode = 500;
                }
                response.status(statusCode).json(e);
            }
        });
    }
    loginUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const user = yield this.loginUserUseCase.execute(body);
                response.status(201).json(user);
            }
            catch (e) {
                let statusCode;
                if (e instanceof validation_error_1.default) {
                    statusCode = 400;
                }
                else {
                    statusCode = 500;
                }
                response.status(statusCode).json(e);
            }
        });
    }
}
exports.default = UserController;
