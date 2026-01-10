'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type DetailsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: object | null;
}

export function DetailsModal({ isOpen, onClose, title, data }: DetailsModalProps) {

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4">
            <pre className="text-sm bg-muted/50 p-4 rounded-lg">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
