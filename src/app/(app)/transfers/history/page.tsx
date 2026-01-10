'use client';

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
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

type Transfer = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export default function TransferHistoryPage() {
    const firestore = useFirestore();
    const transfersQuery = useMemoFirebase(
      () => (firestore ? query(collection(firestore, 'transfers'), orderBy('createdAt', 'desc')) : null),
      [firestore]
    );
    const { data: transfers, isLoading } = useCollection<Transfer>(transfersQuery);

    const statusVariant = {
        completed: "default",
        pending: "secondary",
        failed: "destructive",
      } as const;

  return (
    <div className="flex-1">
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
                {isLoading && Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20 inline-block" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    </TableRow>
                ))}
                {!isLoading && transfers?.map((transfer) => (
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
                    <TableCell>{new Date(transfer.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!isLoading && (!transfers || transfers.length === 0) && (
                <div className="text-center p-8 text-muted-foreground">
                    No transfers found.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
