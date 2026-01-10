import { transfers } from "@/lib/data";
import { ArrowRightLeft } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {transfers.slice(0, 5).map(transfer => (
        <div key={transfer.id} className="flex items-center p-2 rounded-lg transition-colors hover:bg-white/10">
          <div className="p-2 bg-white/10 rounded-full mr-4">
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium leading-none">
              Transfer of ${transfer.amount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              From {transfer.fromAccountId} to {transfer.toAccountId}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {transfer.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
    </div>
  );
}
