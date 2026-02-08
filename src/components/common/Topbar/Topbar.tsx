import { Button } from '@/components/ui/button';
import { LogOutIcon, UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '../logo/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface TopbarProps {
  username?: string | null;
  onRequestUsername: () => void;
}

const Topbar = ({ username, onRequestUsername }: TopbarProps) => {
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 py-2 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold tracking-wider mb-1">Elite Cron</span>
          </div>
          <div className="flex items-center gap-3">
            {username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">Logged in as</p>
                    <p className="text-sm text-muted-foreground">{username}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={onRequestUsername} className="gap-2">
                <UserIcon className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
