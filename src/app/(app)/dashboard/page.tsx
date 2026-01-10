import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accounts, transfers } from "@/lib/data";
import { Activity, ArrowRightLeft, DollarSign, Users } from "lucide-react";
import TransactionChart from "./transaction-chart";
import { RecentActivity } from "./recent-activity";

export default function DashboardPage() {
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
  const pendingTransfers = transfers.filter(t => t.status === 'pending').length;

  return (
    <div className="flex-1 flex flex-col background-glow">
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="text-2xl font-bold">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">Across all active accounts</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="text-2xl font-bold">{accounts.filter(a => a.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Total accounts: {accounts.length}</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Transfers</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="text-2xl font-bold">+{transfers.filter(t => t.status === 'completed').length}</div>
              <p className="text-xs text-muted-foreground">In the last 24 hours</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="text-2xl font-bold">{pendingTransfers}</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 flex flex-col glass-card">
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Volume of transactions over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pl-2">
              <TransactionChart />
            </CardContent>
          </Card>
          <Card className="col-span-3 flex flex-col glass-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>A log of recent transfers in the system.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
