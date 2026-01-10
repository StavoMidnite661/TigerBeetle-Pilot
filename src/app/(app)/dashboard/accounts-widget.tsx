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
import { collection, doc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { DetailsModal } from "./details-modal";

type Account = {
    id: string;
    userId: string;
    balance: number;
    currency: string;
    status: 'active' | 'inactive' | 'closed';
    createdAt: string;
};

export function AccountsWidget() {
  const firestore = useFirestore();
  const accountsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'tigerbeetle_accounts') : null),
    [firestore]
  );
  const { data: accounts, isLoading } = useCollection<Account>(accountsQuery);

  const [selectedAccount, setSelectedAccount] = useState<WithId<Account> | null>(null);

  const statusVariant = {
    active: "default",
    inactive: "secondary",
    closed: "destructive",
  } as const;

  return (
    <>
        <Card className="glass-card">
        <CardHeader>
            <CardTitle>Accounts</CardTitle>
            <CardDescription>A list of all accounts in the system. Click for details.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableBody>
                {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-20 inline-block" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                </TableRow>
                ))}
                {!isLoading && accounts?.map((account) => (
                <TableRow key={account.id} onClick={() => setSelectedAccount(account)} className="cursor-pointer">
                    <TableCell className="font-medium">{account.id}</TableCell>
                    <TableCell className="text-right">
                        ${(account.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                        {account.status ? (
                            <Badge variant={statusVariant[account.status] || 'secondary'}>{account.status}</Badge>
                        ) : (
                            <Badge variant="secondary">unknown</Badge>
                        )}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            {!isLoading && (!accounts || accounts.length === 0) && (
                <div className="text-center p-4 text-muted-foreground">
                    No accounts found.
                </div>
            )}
        </CardContent>
        </Card>
        <DetailsModal 
            isOpen={!!selectedAccount} 
            onClose={() => setSelectedAccount(null)}
            title={`Account Details: ${selectedAccount?.id}`}
            data={selectedAccount}
        />
    </>
  );
}
