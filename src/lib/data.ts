// This file is now deprecated as we are using live data from Firestore.
// It is kept for reference but is no longer used by the application.

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

export const accounts: Account[] = [];
export const transfers: Transfer[] = [];
export const attestations: Attestation[] = [];
export const logs: Log[] = [];
export const e2eTests: E2ETest[] = [];
export const transactionVolume = [];
