// app/layout.tsx
import './globals.css'; // Import global styles
import { CartProvider } from '../hooks/CartContext'; // Import CartProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire application with CartProvider to provide cart context */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
