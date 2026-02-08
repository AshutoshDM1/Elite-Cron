import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCronById, type CronDetail } from '@/services/cron.service';
import { formatDistanceToNow } from 'date-fns';

interface ViewURLDialogProps {
  cronId: string;
}

const statusColorClasses: Record<string, string> = {
  UP: 'bg-emerald-500',
  DOWN: 'bg-red-500',
  PENDING: 'bg-amber-500',
  ERROR: 'bg-orange-500',
};

const ViewURLDialog = ({ cronId }: ViewURLDialogProps) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery<CronDetail>({
    queryKey: ['cron', cronId],
    queryFn: () => getCronById(cronId),
    enabled: open, // Only fetch when dialog is open
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return '—';
    }
  };

  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(' ');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge variant="outline" className="cursor-pointer bg-pink-500 hover:bg-pink-600">
          View
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-w-4xl min-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-left">
            {isLoading ? (
              <Skeleton className="h-6 w-64" />
            ) : error ? (
              'Error Loading Details'
            ) : (
              <>
                <span className="truncate">{data?.url?.url ?? 'Unknown URL'}</span>
                {data?.url?.status && (
                  <Badge
                    variant={
                      data.url.status === 'DOWN' || data.url.status === 'ERROR'
                        ? 'destructive'
                        : data.url.status === 'UP'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {data.url.status}
                  </Badge>
                )}
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-sm text-destructive">Failed to load URL details. Please try again.</p>
          </div>
        ) : data ? (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="line" className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="logs">Recent Logs ({data.url?.logs?.length ?? 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              {/* URL Information */}
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">URL Information</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">URL:</span>
                    <span className="font-mono text-xs break-all text-right ml-4">
                      {data.url?.url}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check Interval:</span>
                    <span className="font-mono text-xs">{data.interval}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="text-xs">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Uptime */}
                <div className="rounded-lg border bg-card p-4 space-y-2">
                  <div className="text-xs text-muted-foreground">Uptime</div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {(() => {
                        const totalUp = data.url?.totalUpTime ?? 0;
                        const totalDown = data.url?.totalDownTime ?? 0;
                        const total = totalUp + totalDown;
                        const uptimePercent = total === 0 ? 0 : Math.round((totalUp / total) * 100);
                        return `${uptimePercent}%`;
                      })()}
                    </div>
                    <Progress
                      value={(() => {
                        const totalUp = data.url?.totalUpTime ?? 0;
                        const totalDown = data.url?.totalDownTime ?? 0;
                        const total = totalUp + totalDown;
                        return total === 0 ? 0 : Math.round((totalUp / total) * 100);
                      })()}
                      className="h-1.5"
                    />
                    <div className="text-xs text-muted-foreground">
                      {formatDuration(data.url?.totalUpTime ?? 0)} up
                    </div>
                  </div>
                </div>

                {/* Total Checks */}
                <div className="rounded-lg border bg-card p-4 space-y-2">
                  <div className="text-xs text-muted-foreground">Total Checks</div>
                  <div className="text-2xl font-bold">{data.url?.totalChecks ?? 0}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDuration(data.url?.totalDownTime ?? 0)} down
                  </div>
                </div>

                {/* Avg Response Time */}
                <div className="rounded-lg border bg-card p-4 space-y-2">
                  <div className="text-xs text-muted-foreground">Avg Response</div>
                  <div className="text-2xl font-bold">
                    {data.url?.averageResponseTime
                      ? `${Math.round(data.url.averageResponseTime)}ms`
                      : '—'}
                  </div>
                  <div className="text-xs text-muted-foreground">response time</div>
                </div>

                {/* Last Checked */}
                <div className="rounded-lg border bg-card p-4 space-y-2">
                  <div className="text-xs text-muted-foreground">Last Checked</div>
                  <div className="text-2xl font-bold">
                    {data.url?.lastCheckedAt
                      ? formatTime(data.url.lastCheckedAt).split(' ')[0]
                      : '—'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data.url?.lastCheckedAt ? formatTime(data.url.lastCheckedAt) : 'Never'}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="mt-4">
              {!data.url?.logs || data.url.logs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No logs available yet.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-md border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Status Code</TableHead>
                        <TableHead>Error</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.url.logs.map((log) => {
                        const status = log.status ?? 'PENDING';
                        const statusColor = statusColorClasses[status] ?? statusColorClasses.PENDING;

                        return (
                          <TableRow key={log.id}>
                            <TableCell className="text-xs">
                              {formatTime(log.checkAt)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                                <Badge
                                  variant={
                                    status === 'DOWN' || status === 'ERROR'
                                      ? 'destructive'
                                      : status === 'UP'
                                      ? 'default'
                                      : 'secondary'
                                  }
                                  className="text-xs"
                                >
                                  {status}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {log.responseTime ? `${log.responseTime}ms` : '—'}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {log.statusCode ?? '—'}
                            </TableCell>
                            <TableCell className="text-xs max-w-xs truncate">
                              {log.errorMessage || log.errorType || '—'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ViewURLDialog;
