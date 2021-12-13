import { model, Schema } from 'mongoose';
import { UserEntityProps } from '../../../domain/entities/user.entity';

const UserSchema = new Schema<UserEntityProps>(
    {
        name: {
            type: String,
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

export default UserSchema;
