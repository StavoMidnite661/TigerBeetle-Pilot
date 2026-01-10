'use client';

import { useState } from "react";
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
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useMemoFirebase, WithId } from "@/firebase";
import { collection, orderBy, query, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { DetailsModal } from "./details-modal";


type Transfer = {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export function TransferHistoryWidget() {
    const firestore = useFirestore();
    const transfersQuery = useMemoFirebase(
      () => (firestore ? query(collection(firestore, 'transfers'), orderBy('createdAt', 'desc'), limit(10)) : null),
      [firestore]
    );
    const { data: transfers, isLoading } = useCollection<Transfer>(transfersQuery);

    const [selectedTransfer, setSelectedTransfer] = useState<WithId<Transfer> | null>(null);

    const statusVariant = {
        completed: "default",
        pending: "secondary",
        failed: "destructive",
      } as const;

  return (
    <>
        <Card className="glass-card">
        <CardHeader>
            <CardTitle>Cleared Ledger History</CardTitle>
            <CardDescription>The immutable record of recent ledger updates.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableBody>
                {isLoading && Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20 inline-block" /></TableCell>
                    </TableRow>
                ))}
                {!isLoading && transfers?.map((transfer) => (
                <TableRow key={transfer.id} onClick={() => setSelectedTransfer(transfer)} className="cursor-pointer">
                    <TableCell className="font-medium">
                        <div className="font-mono text-xs">{transfer.id}</div>
                        <div className="text-muted-foreground text-xs">{new Date(transfer.createdAt).toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                        <div>From: {transfer.fromAccountId || 'sFIAT Genesis'}</div>
                        <div>To: {transfer.toAccountId}</div>
                    </TableCell>
                    <TableCell className="text-right">
                        {transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            {!isLoading && (!transfers || transfers.length === 0) && (
                <div className="text-center p-4 text-muted-foreground">
                    No ledger updates found.
                </div>
            )}
        </CardContent>
        </Card>
        <DetailsModal
            isOpen={!!selectedTransfer}
            onClose={() => setSelectedTransfer(null)}
            title={`Transfer Details: ${selectedTransfer?.id}`}
            data={selectedTransfer}
        />
    </>
  );
}
