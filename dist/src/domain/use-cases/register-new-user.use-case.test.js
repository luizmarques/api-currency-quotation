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
const jest_when_1 = require("jest-when");
const ts_auto_mock_1 = require("ts-auto-mock");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const validation_error_1 = __importDefault(require("../errors/validation.error"));
const register_new_user_use_case_1 = __importDefault(require("./register-new-user.use-case"));
describe('register new user use case', () => {
    it('should register user', () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        const userEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '12345678',
            favoriteCurrency: ["BRL"]
        };
        const userRepositoryMock = (0, ts_auto_mock_1.createMock)();
        const fn = jest.fn();
        (0, jest_when_1.when)(fn)
            .calledWith({ email: 'luiz@contato.com.br' })
            .mockReturnValue(Promise.resolve(null));
        jest.spyOn(userRepositoryMock, 'findBy').mockImplementation(fn);
        jest.spyOn(userRepositoryMock, 'insert').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.resolve(new user_entity_1.default(Object.assign({ _id: 'abc123' }, userEntityProps))); }));
        const registerNewUserUseCase = new register_new_user_use_case_1.default(userRepositoryMock);
        // act
        const newUser = yield registerNewUserUseCase.execute(userEntityProps);
        expect(newUser).toEqual({
            _id: 'abc123',
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '12345678',
        });
    }));
    it('should not register user when email is already in use', () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        const userEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '12345678',
            favoriteCurrency: ["BRL"]
        };
        const userRepositoryMock = (0, ts_auto_mock_1.createMock)();
        const fn = jest.fn();
        (0, jest_when_1.when)(fn)
            .calledWith({ email: 'luiz@contato.com.br' })
            .mockReturnValue(Promise.resolve([new user_entity_1.default(Object.assign({ _id: '12345' }, userEntityProps))]));
        jest.spyOn(userRepositoryMock, 'findBy').mockImplementation(fn);
        const registerNewUserUseCase = new register_new_user_use_case_1.default(userRepositoryMock);
        // act & assert
        yield expect(registerNewUserUseCase.execute(userEntityProps)).rejects.toThrow(validation_error_1.default);
    }));
});
