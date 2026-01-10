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
import { useCollection, useFirestore, useMemoFirebase, WithId } from "@/firebase";
import { Check } from "lucide-react";
import { collection, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { addDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { serverTimestamp, increment } from "firebase/firestore";


type Attestation = {
  toAccountId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'issued' | 'rejected';
  createdAt: string;
  commitmentId: string;
}

export default function AttestationsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const attestationsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'attestations'), where('status', '==', 'pending')) : null),
    [firestore]
  );
  const { data: attestations, isLoading } = useCollection<Attestation>(attestationsQuery);

  const statusVariant = {
    issued: "default",
    pending: "secondary",
    rejected: "destructive",
  } as const;

  const handleClearAttestation = async (attestation: WithId<Attestation>) => {
    if (!firestore) return;

    // 1. Create a new transfer document
    const transfersCol = collection(firestore, 'transfers');
    addDocumentNonBlocking(transfersCol, {
        fromAccountId: 'sFIAT Genesis',
        toAccountId: attestation.toAccountId,
        amount: attestation.amount,
        currency: 'USD',
        status: 'completed',
        createdAt: new Date().toISOString(), // This should ideally be a serverTimestamp
        attestationId: attestation.id,
    });

    // 2. Update the attestation status to 'issued'
    const attestationRef = doc(firestore, 'attestations', attestation.id);
    updateDocumentNonBlocking(attestationRef, {
        status: 'issued'
    });

    // 3. ATOMICALLY update the account balance on the server
    const accountRef = doc(firestore, 'tigerbeetle_accounts', attestation.toAccountId);
    
    // Use the Firestore 'increment' FieldValue for a safe, atomic update.
    // This avoids the read-then-write race condition.
    updateDocumentNonBlocking(accountRef, {
        balance: increment(attestation.amount)
    });

    toast({
        title: "Ledger Updated",
        description: `${attestation.amount} units cleared to account ${attestation.toAccountId}.`,
    })
  }

  return (
    <div className="flex-1">
      <main className="p-4 sm:p-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Attestations & Clearing</CardTitle>
            <CardDescription>
              A list of all attestations awaiting clearance. Clearing an attestation updates the ledger with the new units. This action is final.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commitment ID</TableHead>
                  <TableHead>Destination Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20 inline-block" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-9 w-36" /></TableCell>
                    </TableRow>
                ))}
                {!isLoading && attestations?.map((attestation) => (
                  <TableRow key={attestation.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {attestation.commitmentId}
                    </TableCell>
                    <TableCell>{attestation.toAccountId}</TableCell>
                    <TableCell className="text-right">
                      {attestation.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[attestation.status]}>
                        {attestation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(attestation.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {attestation.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => handleClearAttestation(attestation)}>
                          <Check className="mr-2 h-3 w-3" />
                          Clear Attestation
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {!isLoading && (!attestations || attestations.length === 0) && (
              <div className="text-center p-8 text-muted-foreground">
                No pending attestations.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
