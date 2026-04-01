import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrategicHeader } from "@/components/strategic/StrategicHeader";
import { StrategicKPIs } from "@/components/strategic/StrategicKPIs";
import { PautaTable } from "@/components/strategic/PautaTable";
import { CostPerResultTrendChart } from "@/components/strategic/CostPerResultTrendChart";
import { PerformanceByChannelChart } from "@/components/strategic/PerformanceByChannelChart";
import { InvestmentByChannelChart } from "@/components/strategic/InvestmentByChannelChart";
import { PerformanceByCampaignTypeChart } from "@/components/strategic/PerformanceByCampaignTypeChart";
import { AnalyticsSummary } from "@/components/strategic/AnalyticsSummary";
import { StrategicFilters } from "@/components/strategic/StrategicFilters";
import { useMetrics } from "@/hooks/useMetrics";
import type { MetricRow } from "@/hooks/useMetrics";
import { parseDate } from "@/hooks/useDateFilters";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountryFlag } from "@/components/ui/country-flag";
import { brands } from "@/data/mock-data";
import type { StrategicFiltersState } from "@/types/strategic";

const queryClient = new QueryClient();

const ALL_COUNTRIES = [
  { code: "EC", name: "Ecuador" },
  { code: "GT", name: "Guatemala" },
  { code: "COL", name: "Colombia" },
  { code: "RD", name: "Rep. Dominicana" },
  { code: "CR", name: "Costa Rica" },
];

// Mapeo de codigo interno de marca → codigo del API
const BRAND_COUNTRY_MAP: Record<string, string> = {
  COL: "COL",
  ECU: "EC",
  RD: "RD",
  GUA: "GT",
  CRI: "CR",
};

function getApiCountriesForBrand(brandSlug: string): string[] {
  const brand = brands.find((b) => b.slug === brandSlug);
  if (!brand || brand.countries.length === 0) return ["EC"];
  return brand.countries
    .map((c) => BRAND_COUNTRY_MAP[c])
    .filter((c): c is string => !!c);
}

function getFirstApiCountry(brandSlug: string): string {
  const countries = getApiCountriesForBrand(brandSlug);
  return countries[0] ?? "EC";
}

interface EstrategicoViewProps {
  brandSlug?: string
}

// Banner de contexto: avisa que los datos del webhook son por pais, no por marca
interface ContextBannerProps {
  brandName: string
  countryName: string
}

function ContextBanner({ brandName, countryName }: ContextBannerProps) {
  return (
    <div
      className="mx-4 mb-4 px-4 py-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs leading-relaxed"
      role="note"
      aria-label="Nota sobre el alcance de los datos"
    >
      <span className="font-semibold">Nota sobre los datos de pauta:</span>{" "}
      Los datos provienen del consolidado por pais via n8n. Mostrando datos de{" "}
      <span className="font-semibold">{countryName}</span> — incluye todas las marcas del grupo en ese pais.
      Para datos exclusivos de{" "}
      <span className="font-semibold">{brandName}</span>, conecta el API de Google/Meta Ads directamente.
    </div>
  );
}

function EstrategicoViewInner({ brandSlug }: EstrategicoViewProps) {
  const { data, isLoading, lastUpdated, refetch } = useMetrics();
  const { convert, getCurrencyForCountry } = useCurrencyConverter();

  // Si viene brandSlug, preseleccionar el primer pais de esa marca
  const initialCountry = brandSlug ? getFirstApiCountry(brandSlug) : "EC";
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [filters, setFilters] = useState<StrategicFiltersState>({
    dateFrom: undefined,
    dateTo: undefined,
    countries: [],
    channels: [],
    campaignTypes: [],
    sortBy: "fecha",
    sortOrder: "desc",
  });

  const [groupByCampaign, setGroupByCampaign] = useState(false);

  const targetCurrency = useMemo(() => {
    return getCurrencyForCountry(selectedCountry);
  }, [selectedCountry, getCurrencyForCountry]);

  // Paises disponibles en el selector de tabs:
  // - Con brandSlug: solo los paises de esa marca
  // - Sin brandSlug (dashboard global): todos los paises
  const availableCountries = useMemo(() => {
    if (!brandSlug) return ALL_COUNTRIES;
    const brandApiCodes = getApiCountriesForBrand(brandSlug);
    return ALL_COUNTRIES.filter((c) => brandApiCodes.includes(c.code));
  }, [brandSlug]);

  // Nombre de la marca actual para el banner
  const currentBrand = useMemo(() => {
    if (!brandSlug) return null;
    return brands.find((b) => b.slug === brandSlug) ?? null;
  }, [brandSlug]);

  // Nombre del pais seleccionado
  const currentCountryName = useMemo(() => {
    return ALL_COUNTRIES.find((c) => c.code === selectedCountry)?.name ?? selectedCountry;
  }, [selectedCountry]);

  const filterOptions = useMemo(() => {
    const rows = data?.rows?.filter(r => r.pais === selectedCountry) || [];
    return {
      countries: [...new Set(rows.map(r => r.pais))].filter(Boolean),
      channels: [...new Set(rows.map(r => r.canal))].filter(Boolean) as string[],
      campaignTypes: [...new Set(rows.map(r => r.tipoCampana))].filter(Boolean) as string[],
    };
  }, [data?.rows, selectedCountry]);

  const filteredRows = useMemo(() => {
    let rows = (data?.rows || []).filter(row => row.pais === selectedCountry);

    if (filters.dateFrom || filters.dateTo) {
      rows = rows.filter(row => {
        const rowDate = parseDate(row.fecha);
        if (!rowDate) return true;
        if (filters.dateFrom && rowDate < filters.dateFrom) return false;
        if (filters.dateTo && rowDate > filters.dateTo) return false;
        return true;
      });
    }

    if (filters.channels.length > 0) {
      rows = rows.filter(row => row.canal && filters.channels.includes(row.canal));
    }

    if (filters.campaignTypes.length > 0) {
      rows = rows.filter(row => row.tipoCampana && filters.campaignTypes.includes(row.tipoCampana));
    }

    rows = rows.map(row => {
      const fromCurrency = row.moneda || "USD";
      if (fromCurrency === targetCurrency) return row;

      return {
        ...row,
        inversion: convert(row.inversion, fromCurrency, targetCurrency),
        cpl: convert(row.cpl, fromCurrency, targetCurrency),
        cpa: row.cpa ? convert(row.cpa, fromCurrency, targetCurrency) : undefined,
        cpc: row.cpc ? convert(row.cpc, fromCurrency, targetCurrency) : undefined,
        moneda: targetCurrency,
      };
    });

    if (groupByCampaign) {
      const grouped = rows.reduce((acc, row) => {
        const key = row.campana || row.canal || "Sin campana";
        if (!acc[key]) {
          acc[key] = {
            ...row,
            campana: key,
            leads: 0,
            inversion: 0,
            impresiones: 0,
            clicks: 0,
            alcance: 0,
            _count: 0,
            _ctrSum: 0,
          };
        }
        acc[key].leads += row.leads;
        acc[key].inversion += row.inversion;
        acc[key].impresiones = (acc[key].impresiones || 0) + (row.impresiones || 0);
        acc[key].clicks = (acc[key].clicks || 0) + (row.clicks || 0);
        acc[key].alcance = (acc[key].alcance || 0) + (row.alcance || 0);
        acc[key]._count += 1;
        acc[key]._ctrSum += row.ctr;
        return acc;
      }, {} as Record<string, MetricRow & { _count: number; _ctrSum: number }>);

      rows = Object.values(grouped).map(g => ({
        ...g,
        ctr: g._ctrSum / g._count,
        cpl: g.leads > 0 ? g.inversion / g.leads : 0,
        cpa: g.leads > 0 ? g.inversion / g.leads : undefined,
      }));
    }

    rows = [...rows].sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (filters.sortBy) {
        case "inversion":
          aVal = a.inversion;
          bVal = b.inversion;
          break;
        case "leads":
          aVal = a.leads;
          bVal = b.leads;
          break;
        case "ctr":
          aVal = a.ctr;
          bVal = b.ctr;
          break;
        case "cpa":
          aVal = a.cpa || 0;
          bVal = b.cpa || 0;
          break;
        case "fecha":
        default:
          aVal = a.fecha;
          bVal = b.fecha;
          break;
      }

      if (filters.sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return rows;
  }, [data?.rows, selectedCountry, filters, groupByCampaign, targetCurrency, convert]);

  const cpaAlert = useMemo(() => {
    if (filteredRows.length < 2) return null;
    const sorted = [...filteredRows].sort((a, b) => a.fecha.localeCompare(b.fecha));
    const recent = sorted[sorted.length - 1];
    const previous = sorted[sorted.length - 2];

    if (recent.cpa && previous.cpa && previous.cpa > 0) {
      const increase = ((recent.cpa - previous.cpa) / previous.cpa) * 100;
      if (increase > 20) {
        return {
          increase: increase.toFixed(1),
          current: recent.cpa,
          previous: previous.cpa,
        };
      }
    }
    return null;
  }, [filteredRows]);

  // Cambio de pais: si hay brandSlug, solo permite los paises de la marca
  const handleCountryChange = (country: string) => {
    if (!brandSlug) {
      setSelectedCountry(country);
      return;
    }
    const brandApiCodes = getApiCountriesForBrand(brandSlug);
    if (brandApiCodes.includes(country)) {
      setSelectedCountry(country);
    }
  };

  return (
    // SidebarProvider es requerido por StrategicFilters (usa Sidebar de shadcn/ui)
    // Se remueven min-h-screen y el <main> interno para no romper el layout del dashboard
    <SidebarProvider>
      <div className="flex w-full min-h-0">
        <StrategicFilters
          filters={filters}
          onFiltersChange={setFilters}
          options={filterOptions}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <StrategicHeader
            lastUpdated={lastUpdated}
            isLoading={isLoading}
            onRefresh={refetch}
            cpaAlert={cpaAlert}
          />

          {/* Selector de pais — z-20 para no solaparse con header del dashboard (z-10) */}
          <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-sm">
            <div className="px-4 py-3">
              <Tabs value={selectedCountry} onValueChange={handleCountryChange}>
                <TabsList
                  className="bg-slate-800/50"
                  style={{ display: "grid", width: "100%", gridTemplateColumns: `repeat(${availableCountries.length}, 1fr)` }}
                >
                  {availableCountries.map((country) => (
                    <TabsTrigger
                      key={country.code}
                      value={country.code}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                    >
                      <CountryFlag code={country.code} size="md" />
                      <span className="hidden sm:inline ml-1.5">{country.name}</span>
                      <span className="sm:hidden ml-1">{country.code}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Banner de contexto: solo visible dentro de una marca especifica */}
          {brandSlug && currentBrand && (
            <div className="px-0 pt-4">
              <ContextBanner
                brandName={currentBrand.name}
                countryName={currentCountryName}
              />
            </div>
          )}

          <div className="flex-1 p-4 lg:p-6 space-y-6">
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  KPIs en Tiempo Real
                  <span className="text-sm font-normal text-slate-400">
                    (en {targetCurrency})
                  </span>
                </h2>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="group-campaign"
                    checked={groupByCampaign}
                    onCheckedChange={setGroupByCampaign}
                  />
                  <Label htmlFor="group-campaign" className="text-sm text-slate-300">
                    Agrupar por campana
                  </Label>
                </div>
              </div>
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-xl bg-slate-800" />
                  ))}
                </div>
              ) : (
                <StrategicKPIs data={filteredRows} currency={targetCurrency} />
              )}
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">
                Resumen Analitico
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl bg-slate-800" />
                  ))}
                </div>
              ) : (
                <AnalyticsSummary data={filteredRows} />
              )}
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">
                Analisis Visual
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[300px] rounded-xl bg-slate-800" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <CostPerResultTrendChart data={filteredRows} currency={targetCurrency} />
                  <PerformanceByChannelChart data={filteredRows} currency={targetCurrency} />
                  <InvestmentByChannelChart data={filteredRows} />
                  <PerformanceByCampaignTypeChart data={filteredRows} currency={targetCurrency} />
                </div>
              )}
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">
                Tabla Detallada de Pauta
              </h2>
              {isLoading ? (
                <Skeleton className="h-[400px] rounded-xl bg-slate-800" />
              ) : (
                <PautaTable data={filteredRows} onRefresh={refetch} />
              )}
            </section>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function EstrategicoView({ brandSlug }: EstrategicoViewProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <EstrategicoViewInner brandSlug={brandSlug} />
    </QueryClientProvider>
  );
}
