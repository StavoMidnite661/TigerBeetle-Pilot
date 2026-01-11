import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SOVR Credit Terminal',
  description: 'An agent to manage your TigerBeetle integration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
