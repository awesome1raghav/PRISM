
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MoveRight, Bell, User, ShieldAlert, FileText, LogOut, Settings, UserCircle, X, Bot, Gavel, HeartPulse, TrendingDown, Star, Briefcase, CalendarClock, ShieldCheck, AlertTriangle, MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from '../ui/badge';
import ThemeSwitcher from '../ThemeSwitcher';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const governmentNotifications = [
    {
        icon: <Bot className="h-4 w-4 text-red-500" />,
        title: 'AI Violation Detected',
        description: 'High-confidence emission anomaly in Peenya. Open case?',
        time: '2m ago',
        read: false,
        href: '/gov?tab=violations'
    },
    {
        icon: <Briefcase className="h-4 w-4 text-primary" />,
        title: 'New Case Assigned',
        description: 'You have been assigned Case #PR-2026-018 in Whitefield.',
        time: '15m ago',
        read: false,
        href: '/gov?tab=incidents'
    },
    {
        icon: <CalendarClock className="h-4 w-4 text-yellow-500" />,
        title: 'Action Deadline Approaching',
        description: '24 hours remaining for Case #PR-2026-014.',
        time: '1h ago',
        read: false,
        href: '/gov?tab=incidents'
    },
    {
        icon: <FileText className="h-4 w-4 text-blue-400" />,
        title: 'Compliance Docs Submitted',
        description: 'Documents received for Case #PR-2026-011.',
        time: '3h ago',
        read: true,
        href: '/gov?tab=incidents'
    }
];

const citizenNotifications = [
    {
        icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
        title: 'High Pollution Alert',
        description: 'Air quality in your area has dropped to "Poor". Limit outdoor activities.',
        time: '5m ago',
        read: false,
        href: '/citizen'
    },
    {
        icon: <ShieldCheck className="h-4 w-4 text-blue-400" />,
        title: 'Report Verified',
        description: 'Your report PR-183491 for water pollution has been verified by authorities.',
        time: '45m ago',
        read: false,
        href: '/citizen/reports'
    },
     {
        icon: <HeartPulse className="h-4 w-4 text-primary" />,
        title: 'New Health Advisory',
        description: 'A health advisory for high noise levels has been issued for your area.',
        time: '2h ago',
        read: true,
        href: '/citizen'
    },
    {
        icon: <MapPin className="h-4 w-4 text-green-500" />,
        title: 'Issue Resolved Nearby',
        description: 'A waste dumping issue near your location has been resolved.',
        time: '1d ago',
        read: true,
        href: '/citizen'
    }
];

const loggedInPaths = ['/citizen', '/gov', '/company', '/profile', '/settings', '/report', '/activate', '/access'];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/');
  }

  const getRole = (path: string) => {
    if (path.startsWith('/gov')) return 'government';
    if (path.startsWith('/company')) return 'company';
    return 'citizen';
  }

  const role = getRole(pathname);

  const navLinks = role === 'citizen' 
    ? [
        { href: '/citizen', label: 'Dashboard'},
        { href: '/report', label: 'Report Issue' },
        { href: '/citizen/reports', label: 'My Reports' },
      ]
    : role === 'government'
    ? [
        { href: '/gov', label: 'Command Center' },
      ]
    : [ // Company
        { href: '/company', label: 'Dashboard' },
        { href: '/company/facilities', label: 'Facilities' },
        { href: '/company/reports', label: 'Compliance' },
      ];

  const isLoggedInView = loggedInPaths.some(path => pathname.startsWith(path));

  const notifications = role === 'citizen' ? citizenNotifications : governmentNotifications;
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
            {isLoggedInView && navLinks.map((link) => (
              <li key={link.href} className="relative hidden md:block">
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
                            <DropdownMenuItem key={index} asChild className={cn("flex items-start gap-3 p-3", !item.read && "bg-primary/5")}>
                                <Link href={item.href}>
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                    </div>
                                </Link>
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
                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
                        onSelect={(e) => {
                          e.preventDefault();
                          setIsLogoutAlertOpen(true)
                        }}
                      >
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
      <AlertDialog open={isLogoutAlertOpen} onOpenChange={setIsLogoutAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be returned to the homepage. You can log back in at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
