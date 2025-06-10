'use client';

import { UserProvider } from '@/components/providers/user-provide';
import '@styles/globals.css';
import { useSession } from 'next-auth/react';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session } = useSession();

  return (
    <div lang="en">
      <UserProvider session={session}>{children}</UserProvider>
    </div>
  );
};

export default Layout;
