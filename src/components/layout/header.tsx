'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MoveRight, Bell, User, ShieldAlert, FileText, LogOut, Settings, UserCircle, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';
import ThemeSwitcher from '../ThemeSwitcher';

const navLinks = [
  { href: '/report', label: 'Report Issue' },
];

const loggedInPaths = ['/citizen', '/gov', '/company', '/activate'];


const notifications = [
    {
        icon: <ShieldAlert className="h-4 w-4 text-red-500" />,
        title: 'New High-Priority Violation',
        description: 'AI detected an emission limit breach in Peenya.',
        time: '5m ago',
        read: false,
    },
    {
        icon: <FileText className="h-4 w-4 text-primary" />,
        title: 'Report Status Updated',
        description: 'Your report PR-183491 is now "Verified".',
        time: '1h ago',
        read: false,
    },
    {
        icon: <ShieldAlert className="h-4 w-4 text-yellow-500" />,
        title: 'Moderate Risk Alert',
        description: 'Predicted AQI drop in Marathahalli in 2 hours.',
        time: '3h ago',
        read: true,
    }
]

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoggedInView = loggedInPaths.some(path => pathname.startsWith(path));
  const unreadCount = notifications.filter(n => !n.read).length;


  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/20' : 'bg-transparent'
      )}
    >
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8">
            <Logo className="text-primary" />
          </div>
          <span className="font-bold sm:inline-block text-foreground">PRISM</span>
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
                {pathname === link.href && (
                  <div className="absolute top-full mt-2 left-0 w-full h-0.5 bg-primary/50 rounded-full" />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <ThemeSwitcher />
          {isLoggedInView ? (
            <>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                           {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-background justify-center items-center text-xs text-white">
                                    {unreadCount}
                                </span>
                            </span>
                        )}
                          <span className="sr-only">Notifications</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel className="flex justify-between items-center">
                          <span>Notifications</span>
                          <Badge variant="secondary">{unreadCount} New</Badge>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((item, index) => (
                            <DropdownMenuItem key={index} className={cn("flex items-start gap-3 p-3", !item.read && "bg-primary/5")}>
                                <div className="mt-1">{item.icon}</div>
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                      </div>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem className="justify-center">
                            See All Notifications
                       </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <User className="h-5 w-5" />
                          <span className="sr-only">Profile</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-500/10">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log Out</span>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild className="group">
              <Link href="/access">
                Access PRISM <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
