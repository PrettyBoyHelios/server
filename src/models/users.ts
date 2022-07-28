import mongoose, {Schema, model} from 'mongoose';

interface IUser {
    name: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
  });

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export {User};