export type Account = {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'closed';
  createdAt: Date;
};

export type Transfer = {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
};

export type Attestation = {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'issued' | 'rejected';
  createdAt: Date;
};

export type Log = {
  id: string;
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
};

export type E2ETest = {
  id: string;
  name: string;
  status: 'passing' | 'failing' | 'running';
  lastRun: Date;
  duration: number; // in seconds
};

export const accounts: Account[] = [
  { id: '1001', userId: 'user_1', balance: 50000.00, currency: 'USD', status: 'active', createdAt: new Date('2023-01-15T09:30:00Z') },
  { id: '1002', userId: 'user_2', balance: 120000.50, currency: 'USD', status: 'active', createdAt: new Date('2023-02-20T14:00:00Z') },
  { id: '1003', userId: 'user_3', balance: 7500.25, currency: 'USD', status: 'active', createdAt: new Date('2023-03-10T11:45:00Z') },
  { id: '1004', userId: 'user_1', balance: 0.00, currency: 'USD', status: 'closed', createdAt: new Date('2023-04-05T18:00:00Z') },
  { id: '1005', userId: 'user_4', balance: 250000.00, currency: 'USD', status: 'active', createdAt: new Date('2023-05-21T08:00:00Z') },
  { id: '1006', userId: 'user_5', balance: 10.00, currency: 'USD', status: 'inactive', createdAt: new Date('2023-06-18T22:10:00Z') },
];

export const transfers: Transfer[] = [
  { id: 't_001', fromAccountId: '1001', toAccountId: '1002', amount: 1500.00, currency: 'USD', status: 'completed', createdAt: new Date() },
  { id: 't_002', fromAccountId: '1002', toAccountId: '1005', amount: 25000.00, currency: 'USD', status: 'completed', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
  { id: 't_003', fromAccountId: '1003', toAccountId: '1001', amount: 500.00, currency: 'USD', status: 'pending', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: 't_004', fromAccountId: '1005', toAccountId: '1004', amount: 100.00, currency: 'USD', status: 'failed', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: 't_005', fromAccountId: '1001', toAccountId: '1003', amount: 750.50, currency: 'USD', status: 'completed', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
];

export const attestations: Attestation[] = [
    { id: 'att_001', fromAccountId: '1003', toAccountId: '1001', amount: 500.00, currency: 'USD', status: 'pending', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 'att_002', fromAccountId: '1001', toAccountId: '1005', amount: 10000.00, currency: 'USD', status: 'issued', createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) },
    { id: 'att_003', fromAccountId: '1002', toAccountId: '1003', amount: 250.00, currency: 'USD', status: 'pending', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: 'att_004', fromAccountId: '1005', toAccountId: '1001', amount: 5000.00, currency: 'USD', status: 'rejected', createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000) },
];

export const logs: Log[] = [
  { id: 'l_1', timestamp: new Date(), level: 'INFO', service: 'api-gateway', message: 'Request received: POST /transfers' },
  { id: 'l_2', timestamp: new Date(Date.now() - 2000), level: 'DEBUG', service: 'transaction-service', message: 'Initiating transfer t_003 from 1003 to 1001' },
  { id: 'l_3', timestamp: new Date(Date.now() - 5000), level: 'WARN', service: 'auth-service', message: 'Token for user_2 nearing expiration' },
  { id: 'l_4', timestamp: new Date(Date.now() - 10000), level: 'INFO', service: 'api-gateway', message: 'Health check OK' },
  { id: 'l_5', timestamp: new Date(Date.now() - 15000), level: 'ERROR', service: 'transaction-service', message: 'Failed to acquire lock for account 1004' },
  { id: 'l_6', timestamp: new Date(Date.now() - 25000), level: 'INFO', service: 'transaction-service', message: 'Transfer t_002 completed successfully.' },
  { id: 'l_7', timestamp: new Date(Date.now() - 35000), level: 'DEBUG', service: 'database-connector', message: 'Connection to cluster-_primary established' },
];

export const e2eTests: E2ETest[] = [
  { id: 'e2e_1', name: 'User Authentication Flow', status: 'passing', lastRun: new Date(Date.now() - 5 * 60 * 1000), duration: 45 },
  { id: 'e2e_2', name: 'Account Creation', status: 'passing', lastRun: new Date(Date.now() - 5 * 60 * 1000), duration: 32 },
  { id: 'e2e_3', name: 'Transaction Submission', status: 'failing', lastRun: new Date(Date.now() - 2 * 60 * 1000), duration: 68 },
  { id: 'e2e_4', name: 'API Latency Check', status: 'passing', lastRun: new Date(Date.now() - 5 * 60 * 1000), duration: 15 },
  { id: 'e2e_5', name: 'Data Consistency Check', status: 'running', lastRun: new Date(), duration: 120 },
];

export const transactionVolume = [
  { date: "2024-07-01", volume: 230 },
  { date: "2024-07-02", volume: 345 },
  { date: "2024-07-03", volume: 450 },
  { date: "2024-07-04", volume: 320 },
  { date: "2024-07-05", volume: 510 },
  { date: "2024-07-06", volume: 480 },
  { date: "2024-07-07", volume: 620 },
];
