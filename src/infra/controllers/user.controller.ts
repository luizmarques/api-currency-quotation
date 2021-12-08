import { Request, Response } from 'express';
import { UserEntityProps } from '../../domain/entities/user.entity';
import ValidationError from '../../domain/errors/validation.error';
import RegisterNewUserUserCase from '../../domain/use-cases/register-new-user.use-case';

export default class UserController {
    constructor(private readonly registerNewUser: RegisterNewUserUserCase) {}
    async postUser(
        request: Request<unknown, unknown, UserEntityProps>,
        response: Response
    ): Promise<void> {
        const { body } = request;
        try {
            const user = await this.registerNewUser.execute(body);
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
