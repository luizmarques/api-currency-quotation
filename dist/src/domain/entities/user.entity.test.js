"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = __importDefault(require("../errors/validation.error"));
const user_entity_1 = __importDefault(require("./user.entity"));
describe('user entity', () => {
    it('should create user', () => {
        // arrange
        const userEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '123123123',
            favoriteCurrency: ["BRL"]
        };
        // act
        const user = new user_entity_1.default(userEntityProps);
        // assert
        expect(user.props).toEqual({
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '123123123',
            favoriteCurrency: ["BRL"]
        });
    });
    it('should throw exception when a prop is invalid', () => {
        // arrange
        const userEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '123',
            favoriteCurrency: ["BRL"]
        };
        // act & assert
        expect(() => new user_entity_1.default(userEntityProps)).toThrow(validation_error_1.default);
    });
});
