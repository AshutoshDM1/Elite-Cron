import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CreateCronForm from './CreateCronForm/CreateCronForm';

interface MonitorsHeaderProps {
  total: number;
  downCount?: number;
}

const MonitorsHeader = ({ total, downCount = 0 }: MonitorsHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Monitors.</h1>
          {total > 0 && (
            <Badge variant={downCount > 0 ? 'destructive' : 'secondary'}>
              {downCount > 0 ? `${downCount} down` : 'All up'}
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {total === 0
            ? 'No monitors yet. Create your first monitor to get started.'
            : `${total} active monitor${total > 1 ? 's' : ''}.`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {/* Placeholder for future filters */}
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          Filter
        </Button>
        <CreateCronForm />
      </div>
    </div>
  );
};

export default MonitorsHeader;
