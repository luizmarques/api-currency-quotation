import ValidationError from '../errors/validation.error';
import UserEntity, { UserEntityProps } from './user.entity';

describe('user entity', () => {
    it('should create user', () => {
        // arrange
        const userEntityProps: UserEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '123123123',
            favoriteCurrency: ["BRL", "USD"]
        };

        // act
        const user = new UserEntity(userEntityProps);

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
        const userEntityProps: UserEntityProps = {
            name: 'Luiz Marques',
            email: 'luiz@contato.com.br',
            password: '123',
            favoriteCurrency: ["BRL"]
        };

        // act & assert
        expect(() => new UserEntity(userEntityProps)).toThrow(ValidationError);
    });
});
