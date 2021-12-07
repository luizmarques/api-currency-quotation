import UserEntity, { UserEntityProps } from '../entities/user.entity';

export default interface UserRepository {
    findById(userId: string): Promise<UserEntity | null>;
    findBy(userEntityProps: Partial<UserEntityProps>): Promise<UserEntity[] | null>;
    findAll(): Promise<UserEntity[] | null>;
    insert(userEntity: UserEntity): Promise<UserEntity>;
    update(userEntity: UserEntity): Promise<UserEntity>;
    delete(userId: string): Promise<void>;
}
