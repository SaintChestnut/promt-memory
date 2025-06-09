import { Nav, Provider } from '@/components';
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
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
