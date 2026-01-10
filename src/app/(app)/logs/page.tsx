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
import { logs } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function LogsPage() {
  const levelColors = {
    INFO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    WARN: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    ERROR: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    DEBUG: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  return (
    <div className="flex-1">
      <main className="p-4 sm:p-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Live Log Stream</CardTitle>
            <CardDescription>
              A real-time stream of logs from all system services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[150px]">Service</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground">
                      {log.timestamp.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn("border-transparent", levelColors[log.level])}
                      >
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.service}</TableCell>
                    <TableCell className="font-mono text-sm">{log.message}</TableCell>
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
