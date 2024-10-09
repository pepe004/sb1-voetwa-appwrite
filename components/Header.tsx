"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import NotificationCenter from './NotificationCenter';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0">CreatorSupport</Link>
        <nav>
          <ul className="flex flex-wrap justify-center sm:justify-end space-x-4 items-center">
            <li><Link href="/explore" className="hover:text-primary">Explore</Link></li>
            <li><Link href="/start-creating" className="hover:text-primary">Start Creating</Link></li>
            {session && (
              <>
                <li><NotificationCenter /></li>
                <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              </>
            )}
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>
            </li>
            <li>
              {session ? (
                <Button asChild><Link href="/api/auth/signout">Logout</Link></Button>
              ) : (
                <Button asChild><Link href="/login">Login</Link></Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}