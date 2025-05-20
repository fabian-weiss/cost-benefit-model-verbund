// hooks/useAllStoresHydrated.ts
import { useEnvironmentalStore } from "@/stores/useEnvironmentalStore";
import { useFinancialStore } from "@/stores/useFinancialStore";
import { useOverviewStore } from "@/stores/useOverviewStore";
import { useRioStore } from "@/stores/useRioStore";
import { useSocietalStore } from "@/stores/useSocietalStore";
// import other stores as needed

export function useAllStoresHydrated() {
  const overviewHydrated = useOverviewStore((state) => state.hasHydrated);
  const financialHydrated = useFinancialStore((state) => state.hasHydrated);
  const societalHydrated = useSocietalStore((state) => state.hasHydrated);
  const environmentalHydrated = useEnvironmentalStore(
    (state) => state.hasHydrated
  );
  const rioHydrated = useRioStore((state) => state.hasHydrated);

  return (
    overviewHydrated &&
    financialHydrated &&
    societalHydrated &&
    environmentalHydrated &&
    rioHydrated
  );
}
