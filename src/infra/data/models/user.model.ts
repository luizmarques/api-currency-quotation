import { model, Schema } from 'mongoose';
import { UserEntityProps } from '../../../domain/entities/user.entity';

const UserSchema = new Schema<UserEntityProps>(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        favoriteCurrency: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
        toObject: { useProjection: true },
        toJSON: { useProjection: true },
    }
);

const UserModel = model<UserEntityProps>('users', UserSchema);

export default UserModel;
