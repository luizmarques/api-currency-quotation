import { plainToClass, Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    validateSync,
} from 'class-validator';
import ValidationError, { Failure } from '../errors/validation.error';

export class UserEntityProps {
    @IsOptional()
    @IsString()
    readonly _id?: string;

    @IsString({
        message: 'should_be_string',
    })
    @IsNotEmpty({
        message: 'field_required',
    })
    @MinLength(3, {
        message: 'should_have_at_least_3_chars',
    })
    readonly name: string;

    @IsNotEmpty({
        message: 'field_required',
    })
    @IsEmail({}, { message: 'should_be_a_valid_email' })
    readonly email: string;

    @IsNotEmpty({
        message: 'field_required',
    })
    @IsString({
        message: 'should_be_string',
    })
    @MinLength(8, {
        message: 'should_have_between_8_and_50_chars',
    })
    @MaxLength(50, {
        message: 'should_have_between_8_and_50_chars',
    })
    readonly password: string;

    @IsOptional()
    readonly favoriteCurrency: [String];
}

export default class UserEntity {
    public readonly props: UserEntityProps;
    constructor(userEntityProps: UserEntityProps) {
        const classObject = plainToClass(UserEntityProps, userEntityProps);
        const errors = validateSync(classObject, {
            stopAtFirstError: true,
        });
        if (errors.length) {
            const failures: Failure[] = [];
            errors.forEach((error) =>
                failures.push({
                    msg: (error.constraints as Record<string, string>)[
                        Object.keys(error.constraints as Record<string, string>)[0]
                    ],
                    param: error.property,
                })
            );

            throw new ValidationError(failures);
        }

        this.props = classObject;
    }
}
