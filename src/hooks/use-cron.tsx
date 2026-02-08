import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCronStore } from '../state/cron.state';
import { getCrons, type Cron } from '../services/cron.service';

const useCron = () => {
  const { cron, setCron } = useCronStore();

  const { data, isLoading, error } = useQuery<Cron[], Error>({
    queryKey: ['cron'],
    queryFn: getCrons,
    refetchInterval: 30000, // in 30 seconds
  });

  useEffect(() => {
    if (data) {
      setCron(data);
    }
  }, [data, setCron]);

  return {
    cron: cron,
    isLoading,
    error,
  };
};

export default useCron;
