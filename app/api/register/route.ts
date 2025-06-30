'use server';
import User from '@/models/api/user';
import { connectToDatabase } from '@/utils/database';
import bcrypt from 'bcryptjs';

type RegisterProps = {
  email: string;
  password: string;
  username?: string;
};

export const register = async (values: RegisterProps) => {
  const { email, password, username } = values;
  try {
    await connectToDatabase();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: 'Email already exists!'
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      username: username ?? email.split('@')[0] + '_username',
      verifyToken: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    });
    await user.save();
  } catch (e) {
    console.log(e);
  }
};
