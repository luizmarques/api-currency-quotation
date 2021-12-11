import { Request, Response } from 'express';
import { UserEntityProps } from '../../domain/entities/user.entity';
import ValidationError from '../../domain/errors/validation.error';
import UpdateUserUseCase from '../../domain/use-cases/update-user.use-case';
import RegisterNewUserUserCase from '../../domain/use-cases/register-new-user.use-case';
import LoginUserUseCase from '../../domain/use-cases/login-user.use-case';

export default class UserController {
    constructor(
        private readonly registerNewUser: RegisterNewUserUserCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
    ) { }

    async postUser(
        request: Request<unknown, unknown, UserEntityProps>,
        response: Response
    ): Promise<void> {
        const { body } = request;
        try {
            const user = await this.registerNewUser.execute(body);

            if (!user) {
                response.status(401)
            } else {
                response.status(201).json(user);
            }

        } catch (e) {
            let statusCode: number;

            if (e instanceof ValidationError) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }

            response.status(statusCode).json(e);
        }
    }

    async updateUser(
        request: Request,
        response: Response
    ): Promise<void> {
        const { body } = request;
        try {
            const user = await this.updateUserUseCase.execute(body);
            response.status(201).json(user);
        } catch (e) {
            let statusCode: number;

            if (e instanceof ValidationError) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }

            response.status(statusCode).json(e);
        }
    }

    async loginUser(
        request: Request,
        response: Response
    ): Promise<void> {
        const { body } = request;
        try {
            const user = await this.loginUserUseCase.execute(body);
            response.status(201).json(user);
        } catch (e) {
            let statusCode: number;

            if (e instanceof ValidationError) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }

            response.status(statusCode).json(e);
        }
    }
}
