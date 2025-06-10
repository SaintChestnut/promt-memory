import { Nav, SessionProvider } from '@/components';
import '@styles/globals.css';

export const metadata = {
  title: 'Promt memory',
  description: 'A simple prompt memory app'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
