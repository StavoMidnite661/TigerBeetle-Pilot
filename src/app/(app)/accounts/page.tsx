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
import { accounts } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function AccountsPage() {
  const statusVariant = {
    active: "default",
    inactive: "secondary",
    closed: "destructive",
  } as const;

  return (
    <div className="flex-1">
      <AppHeader title="Accounts">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Account
        </Button>
      </AppHeader>
      <main className="p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Accounts</CardTitle>
            <CardDescription>A list of all accounts in the system.</CardDescription>
          </CardHeader>
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
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.id}</TableCell>
                    <TableCell>{account.userId}</TableCell>
                    <TableCell className="text-right">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[account.status]}>{account.status}</Badge>
                    </TableCell>
                    <TableCell>{account.createdAt.toLocaleDateString()}</TableCell>
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
