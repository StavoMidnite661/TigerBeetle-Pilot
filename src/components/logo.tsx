import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground", className)}>
        <span className="text-xl font-bold">S</span>
    </div>
  );
}
