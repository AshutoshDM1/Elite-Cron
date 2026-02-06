import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = ({ rows = 3 }: { rows?: number }) => {
  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Monitor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead className="w-[25%]">Uptime</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="ml-4 h-3 w-32" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-10 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-1.5 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-6 w-16 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
