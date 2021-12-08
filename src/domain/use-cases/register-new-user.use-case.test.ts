import { when } from 'jest-when';
import { createMock } from 'ts-auto-mock';
import UserEntity, { UserEntityProps } from '../entities/user.entity';
import ValidationError from '../errors/validation.error';
import UserRepository from '../repositories/user.repository';
import RegisterNewUserUserCase from './register-new-user.use-case';

describe('register new user use case', () => {
    it('should register user', async () => {
        // arrange
        const userEntityProps: UserEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '12345678',
            favoriteCurrency: ["BRL"]
        };

        const userRepositoryMock = createMock<UserRepository>();
        const fn = jest.fn();
        when(fn)
            .calledWith({ email: 'luiz@contato.com.br' })
            .mockReturnValue(Promise.resolve(null))
        jest.spyOn(userRepositoryMock, 'findBy').mockImplementation(fn);

        jest.spyOn(userRepositoryMock, 'insert').mockImplementation(async () =>
            Promise.resolve(new UserEntity({ _id: 'abc123', ...userEntityProps }))
        );

        const registerNewUserUseCase = new RegisterNewUserUserCase(userRepositoryMock);

        // act
        const newUser = await registerNewUserUseCase.execute(userEntityProps);
        expect(newUser).toEqual({
            _id: 'abc123',
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '12345678',
        });
    });

    it('should not register user when email is already in use', async () => {
        // arrange
        const userEntityProps: UserEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '12345678',
            favoriteCurrency: ["BRL"]
        };

        const userRepositoryMock = createMock<UserRepository>();
        const fn = jest.fn();
        when(fn)
            .calledWith({ email: 'luiz@contato.com.br' })
            .mockReturnValue(
                Promise.resolve([new UserEntity({ _id: '12345', ...userEntityProps })])
            );
        jest.spyOn(userRepositoryMock, 'findBy').mockImplementation(fn);

        const registerNewUserUseCase = new RegisterNewUserUserCase(userRepositoryMock);

        // act & assert
        await expect(registerNewUserUseCase.execute(userEntityProps)).rejects.toThrow(
            ValidationError
        );
    });
});
