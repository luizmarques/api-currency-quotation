import UserEntity, { UserEntityProps } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

export default class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userEntityProps: UserEntityProps): Promise<Boolean> {
    // const user = new UserEntity(userEntityProps);

    const emailAlreadyInUse = await this.userRepository.findBy({
      email: userEntityProps.email,
      password: userEntityProps.password,
    });

    if(!emailAlreadyInUse){
      return false
    }

    return true;
  }
}
