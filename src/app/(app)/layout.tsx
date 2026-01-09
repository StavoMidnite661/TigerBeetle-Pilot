'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppNav from '@/components/nav';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { initiateAnonymousSignIn, useAuth } from '@/firebase';
import { Loader } from 'lucide-react';

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
    <SidebarProvider>
      <AppNav />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
