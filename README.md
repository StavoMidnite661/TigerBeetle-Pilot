Typically, the commands you would run from your terminal in the project directory are:

Initialize a Git repository (if you haven't already):
git init

Add all the files to be tracked:
git add .

Create your first commit:
git commit -m "Initial commit of SOVR Credit Terminal"

Connect your local repository to your remote GitHub repository and push the code:
git remote add origin <your-repository-url>
git push -u origin main

Once you do that, your code will appear on GitHub, and you'll be ready for the final deployment steps.



# SOVR-UI: The Sovereign Value Attestation Platform

## Overview

SOVR-UI is the user-facing control plane for a new economic system built on the principles of sovereign value and cryptographic truth. It provides a dashboard for interacting with a sovereign ledger, specifically for creating and managing **sFIAT Attestations**.

This application is built on the core idea that real-world value sacrifices (e.g., payments, labor, energy expenditure) can be verifiably attested to and brought on-chain as a new asset class, referred to as sFIAT (sovereign Fiat).

This UI connects to a Firebase backend (Firestore for data, Auth for identity) and is designed to interact with a TigerBeetle cluster for final, deterministic transaction settlement. The system is architected to be a permissionless, peer-to-peer financial network where the creation of value is decentralized.

## Key Concepts

- **Attestation:** A cryptographically signed claim that a specific, real-world value sacrifice has occurred.
- **sFIAT:** A sovereign digital asset representing a claim on real-world value. Its value is derived from the proof of sacrifice it is associated with.
- **Commitment ID:** A unique identifier from a legacy system (e.g., a bank transaction ID, an invoice number) that serves as the proof of sacrifice.

## Technical Architecture

- **Framework:** Next.js 14
- **UI:** React, Shadcn UI, Tailwind CSS
- **Backend as a Service (BaaS):** Firebase (Authentication and Firestore)
- **Deployment:** Vercel (Recommended)

## Installation and Setup

Follow these steps to get the application running locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

This project uses Firebase for its backend. You will need to create a Firebase project and get your configuration credentials.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In your project settings, add a new Web App.
3. Copy the `firebaseConfig` object values.

Create a new file named `.env.local` in the root of the project. Paste your Firebase credentials into this file in the following format:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIz...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
```

**Note:** This `.env.local` file is already listed in `.gitignore` and will not be committed to your repository.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

This application is optimized for deployment on Vercel.

1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Import to Vercel:** Go to your Vercel dashboard and import the repository.
3.  **Configure Environment Variables:** During the import process, Vercel will ask for environment variables. Copy the contents of your `.env.local` file and paste them into the Vercel configuration.
4.  **Deploy:** Click the "Deploy" button. Vercel will automatically build and deploy your application.

