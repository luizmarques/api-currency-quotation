import { Router } from 'express';
import { Connection } from 'mongoose';
import RegisterNewUserUserCase from '../../domain/use-cases/register-new-user.use-case';
import UserController from '../controllers/user.controller';
import UserRespositoryImpl from '../data/repositories/user.respository.impl';

const userRoutes = (router: Router, connection: Connection) => {
    const USERS_API_PREFIX = '/users';

    const userRepository = new UserRespositoryImpl(connection);
    const registerNewUser = new RegisterNewUserUserCase(userRepository);
    const userController = new UserController(registerNewUser);

    router.post(USERS_API_PREFIX, (request, response) =>
        userController.postUser(request, response)
    );
};

export default userRoutes;
