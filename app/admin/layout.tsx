// app/admin/layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
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

export default AdminLayout;
