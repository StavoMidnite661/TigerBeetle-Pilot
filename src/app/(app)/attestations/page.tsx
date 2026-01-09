import { AppHeader } from "@/components/header";
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
import { attestations } from "@/lib/data";
import { Check } from "lucide-react";

export default function AttestationsPage() {
  const statusVariant = {
    issued: "default",
    pending: "secondary",
    rejected: "destructive",
  } as const;

  return (
    <div className="flex-1">
      <AppHeader title="Attestation & Clearing" />
      <main className="p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>sFIAT Attestations</CardTitle>
            <CardDescription>
              A list of all sFIAT attestations awaiting clearance. Clearing an attestation finalizes the value transfer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attestation ID</TableHead>
                  <TableHead>Destination Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attestations.map((attestation) => (
                  <TableRow key={attestation.id}>
                    <TableCell className="font-medium">
                      {attestation.id}
                    </TableCell>
                    <TableCell>{attestation.toAccountId}</TableCell>
                    <TableCell className="text-right">
                      $
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
                      {attestation.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {attestation.status === "pending" && (
                        <Button variant="outline" size="sm">
                          <Check className="mr-2 h-3 w-3" />
                          Clear Attestation
                        </Button>
                      )}
                    </TableCell>
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
