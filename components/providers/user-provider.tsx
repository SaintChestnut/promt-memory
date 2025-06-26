'use client';

import { pageRoutes } from '@/resources';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: ProviderProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = (session?.user as Session & { id: string })?.id;

  console.log('UserProvider:session:', session);

  useEffect(() => {
    if (!userId) {
      router.push(pageRoutes.NO_USER);
    }
  }, [router, userId]);

  if (!userId) {
    return;
  }

  return <div>{children}</div>;
};
