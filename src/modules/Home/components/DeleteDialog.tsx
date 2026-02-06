import { AlertDialog , AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";    
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import type { Cron } from "@/services/cron.service";

interface DeleteDialogProps {
  cron: Cron;
  onClick: (id: string) => void;
}

const DeleteDialog = ({ cron, onClick }: DeleteDialogProps) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        className="text-xs hover:bg-red-500 hover:text-white"
      >
        Delete
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete monitor?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <p className="text-sm text-muted-foreground">
        This will remove the cron and its monitoring data. This action
        cannot be undone.
      </p>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={() => onClick(cron.id)}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

export default DeleteDialog;