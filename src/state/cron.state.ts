import { create } from 'zustand';
import type { Cron } from '../services/cron.service';

interface CronStore {
  cron: Cron[];
  setCron: (cron: Cron[]) => void;
}

export const useCronStore = create<CronStore>((set) => ({
  cron: [],
  setCron: (cron: Cron[]) => set({ cron }),
}));
