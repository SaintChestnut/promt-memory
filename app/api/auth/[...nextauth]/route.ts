import NextAuth, { Session } from 'next-auth';
import Google from 'next-auth/providers/google';
import { env } from 'process';

import User from '@/models/api/user';
import { connectToDatabase } from '@/utils/database';

const handler = NextAuth({
  providers: [
    Google({
      clientId: env.GOOGLE_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || ''
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

    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.image
          });
        }

        return true;
      } catch (error) {
        console.error('Error connecting to the database:', error);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };
