import { Router } from 'express';
import { Connection } from 'mongoose';
import RegisterNewUserUserCase from '../../domain/use-cases/register-new-user.use-case';
import UpdateUserUseCase from '../../domain/use-cases/update-user.use-case';
import UserController from '../controllers/user.controller';
import UserRespositoryImpl from '../data/repositories/user.respository.impl';

const userRoutes = (router: Router, connection: Connection) => {
    const USERS_API_PREFIX = '/users';

    const userRepository = new UserRespositoryImpl(connection);
    const updateUserUseCase = new UpdateUserUseCase(userRepository)
    const registerNewUser = new RegisterNewUserUserCase(userRepository);
    //Resolver a tipagem de updateUserUseCase
    const userController = new UserController(registerNewUser, updateUserUseCase as any);
    

    router.post(USERS_API_PREFIX, (request, response) =>
        userController.postUser(request, response)
    );

    router.put(`${USERS_API_PREFIX}/favoriteCurrency`, (request, response) =>
        userController.updateUser(request, response)
    );
};

export default userRoutes;
