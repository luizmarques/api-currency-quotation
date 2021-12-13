import UserEntity, { UserEntityProps } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

export default class RegisterNewUserUserCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userEntityProps: UserEntityProps): Promise<UserEntityProps> {
        const user = new UserEntity(userEntityProps);

        const emailAlreadyInUse = await this.userRepository.findBy({
            email: user.props.email,
        });

        console.log(emailAlreadyInUse)

        if (emailAlreadyInUse?.length) {
            throw ('email_already_in_use');
        }

        const registeredUser = await this.userRepository.insert(user);
        const { props } = registeredUser;

        return {
            _id: props._id,
            name: props.name,
            email: props.email,
            password: props.password,
            favoriteCurrency: props.favoriteCurrency
        };

    }
}
