import { Connection, Model } from 'mongoose';
import connection from '../connection';
import UserEntity, { UserEntityProps } from '../../../domain/entities/user.entity';
import PersistenceError from '../../../domain/errors/persistence.error';
import UserRepository from '../../../domain/repositories/user.repository';
import UserSchema from '../models/user.schema';

export default class UserRespositoryImpl implements UserRepository {
    private readonly conn: Connection;
    private readonly UserModel: Model<UserEntityProps>;

    constructor(conn?: Connection) {
        this.conn = conn || connection();
        this.UserModel = this.conn.model<UserEntityProps>('users', UserSchema);
    }

    async findBy(userEntityProps: Partial<UserEntityProps>): Promise<UserEntity[] | null> {
        try {
            const usersProps = await this.UserModel.find(userEntityProps);
            if (!usersProps.length) return null;
            const users: UserEntity[] = [];

            usersProps.forEach((userProps) => users.push(new UserEntity(userProps.toObject())));

            return users;
        } catch (e) {
            throw new PersistenceError(
                `Error on UserRepository.findby: ${JSON.stringify(e, null, 4)}`
            );
        }
    }

    async insert(userEntity: UserEntity): Promise<UserEntity> {
        try {
            const user = new this.UserModel(userEntity.props);
            await user.save();
            return new UserEntity(user.toObject());
        } catch (e) {
            throw new PersistenceError(
                `Error on UserRepository.insert: ${JSON.stringify(e, null, 4)}`
            );
        }
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        try {
            const { props } = userEntity;
            const updatedUser = await this.UserModel.findOneAndUpdate(
                { _id: props._id },
                { $set: props },
                { new: true }
            );

            if (!updatedUser)
                throw new PersistenceError(`User with id ${props._id as string} not found`);

            return new UserEntity(updatedUser.toObject());
        } catch (e) {
            throw new PersistenceError(
                `Error on UserRepository.update: ${JSON.stringify(e, null, 4)}`
            );
        }
    }
}
