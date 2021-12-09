import UserEntity, { UserEntityProps } from '../entities/user.entity';

export default interface UserRepository {
    findBy(userEntityProps: Partial<UserEntityProps>): Promise<UserEntity[] | null>;
    insert(userEntity: UserEntity): Promise<UserEntity>;
    update(userEntity: UserEntity): Promise<UserEntity>;
}