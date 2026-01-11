'use server';
/**
 * @fileOverview A natural language query runner for Firestore.
 *
 * - runQuery - A function that takes a natural language query and returns Firestore documents.
 * - RunQueryInput - The input type for the runQuery function.
 * - RunQueryOutput - The return type for the runQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  QueryConstraint,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const RunQueryInputSchema = z.object({
  queryString: z.string().describe('The natural language query to run against Firestore.'),
});
export type RunQueryInput = z.infer<typeof RunQueryInputSchema>;

export const RunQueryOutputSchema = z.object({
  results: z.array(z.any()).describe('The documents returned from the Firestore query.'),
});
export type RunQueryOutput = z.infer<typeof RunQueryOutputSchema>;

// Initialize outside the flow to leverage a single instance.
const { firestore } = initializeFirebase();

const firestoreQueryTool = ai.defineTool(
  {
    name: 'firestoreQueryTool',
    description: 'Runs a query against the Firestore database and returns the documents. Use this to answer any user question about data. The available collections are: "attestations", "tigerbeetle_accounts", and "transfers".',
    inputSchema: z.object({
      collectionName: z.enum(['attestations', 'tigerbeetle_accounts', 'transfers']).describe('The name of the collection to query.'),
      queries: z.array(z.object({
        field: z.string(),
        operator: z.enum(['<', '<=', '==', '!=', '>=', '>', 'array-contains', 'in', 'not-in', 'array-contains-any']),
        value: z.any(),
      })).optional().describe('An array of query conditions.'),
      orderBys: z.array(z.object({
        field: z.string(),
        direction: z.enum(['asc', 'desc']).optional(),
      })).optional().describe('An array of ordering conditions.'),
      limit: z.number().optional().describe('The maximum number of documents to return.'),
    }),
    outputSchema: z.any(),
  },
  async (input) => {
    if (!firestore) {
      throw new Error('Firestore is not initialized.');
    }
    
    let queryConstraints: QueryConstraint[] = [];

    if (input.queries) {
      input.queries.forEach(q => {
        queryConstraints.push(where(q.field, q.operator, q.value));
      });
    }

    if (input.orderBys) {
        input.orderBys.forEach(o => {
            queryConstraints.push(orderBy(o.field, o.direction));
        });
    }

    if (input.limit) {
        queryConstraints.push(limit(input.limit));
    }
    
    const finalQuery = query(collection(firestore, input.collectionName), ...queryConstraints);
    
    const snapshot = await getDocs(finalQuery);
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);


const queryRunnerFlow = ai.defineFlow(
  {
    name: 'queryRunnerFlow',
    inputSchema: RunQueryInputSchema,
    outputSchema: RunQueryOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a Firestore query expert. Your task is to interpret the user's request and use the provided tool to query the database.
      
User Request: "${input.queryString}"

Analyze the request and call the firestoreQueryTool with the appropriate parameters.

VERY IMPORTANT: If the user requests the "latest" or "most recent" items, or implies an ordering by time, you must use the correct timestamp field for the specified collection:
- For the 'attestations' collection, order by the 'createdAt' field, descending.
- For the 'tigerbeetle_accounts' collection, order by the 'createdAt' field, descending.
- For the 'transfers' collection, order by the 'timestamp' field, descending.

If the user does not specify a limit, do not apply one unless it is implicit in the request (e.g. "latest", "most recent" implies a small limit like 5).
`,
      tools: [firestoreQueryTool],
      model: 'googleai/gemini-2.5-flash',
    });

    const toolResponse = llmResponse.output(firestoreQueryTool.name);

    if (toolResponse) {
       return { results: toolResponse };
    }
    
    // If the model didn't use the tool but just responded with text.
    const textResponse = llmResponse.text;
    if (textResponse) {
      // This is a fallback. Ideally, we want to guide the model to always use the tool.
      // We'll return the text response wrapped in our expected output structure.
      return { results: [{ response: textResponse }] };
    }
    
    return { results: [] };
  }
);


export async function runQuery(input: RunQueryInput): Promise<RunQueryOutput> {
    return queryRunnerFlow(input);
}
