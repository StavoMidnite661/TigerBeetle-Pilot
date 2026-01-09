import { AppHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { KeyRound, Server } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1">
      <AppHeader title="Settings" />
      <main className="p-4 sm:p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <CardTitle>Connection</CardTitle>
            </div>
            <CardDescription>
              Configure the connection to your TigerBeetle cluster.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cluster-id">Cluster ID</Label>
              <Input id="cluster-id" value="0" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="replica-addresses">Replica Addresses</Label>
              <Input
                id="replica-addresses"
                value="127.0.0.1:3001"
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                <CardTitle>Credentials</CardTitle>
            </div>
            <CardDescription>
              Manage API keys and security credentials for accessing TigerBeetle.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" value="tb_key_****************" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-secret">API Secret</Label>
              <Input id="api-secret" type="password" value="**************" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Enhance your account security with additional measures.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="mfa" className="text-base">Multi-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Require a second factor to perform sensitive actions.
                </p>
              </div>
              <Switch id="mfa" aria-label="Toggle Multi-Factor Authentication" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
               <div>
                <Label className="text-base">Password</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Change your account password.
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
