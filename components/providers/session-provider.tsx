'use client';

import { Session } from 'next-auth';
import { SessionProvider as NextSessionProvider } from 'next-auth/react';

type ProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};

export const SessionProvider = ({ children, session }: ProviderProps) => {
  return <NextSessionProvider session={session}>{children}</NextSessionProvider>;
};
