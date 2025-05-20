// components/HydrationGate.tsx
"use client";
import BarLoader from "@/components/BarLoader";
import { useAllStoresHydrated } from "@/hooks/useAllStoresHydrated";

export function HydrationGate({ children }: { children: React.ReactNode }) {
  const allHydrated = useAllStoresHydrated();

  if (!allHydrated) {
    return <BarLoader />;
  }

  return <>{children}</>;
}
