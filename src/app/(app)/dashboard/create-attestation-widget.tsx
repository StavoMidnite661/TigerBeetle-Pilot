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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

const formSchema = z.object({
  toAccountId: z.string().min(1, "Destination account is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  commitmentId: z.string().min(1, "External commitment ID is required."),
});

export function CreateAttestationWidget() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toAccountId: "",
      amount: 0,
      commitmentId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) return;
    
    const attestationsCol = collection(firestore, "attestations");
    addDocumentNonBlocking(attestationsCol, {
      ...values,
      status: "pending",
      createdAt: new Date().toISOString(),
      currency: "USD",
    });

    toast({
        title: "Attestation Submitted",
        description: `An attestation for ${values.amount} units is pending clearance.`,
    });

    form.reset();
  }

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="font-headline">Create sFIAT Attestation</CardTitle>
        <CardDescription>
          Attest to a sacrifice of value in the real world (e.g., burned TXID) to introduce units to the ledger.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="toAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Account</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Account ID to be credited"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (Units)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commitmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Commitment ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Burn TXID, Wire ID"
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>
                    The verifiable proof of your real-world value sacrifice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full btn-gradient text-black" disabled={form.formState.isSubmitting}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Create Attestation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
