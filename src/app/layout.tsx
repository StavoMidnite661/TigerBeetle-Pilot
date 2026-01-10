import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'TigerBeetle Pilot',
  description: 'An agent to manage your TigerBeetle integration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="relative min-h-screen w-full bg-black">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
            }}
          />
          <div className="relative z-10">
            <FirebaseClientProvider>
              {children}
            </FirebaseClientProvider>
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
