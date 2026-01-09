# SOVR TigerBeetle Specialist

This is a Next.js application, the control plane for a SOVR-compliant TigerBeetle integration. It is being forged into a SOVR TigerBeetle Specialist, an agent enforcing unyielding finality.

## SOVR Doctrine

The system operates under a strict SOVR doctrine:
- **Truth Mechanical, Not Narrative**: The system enforces mechanical truth. There are no overrides, no semantic reversion, and no narrative bullshit.
- **Unyielding Finality**: Obligations are cleared, not "held". Balances are math results. All transfers are deterministic and irreversible.
- **Attestation Precedes Clearing**: All operations require attestation before execution. There are no reversals.
- **Language Discipline**: The agent audits all interactions for forbidden terms, enforcing strict compliance with SOVR principles.

---

## The Funding Doctrine: sFIAT

### Sustainability Without a Credit System
The core principle is that the system does not extend credit, promise redemption, or create future obligations. It settles by clearing **attested value**. Agents must never model, imply, or simulate a credit relationship.

Operationally, this means:
- **No lending or borrowing**
- **No negative balances**
- **No IOUs or future promises**
- **No "available credit"**
- **No balance sheet expansion**

### The sFIAT Mechanism
Value is introduced **only by Attestation**. This is not finance; it is mechanical truth. Value enters through explicit, external attestation events.

**sFIAT** is the formal representation of this external value commitment. It is a receipt that says, "real-world value has already been committed elsewhere." It is evidence, not money.

### What sFIAT is (Formally)
sFIAT represents:
1.  A **declared value source**.
2.  Backed by an **off-ledger real-world commitment**.
3.  Introduced only via an **explicit operator/trust authorization**.
4.  Converted into **on-ledger cleared spendable units**.
5.  Once converted, the sFIAT **disappears**. It does not live inside the system.

Only cleared balances remain. The system no longer cares "where it came from." Only conservation and balances matter.

### What sFIAT is NOT
An agent must never treat sFIAT as:
- A loan or credit
- A balance that can go negative
- A redeemable promise
- A stablecoin
- A claim on reserves
- A liability of the system

If an agent models redemption, repayment, or backing guarantees, they are violating core doctrine.

### The Funding Flow (Exact Order)
This is the only allowed flow for introducing value:
1.  **External Value Commitment** (e.g., a wire transfer is confirmed)
2.  **sFIAT Attestation Event** (An operator creates an attestation, referencing the commitment)
3.  **Operator/Trust Authorization** (The system verifies the operator's permission)
4.  **Ledger Mint/Allocation** (This step is metaphorical; no "minting" occurs. The attestation is prepared for clearing.)
5.  **TigerBeetle Clearing** (The attestation is cleared, and the corresponding balance is updated)
6.  **Spendable Balance Exists**

**No step may be skipped.**

---

## Canonical Authority Diagram

This diagram encodes the doctrine visually and prevents agent confusion. It is the unyielding source of truth for authority flow.

```mermaid
%% sFIAT → Clearing → Spending (Canonical Flow)
flowchart TD
    %% =========================
    %% External World
    %% =========================
    EV[External Real-World<br/>Value Commitment]
        -->|Evidence| SF[sFIAT Attestation]
%% =========================
    %% Authority Gate
    %% =========================
    SF -->|Authorize| OP[Operator / Trust<br/>Authorization]
%% =========================
    %% Ledger Authority
    %% =========================
    OP -->|Mint / Allocate| TB[(TigerBeetle<br/>Clearing Ledger)]
%% =========================
    %% State Transition
    %% =========================
    TB -->|Cleared Balance| BAL[Spendable Ledger Balance]
%% =========================
    %% Execution Layer
    %% =========================
    BAL -->|Spend Request| SP[Spend Engine]
    SP -->|Honor| AD[Adapter / Merchant]
%% =========================
    %% Prohibitions
    %% =========================
    SF -.x-> SP
    SF -.x-> AD
    OP -.x-> AD
    AD -.x-> TB
%% =========================
    %% Notes
    %% =========================
    classDef authority fill:#0f172a,color:#fff,stroke:#38bdf8,stroke-width:2px
    classDef forbidden fill:#7f1d1d,color:#fff,stroke:#ef4444,stroke-width:2px
class TB authority
    class SF,SP,AD forbidden
```

### How to Read This Diagram (Agent-Safe)
- **Solid arrows (→)**: ✅ Allowed authority flow
- **Dashed red arrows (-.x->)**: ❌ Forbidden authority shortcuts

### Key Authority Rules Encoded
1.  **sFIAT Is a Gate — Not a Balance**
    *   sFIAT never touches:
        *   Spend Engine
        *   Adapters
        *   Ledger balances
    *   If an agent draws a path from sFIAT to spending → they’re wrong.

2.  **TigerBeetle Is the Sole Clearing Authority**
    *   Only TigerBeetle can create:
        *   Spendable balances
    *   No adapter, narrative, or service may bypass it.

3.  **Honoring Is Downstream Only**
    *   Adapters act *after* clearing.
    *   Honoring failure does not roll back clearing.

4.  **No Reverse Authority**
    *   Adapters cannot mutate ledger state.
    *   Operators cannot honor.
    *   Clients cannot clear.

Any code path not representable by this diagram is invalid by definition.

---

## Architecture

The core architecture is a hardened, locked-in structure embodying the SOVR doctrine.

- **Orchestrator**: Utilizes GenAI for deterministic reasoning on transfers and attestation planning.
- **SOVR Tools**: A suite of tools for clearing, attestation, and observation, ensuring no-value-drift and enforcing policy.
    - **Clearing Tools**: Submit transfers and verify finality with mechanical truth.
    - **Attestation Tools**: Validate claims, issue tokens, and prevent double-spends.
- **Immutable Ledger**: All actions produce immutable audit trails.

This application is the interface to that sovereign system.

To get started, run `npm run dev` and navigate to `http://localhost:9002`.
