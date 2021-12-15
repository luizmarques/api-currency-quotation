import UserEntity, { UserEntityProps } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

export default class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userEntityProps: UserEntityProps): Promise<UserEntity | null> {
    // const user = new UserEntity(userEntityProps);
    try {
      const userResponse = await this.userRepository.findBy({
        email: userEntityProps.email,
        password: userEntityProps.password,
      });

      return userResponse? userResponse[0] : null

    } catch (e) {
      return null
    }
  }
}
