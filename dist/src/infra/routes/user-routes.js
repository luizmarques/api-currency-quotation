"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_user_use_case_1 = __importDefault(require("../../domain/use-cases/login-user.use-case"));
const register_new_user_use_case_1 = __importDefault(require("../../domain/use-cases/register-new-user.use-case"));
const update_user_use_case_1 = __importDefault(require("../../domain/use-cases/update-user.use-case"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_respository_impl_1 = __importDefault(require("../data/repositories/user.respository.impl"));
const userRoutes = (router, connection) => {
    const USERS_API_PREFIX = '/users';
    const userRepository = new user_respository_impl_1.default(connection);
    const updateUserUseCase = new update_user_use_case_1.default(userRepository);
    const registerNewUser = new register_new_user_use_case_1.default(userRepository);
    const loginUserUseCase = new login_user_use_case_1.default(userRepository);
    const userController = new user_controller_1.default(registerNewUser, updateUserUseCase, loginUserUseCase);
    router.post(`${USERS_API_PREFIX}/register`, (request, response) => userController.postUser(request, response));
    router.put(`${USERS_API_PREFIX}/favoriteCurrency`, (request, response) => userController.updateUser(request, response));
    router.post(`${USERS_API_PREFIX}/login`, (request, response) => userController.loginUser(request, response));
};
exports.default = userRoutes;
