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
import { ShieldCheck } from "lucide-react";

export default function TransfersPage() {
  return (
    <div className="flex-1">
      <AppHeader title="Funding (sFIAT)" />
      <main className="p-4 sm:p-6 flex justify-center">
        <div className="w-full max-w-md">
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
      </main>
    </div>
  );
}
