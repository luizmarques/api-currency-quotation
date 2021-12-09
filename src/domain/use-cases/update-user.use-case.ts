import UserEntity, { UserEntityProps } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

export default class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userEntityProps: UserEntityProps): Promise<UserEntityProps> {
    const user = new UserEntity(userEntityProps);

    const updatedUser = await this.userRepository.update(user);
    return updatedUser.props;
  }
}
