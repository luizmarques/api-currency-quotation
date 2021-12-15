import UserEntity, { UserEntityProps } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

export default class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(body: any): Promise<UserEntityProps | null> {
    // const user = new UserEntity(userEntityProps);
    const userResponse = await this.userRepository.findBy({
      email: body.email,
    });    
      if(userResponse){
        const user = userResponse[0]; 
        const indexCurrency = user.props.favoriteCurrency.indexOf(body.code)
        if(indexCurrency > -1){
          user.props.favoriteCurrency.push(body.code)
        } else {
          user.props.favoriteCurrency.splice(indexCurrency, 1)
        }
        const updatedUser = await this.userRepository.update(user);
  
        return updatedUser.props;
      }
    return null
  }
}
