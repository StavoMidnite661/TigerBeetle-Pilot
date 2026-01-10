'use client';

import { useState } from "react";
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
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useMemoFirebase, WithId } from "@/firebase";
import { Check } from "lucide-react";
import { collection, query, where, doc, increment } from "firebase/firestore";
import { addDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { DetailsModal } from "./details-modal";


type Attestation = {
  toAccountId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'issued' | 'rejected';
  createdAt: string;
  commitmentId: string;
}

export function AttestationsWidget() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const attestationsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'attestations'), where('status', '==', 'pending')) : null),
    [firestore]
  );
  const { data: attestations, isLoading } = useCollection<Attestation>(attestationsQuery);

  const [selectedAttestation, setSelectedAttestation] = useState<WithId<Attestation> | null>(null);

  const handleClearAttestation = (attestation: WithId<Attestation>) => {
    if (!firestore) return;

    addDocumentNonBlocking(collection(firestore, 'transfers'), {
        fromAccountId: 'sFIAT Genesis',
        toAccountId: attestation.toAccountId,
        amount: attestation.amount,
        currency: 'USD',
        status: 'completed',
        createdAt: new Date().toISOString(),
        attestationId: attestation.id,
    });

    updateDocumentNonBlocking(doc(firestore, 'attestations', attestation.id), {
        status: 'issued'
    });
    
    updateDocumentNonBlocking(doc(firestore, 'tigerbeetle_accounts', attestation.toAccountId), {
        balance: increment(attestation.amount)
    });

    toast({
        title: "Ledger Updated",
        description: `${attestation.amount} units cleared to account ${attestation.toAccountId}.`,
    })
  }

  return (
    <>
        <Card className="glass-card">
        <CardHeader>
            <CardTitle>Pending Attestations</CardTitle>
            <CardDescription>
            Attestations awaiting clearance. Clearing an attestation is final.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableBody>
                {isLoading && Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20 inline-block" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-9 w-24" /></TableCell>
                    </TableRow>
                ))}
                {!isLoading && attestations?.map((attestation) => (
                <TableRow key={attestation.id} >
                    <TableCell className="font-medium cursor-pointer" onClick={() => setSelectedAttestation(attestation)}>
                        <div className="font-mono text-xs">{attestation.commitmentId}</div>
                        <div className="text-muted-foreground text-xs">{attestation.toAccountId}</div>
                    </TableCell>
                    <TableCell className="text-right cursor-pointer" onClick={() => setSelectedAttestation(attestation)}>
                    {attestation.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                    </TableCell>
                    <TableCell className="text-right">
                    {attestation.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => handleClearAttestation(attestation)}>
                        <Check className="mr-2 h-3 w-3" />
                        Clear
                        </Button>
                    )}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            {!isLoading && (!attestations || attestations.length === 0) && (
            <div className="text-center p-4 text-muted-foreground">
                No pending attestations.
            </div>
            )}
        </CardContent>
        </Card>
        <DetailsModal 
            isOpen={!!selectedAttestation} 
            onClose={() => setSelectedAttestation(null)}
            title={`Attestation Details: ${selectedAttestation?.commitmentId}`}
            data={selectedAttestation}
        />
    </>
  );
}
