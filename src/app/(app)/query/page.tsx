import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Play } from "lucide-react";

export default function QueryPage() {
  return (
    <div className="flex-1">
      <main className="p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Query Runner</CardTitle>
            <CardDescription>
              Directly interact with the TigerBeetle database. Use with caution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g., get_account_balances(account_ids=[1001, 1002])"
              className="min-h-[200px] font-mono"
            />
            <div className="flex justify-end">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Run Query
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Results</h3>
              <div className="p-4 bg-muted rounded-lg min-h-[150px]">
                <pre className="text-sm text-muted-foreground">
                  Query results will appear here.
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
