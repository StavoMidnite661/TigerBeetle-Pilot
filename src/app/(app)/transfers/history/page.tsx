import { AppHeader } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transfers } from "@/lib/data";

export default function TransferHistoryPage() {
    const statusVariant = {
        completed: "default",
        pending: "secondary",
        failed: "destructive",
      } as const;

  return (
    <div className="flex-1">
      <AppHeader title="Transfer History" />
      <main className="p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Cleared Transfers (Ledger)</CardTitle>
            <CardDescription>The immutable record of all cleared transfers. Value enters the system via sFIAT and is cleared here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transfer ID</TableHead>
                  <TableHead>From Account</TableHead>
                  <TableHead>To Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.id}</TableCell>
                    <TableCell>{transfer.fromAccountId || 'sFIAT Genesis'}</TableCell>
                    <TableCell>{transfer.toAccountId}</TableCell>
                    <TableCell className="text-right">
                      ${transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                      <TableCell>
                    <Badge variant={statusVariant[transfer.status]}>{transfer.status}</Badge>
                  </TableCell>
                    <TableCell>{transfer.createdAt.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
