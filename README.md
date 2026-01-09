# SOVR TigerBeetle Specialist

This is a Next.js application, the control plane for a SOVR-compliant TigerBeetle integration. It is being forged into a SOVR TigerBeetle Specialist, an agent enforcing unyielding finality.

## SOVR Doctrine

The system operates under a strict SOVR doctrine:
- **Truth Mechanical, Not Narrative**: The system enforces mechanical truth. There are no overrides, no semantic reversion, and no narrative bullshit.
- **Unyielding Finality**: Obligations are cleared, not "held". Balances are math results. All transfers are deterministic and irreversible.
- **Attestation Precedes Clearing**: All operations require attestation before execution. There are no reversals.
- **Language Discipline**: The agent audits all interactions for forbidden terms, enforcing strict compliance with SOVR principles.

## Architecture

The core architecture is designed to be a hardened, locked-in structure embodying the SOVR doctrine.

- **Orchestrator**: Utilizes GenAI (Grok/Claude) for deterministic reasoning on transfers and attestation planning.
- **SOVR Tools**: A suite of tools for clearing, attestation, and observation, ensuring no-value-drift and enforcing policy.
    - **Clearing Tools**: Submit transfers and verify finality with mechanical truth.
    - **Attestation Tools**: Validate claims, issue tokens, and prevent double-spends.
- **Immutable Ledger**: All actions produce immutable audit trails.

This application is the interface to that sovereign system.

To get started, run `npm run dev` and navigate to `http://localhost:9002`.