import { useMemo, useState } from 'react';
import useCron from '../../hooks/use-cron';
import MonitorsHeader, { type FilterStatus } from './components/MonitorsHeader';
import MonitorsTable from './components/MonitorsTable';
import UsernameDialog from '@/components/common/UsernameDialog';
import { useUsername } from '@/hooks/use-username';
import Header from '@/components/common/Topbar/Topbar';

const Home = () => {
  const { username, saveUsername } = useUsername();
  const [showDialog, setShowDialog] = useState(false);

  const handleUsernameSet = (newUsername: string) => {
    saveUsername(newUsername);
    setShowDialog(false);
  };

  const requestUsername = () => {
    setShowDialog(true);
  };

  const { cron, isLoading, error } = useCron();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const downCount = cron.filter((c) => c.url?.status === 'DOWN').length;

  // Filter crons based on selected status
  const filteredCrons = useMemo(() => {
    if (filterStatus === 'all') {
      return cron;
    }

    return cron.filter((c) => {
      const status = c.url?.status?.toUpperCase();
      return status === filterStatus.toUpperCase();
    });
  }, [cron, filterStatus]);

  return (
    <>
      <UsernameDialog open={showDialog} onUsernameSet={handleUsernameSet} />
      <div className="flex flex-col min-h-screen animate-in fade-in duration-200">
        <Header username={username} onRequestUsername={requestUsername} />
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
          <MonitorsHeader
            total={cron.length}
            downCount={downCount}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onRequestUsername={requestUsername}
          />
          <MonitorsTable
            crons={filteredCrons}
            isLoading={isLoading}
            error={error}
            onRequestUsername={requestUsername}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
