import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppHeader } from "@/components/header";
import { accounts, transfers } from "@/lib/data";
import { Activity, ArrowRightLeft, DollarSign, Users } from "lucide-react";
import TransactionChart from "./transaction-chart";

export default function DashboardPage() {
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
  const pendingTransfers = transfers.filter(t => t.status === 'pending').length;

  return (
    <div className="flex-1">
      <AppHeader title="Dashboard" />
      <main className="p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">Across all active accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accounts.filter(a => a.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Total accounts: {accounts.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Transfers</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{transfers.filter(t => t.status === 'completed').length}</div>
              <p className="text-xs text-muted-foreground">In the last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTransfers}</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Volume of transactions over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <TransactionChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>A log of recent transfers in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transfers.slice(0, 5).map(transfer => (
                  <div key={transfer.id} className="flex items-center">
                    <ArrowRightLeft className="h-6 w-6 text-muted-foreground mr-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        Transfer of ${transfer.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        From {transfer.fromAccountId} to {transfer.toAccountId}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transfer.createdAt.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
