'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User } from 'lucide-react';

interface AppHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function AppHeader({ title, children }: AppHeaderProps) {
  const { user } = useUser();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-bold font-headline text-primary">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {children}
         {user && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm text-muted-foreground hidden md:block">
                <p className="font-mono text-xs">{user.uid}</p>
                <p className="text-xs">Anonymous Operator</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
