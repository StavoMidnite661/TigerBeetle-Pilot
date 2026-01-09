'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  LayoutDashboard,
  Users,
  ArrowRightLeft,
  Terminal,
  Activity,
  FileClock,
  Settings,
  ShieldCheck,
} from 'lucide-react';

const mainLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/accounts', label: 'Accounts', icon: Users },
  { href: '/transfers', label: 'Funding (sFIAT)', icon: ArrowRightLeft },
  { href: '/attestations', label: 'Attestation & Clearing', icon: ShieldCheck },
];

const toolsLinks = [
  { href: '/query', label: 'Query', icon: Terminal },
  { href: '/monitoring', label: 'Monitoring', icon: Activity },
  { href: '/logs', label: 'Logs', icon: FileClock },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="text-primary" />
          <span className="text-lg font-semibold font-headline text-sidebar-foreground">TigerBeetle Pilot</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu>
            <SidebarMenuItem>
                <span className="flex h-8 shrink-0 items-center px-2 text-xs font-medium text-sidebar-foreground/70">Tools</span>
            </SidebarMenuItem>
          {toolsLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Settings">
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
