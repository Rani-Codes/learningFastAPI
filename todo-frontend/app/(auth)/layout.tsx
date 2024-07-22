// app/login/layout.tsx

import { poppins } from '@/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Todo App',
  description: 'Login to your Todo list web-app',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased relative overflow-hidden min-h-screen flex flex-col items-center justify-center`}>
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
