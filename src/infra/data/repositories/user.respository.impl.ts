import UserEntity, { UserEntityProps } from '../../../domain/entities/user.entity';
import PersistenceError from '../../../domain/errors/persistence.error';
import UserRepository from '../../../domain/repositories/user.repository';
import UserModel from '../models/user.model';

export default class UserRespositoryImpl implements UserRepository {
    private readonly UserModel = UserModel;

    async findById(userId: string): Promise<UserEntity | null> {
        const userProps = await this.UserModel.findById(userId);
        if (!userProps) return null;
        return new UserEntity(userProps);
    }

    async findBy(userEntityProps: Partial<UserEntityProps>): Promise<UserEntity[] | null> {
        const usersProps = await this.UserModel.find(userEntityProps);
        if (!usersProps) return null;
        const users: UserEntity[] = [];

        usersProps.forEach((userProps) => users.push(new UserEntity(userProps)));

        return users;
    }

    async findAll(): Promise<UserEntity[] | null> {
        const usersProps = await this.UserModel.find();
        if (!usersProps) return null;
        const users: UserEntity[] = [];

        usersProps.forEach((userProps) => users.push(new UserEntity(userProps)));

        return users;
    }

    async insert(userEntity: UserEntity): Promise<UserEntity> {
        const user = new this.UserModel(userEntity.props);
        await user.save();
        return new UserEntity(user);
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        const { props } = userEntity;
        const updatedUser = await this.UserModel.findOneAndUpdate(
            { _id: props._id },
            { $set: props },
            { new: true }
        );

        if (!updatedUser)
            throw new PersistenceError(`User with id ${props._id as string} not found`);

        return new UserEntity(updatedUser);
    }

    async delete(userId: string): Promise<void> {
        await this.UserModel.findOneAndDelete({ _id: userId });
    }
}
