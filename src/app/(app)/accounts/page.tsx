'use client';

import { Button } from "@/components/ui/button";
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
import { PlusCircle } from "lucide-react";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { doc } from 'firebase/firestore';


export default function AccountsPage() {
  const firestore = useFirestore();
  const accountsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'tigerbeetle_accounts') : null),
    [firestore]
  );
  const { data: accounts, isLoading } = useCollection(accountsQuery);

  const statusVariant = {
    active: "default",
    inactive: "secondary",
    closed: "destructive",
  } as const;

  const createNewAccount = () => {
    if (!firestore) return;
    const accountId = `acc_${Date.now()}`;
    const newAccountRef = doc(firestore, 'tigerbeetle_accounts', accountId);
    setDocumentNonBlocking(newAccountRef, {
        id: accountId,
        userId: 'user_' + Math.floor(Math.random() * 10),
        balance: 0,
        currency: 'USD',
        status: 'active',
        createdAt: new Date().toISOString(),
    }, {});
  }

  return (
    <div className="flex-1">
      <main className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">A list of all accounts in the system.</p>
          </div>
          <Button onClick={createNewAccount}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Account
          </Button>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-20 inline-block" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  </TableRow>
                ))}
                {!isLoading && accounts && accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.id}</TableCell>
                    <TableCell>{account.userId || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      ${(account.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      {account.status ? (
                        <Badge variant={statusVariant[account.status as keyof typeof statusVariant] || 'secondary'}>{account.status}</Badge>
                      ) : (
                        <Badge variant="secondary">unknown</Badge>
                      )}
                    </TableCell>
                    <TableCell>{account.createdAt ? new Date(account.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {!isLoading && (!accounts || accounts.length === 0) && (
              <div className="text-center p-8 text-muted-foreground">
                No accounts found. Create one to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
