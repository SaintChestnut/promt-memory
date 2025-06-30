import { Document, Schema, model, models } from 'mongoose';

interface IUserSchema extends Document {
  email: string;
  username: string;
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  // isVerified: boolean;
  verifyToken: string;
  authProvider: string;
}

const UserSchema: Schema<IUserSchema> = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!'
    ]
  },
  image: {
    type: String
  },
  password: {
    type: String
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false
  // },
  verifyToken: {
    type: String,
    default: ''
  },
  authProvider: {
    type: String,
    enum: ['google', 'credentials'],
    default: 'credentials'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = models?.User || model<IUserSchema>('User', UserSchema);

export default User;
