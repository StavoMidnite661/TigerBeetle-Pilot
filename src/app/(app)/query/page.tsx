'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Play, Loader } from "lucide-react";
import { runQuery, type RunQueryOutput } from "@/ai/flows/query-runner-flow";
import { Skeleton } from "@/components/ui/skeleton";

export default function QueryPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RunQueryOutput | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await runQuery({ queryString: query });
      setResults(response);
    } catch (e) {
      console.error(e);
      setResults({ results: [{ error: "An error occurred while running the query." }] });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1">
      <main className="p-4 sm:p-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Query Runner</CardTitle>
            <CardDescription>
              Directly interact with the ledger system using natural language.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g., show me the 5 most recent attestations that are pending"
              className="min-h-[120px] font-mono"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isLoading || !query}>
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Run Query
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Results</h3>
              <div className="p-4 bg-muted/50 rounded-lg min-h-[200px] max-h-[50vh] overflow-y-auto">
                {isLoading && <Skeleton className="h-24 w-full" />}
                {!isLoading && !results && (
                  <pre className="text-sm text-muted-foreground">
                    Query results will appear here.
                  </pre>
                )}
                {!isLoading && results && (
                  <>
                    {results.results.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No results found.</p>
                    ) : (
                      <pre className="text-sm">
                        {JSON.stringify(results.results, null, 2)}
                      </pre>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
