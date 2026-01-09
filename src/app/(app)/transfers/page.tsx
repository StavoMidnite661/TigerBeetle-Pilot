import { AppHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ShieldCheck } from "lucide-react";

export default function TransfersPage() {
    const statusVariant = {
        completed: "default",
        pending: "secondary",
        failed: "destructive",
      } as const;

  return (
    <div className="flex-1">
      <AppHeader title="Funding (sFIAT)" />
      <main className="p-4 sm:p-6 grid gap-6 md:grid-cols-5">
        <div className="md:col-span-2 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create sFIAT Attestation</CardTitle>
              <CardDescription>Introduce value into the system by creating an sFIAT attestation. This is a receipt for an external value commitment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to-account">Destination Account</Label>
                <Input id="to-account" placeholder="Account ID to be credited" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="commitment-id">External Commitment ID</Label>
                <Input id="commitment-id" placeholder="e.g., Wire Transfer ID" />
              </div>
              <Button className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Create Attestation
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3 lg:col-span-4">
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
        </div>
      </main>
    </div>
  );
}
