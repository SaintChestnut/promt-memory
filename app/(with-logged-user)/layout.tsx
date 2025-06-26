import { UserProvider } from '@/components/providers/user-provider';
import '@styles/globals.css';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div lang="en">
      <UserProvider>{children}</UserProvider>
    </div>
  );
};

export default Layout;
