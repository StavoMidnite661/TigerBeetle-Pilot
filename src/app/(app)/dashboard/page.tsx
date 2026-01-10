import { CreateAttestationWidget } from "./create-attestation-widget";
import { AccountsWidget } from "./accounts-widget";
import { AttestationsWidget } from "./attestations-widget";
import { TransferHistoryWidget } from "./transfer-history-widget";

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column for primary actions */}
          <div className="lg:col-span-1 space-y-6">
            <CreateAttestationWidget />
          </div>

          {/* Right column for data and lists */}
          <div className="lg:col-span-2 space-y-6">
            <AttestationsWidget />
            <AccountsWidget />
            <TransferHistoryWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
