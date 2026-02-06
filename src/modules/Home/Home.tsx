import useCron from '../../hooks/use-cron';
import MonitorsHeader from './components/MonitorsHeader';
import MonitorsTable from './components/MonitorsTable';

const Home = () => {
  const { cron, isLoading, error } = useCron();

  const downCount = cron.filter((c) => c.url?.status === 'DOWN').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <MonitorsHeader total={cron.length} downCount={downCount} />
      <MonitorsTable crons={cron} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Home;
