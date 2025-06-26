import bcrypt from 'bcryptjs';
import NextAuth, { Session } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { env } from 'process';

import User from '@/models/api/user';
import { connectToDatabase } from '@/utils/database';

const handler = NextAuth({
  providers: [
    Google({
      clientId: env.GOOGLE_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || ''
    }),
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email }).select('+password');

        if (!user || !user.password) {
          throw new Error('No user found or password not set.');
        }

        const passwordMatch = await bcrypt.compare(credentials?.password ?? '', user.password);

        if (!passwordMatch) {
          throw new Error('Invalid password.');
        }

        // if (!user.isVerified) {
        //   throw new Error('Email not verified.');
        // }

        return { id: user._id, email: user.email };
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email
      });

      (session?.user as Session & { id: string }).id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile, account }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({ email: profile?.email, authProvider: 'google' });
        if (!userExists) {
          if (account?.provider === 'google') {
            await User.create({
              email: profile?.email,
              username: profile?.name?.replace(' ', '').toLowerCase(),
              image: profile?.image,
              authProvider: 'google'
            });
          }
        }

        return true;
      } catch (error) {
        console.error('Error connecting to the database:', error);
        return false;
      }
    }
  },
  session: {
    strategy: 'jwt'
  }
});

export { handler as GET, handler as POST };
