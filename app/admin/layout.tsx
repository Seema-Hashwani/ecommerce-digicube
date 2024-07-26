import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        {/* Header content */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Layout;
