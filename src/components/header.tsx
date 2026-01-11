'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const mainLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/query', label: 'Query' },
  { href: '/settings', label: 'Settings' },
];

export function AppHeader() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold inline-block">SOVR<span className="text-primary">.credit</span></span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
           {user && (
            <Button variant="outline" className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-mono text-xs">{user.uid.slice(0, 4)}...{user.uid.slice(-4)}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
