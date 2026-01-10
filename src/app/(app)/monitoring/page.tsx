import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { e2eTests } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader, Clock } from "lucide-react";

export default function MonitoringPage() {
  const statusMeta = {
    passing: {
      icon: CheckCircle2,
      color: "text-green-500",
      label: "Passing",
    },
    failing: {
      icon: XCircle,
      color: "text-red-500",
      label: "Failing",
    },
    running: {
      icon: Loader,
      color: "text-blue-500",
      label: "Running",
    },
  };

  return (
    <div className="flex-1">
      <main className="p-4 sm:p-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>End-to-End Test Status</CardTitle>
            <CardDescription>
              Live status of automated Playwright tests for critical user flows.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {e2eTests.map((test) => {
              const meta = statusMeta[test.status];
              return (
                <Card key={test.id} className="flex flex-col glass-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-base font-medium">{test.name}</CardTitle>
                    <meta.icon className={cn("h-6 w-6", meta.color, test.status === "running" && "animate-spin")} />
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <p className={cn("text-2xl font-bold", meta.color)}>{meta.label}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Last run: {test.lastRun.toLocaleTimeString()}</span>
                      <span className="mx-1">·</span>
                      <span>{test.duration}s</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
