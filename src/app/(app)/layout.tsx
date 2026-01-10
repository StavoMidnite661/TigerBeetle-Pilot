'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { initiateAnonymousSignIn, useAuth } from '@/firebase';
import { Loader } from 'lucide-react';
import Footer from '@/components/footer';
import { AppHeader } from '@/components/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, router, auth]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center gap-2">
        <Loader className="h-8 w-8 animate-spin" />
        <span>Authenticating...</span>
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
