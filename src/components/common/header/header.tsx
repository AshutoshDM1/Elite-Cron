import { ModeToggle } from '@/components/toggle';
import Logo from '../logo/logo';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center  gap-2 ">
            <Logo />
            <span className="text-2xl font-bold tracking-wider mb-1">Elite Cron</span>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
