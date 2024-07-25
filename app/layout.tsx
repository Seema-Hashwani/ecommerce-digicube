// app/layout.tsx
import './globals.css'; // Assuming you have global styles
import { CartProvider } from '../hooks/CartContext'; // Adjust the path if necessary

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire application with CartProvider */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
