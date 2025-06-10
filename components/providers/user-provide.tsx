'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};

export const UserProvider = ({ children, session }: ProviderProps) => {
  const router = useRouter();
  const userId = (session?.user as Session & { id: string })?.id;

  useEffect(() => {
    if (!userId) {
      router.push('/no-user');
    }
  }, [router, userId]);

  if (!userId) {
    return;
  }

  return <div>{children}</div>;
};
