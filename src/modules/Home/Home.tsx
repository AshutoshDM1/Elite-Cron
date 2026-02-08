import { useMemo, useState } from 'react';
import useCron from '../../hooks/use-cron';
import MonitorsHeader, { type FilterStatus } from './components/MonitorsHeader';
import MonitorsTable from './components/MonitorsTable';

interface HomeProps {
  onRequestUsername: () => void;
}

const Home = ({ onRequestUsername }: HomeProps) => {
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
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <MonitorsHeader 
        total={cron.length} 
        downCount={downCount} 
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onRequestUsername={onRequestUsername}
      />
      <MonitorsTable crons={filteredCrons} isLoading={isLoading} error={error} onRequestUsername={onRequestUsername} />
    </div>
  );
};

export default Home;
