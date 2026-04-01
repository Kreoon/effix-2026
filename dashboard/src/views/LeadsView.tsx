import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StickyFilters } from "@/components/leads/StickyFilters";
import { PautaKPIs } from "@/components/leads/PautaKPIs";
import { LeadsChart } from "@/components/leads/LeadsChart";
import { LeadsPautaVsCommercialsChart } from "@/components/leads/LeadsPautaVsCommercialsChart";
import { MetricsTable } from "@/components/leads/MetricsTable";
import { CommercialsTable } from "@/components/leads/CommercialsTable";
import { CommercialsChart } from "@/components/leads/CommercialsChart";
import { CommercialsKPIs } from "@/components/leads/CommercialsKPIs";
import { LeadStatusChart } from "@/components/leads/LeadStatusChart";
import { ClientTypeChart } from "@/components/leads/ClientTypeChart";
import { useMetrics } from "@/hooks/useMetrics";
import { parseDate } from "@/hooks/useDateFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { brands } from "@/data/mock-data";
import type { CommercialRow } from "@/hooks/useCommercials";

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

interface LeadsViewProps {
  brandSlug?: string
}

// Banner que avisa que los datos del webhook son por pais, no por marca
interface ContextBannerProps {
  brandName: string
  countryName: string
}

function ContextBanner({ brandName, countryName }: ContextBannerProps) {
  return (
    <div
      className="mx-3 mt-3 px-4 py-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs leading-relaxed"
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

function LeadsViewInner({ brandSlug }: LeadsViewProps) {
  const { data, isLoading, refetch } = useMetrics();

  // Si viene brandSlug, preseleccionar el primer pais de esa marca
  const initialCountry = brandSlug ? getFirstApiCountry(brandSlug) : "EC";
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const hasActiveFilters = !!(dateRange.from || dateRange.to);

  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  const filterDate = (date: Date | null): boolean => {
    if (!date) return false;
    if (!dateRange.from && !dateRange.to) return true;

    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dateDay = startOfDay(date);

    if (dateRange.from && dateDay < startOfDay(dateRange.from)) return false;
    if (dateRange.to && dateDay > startOfDay(dateRange.to)) return false;

    return true;
  };

  // Lista de paises disponibles para el selector:
  // - Si hay brandSlug, solo los paises de esa marca
  // - Si es el dashboard global, todos los paises
  const availableCountries = useMemo(() => {
    if (!brandSlug) return ALL_COUNTRIES;
    const brandApiCodes = getApiCountriesForBrand(brandSlug);
    return ALL_COUNTRIES.filter((c) => brandApiCodes.includes(c.code));
  }, [brandSlug]);

  // Si brandSlug esta definido, el cambio de pais solo esta disponible entre los paises de esa marca
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

  // Nombre de la marca actual para el banner
  const currentBrand = useMemo(() => {
    if (!brandSlug) return null;
    return brands.find((b) => b.slug === brandSlug) ?? null;
  }, [brandSlug]);

  // Nombre del pais seleccionado
  const currentCountryName = useMemo(() => {
    return ALL_COUNTRIES.find((c) => c.code === selectedCountry)?.name ?? selectedCountry;
  }, [selectedCountry]);

  const filteredRows = useMemo(() => {
    const countryRows = data?.rows?.filter(row => row.pais === selectedCountry) || [];

    if (!hasActiveFilters) return countryRows;

    return countryRows.filter(row => {
      const date = parseDate(row.fecha);
      return filterDate(date);
    });
  }, [data?.rows, selectedCountry, hasActiveFilters, dateRange]);

  const filteredCommercials = useMemo(() => {
    const countryCommercials = data?.commercials?.filter(row => row.pais === selectedCountry) || [];

    const filtered = hasActiveFilters
      ? countryCommercials.filter(row => {
          const date = parseDate(row.fecha);
          return filterDate(date);
        })
      : countryCommercials;

    const grouped = filtered.reduce((acc, row) => {
      const key = row.comercial;
      if (!acc[key]) {
        acc[key] = {
          comercial: row.comercial,
          pais: row.pais,
          contactos: 0,
          cuentasCerradas: 0,
          cuentasGestion: 0,
          cuentasPendiente: 0,
          cuentasDescartadas: 0,
          montoTotal: 0,
          procesoCierre: 0,
          clienteRegistrado: 0,
          noInteresado: 0,
          mercaderiaPropia: 0,
          freeEcommerce: 0,
          dropshipping: 0,
          serviciosEffi: 0,
          mixto: 0,
        };
      }
      acc[key].contactos += row.contactos;
      acc[key].cuentasCerradas += row.cuentasCerradas;
      acc[key].cuentasGestion += row.cuentasGestion;
      acc[key].cuentasPendiente += row.cuentasPendiente;
      acc[key].cuentasDescartadas += row.cuentasDescartadas;
      acc[key].montoTotal += row.montoTotal;
      acc[key].procesoCierre += row.procesoCierre ?? 0;
      acc[key].clienteRegistrado += row.clienteRegistrado ?? 0;
      acc[key].noInteresado += row.noInteresado ?? 0;
      acc[key].mercaderiaPropia += row.mercaderiaPropia ?? 0;
      acc[key].freeEcommerce += row.freeEcommerce ?? 0;
      acc[key].dropshipping += row.dropshipping ?? 0;
      acc[key].serviciosEffi += row.serviciosEffi ?? 0;
      acc[key].mixto += row.mixto ?? 0;
      return acc;
    }, {} as Record<string, CommercialRow>);

    return Object.values(grouped);
  }, [data?.commercials, selectedCountry, hasActiveFilters, dateRange]);

  const renderPautaContent = () => (
    <>
      <div className="mb-4">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl bg-slate-800" />
            ))}
          </div>
        ) : (
          <PautaKPIs data={filteredRows} commercialsData={filteredCommercials} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
          </>
        ) : (
          <>
            <LeadsChart data={filteredRows} />
            <LeadsPautaVsCommercialsChart pautaData={filteredRows} commercialsData={filteredCommercials} />
            <MetricsTable data={filteredRows} />
          </>
        )}
      </div>
    </>
  );

  const renderCommercialsContent = () => (
    <>
      <div className="mb-4">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl bg-slate-800" />
            ))}
          </div>
        ) : (
          <CommercialsKPIs data={filteredCommercials} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
          </>
        ) : (
          <>
            <LeadStatusChart data={filteredCommercials} />
            <ClientTypeChart data={filteredCommercials} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
            <Skeleton className="h-[280px] rounded-xl bg-slate-800" />
          </>
        ) : (
          <>
            <CommercialsChart data={filteredCommercials} />
            <CommercialsTable data={filteredCommercials} />
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Banner de contexto: solo se muestra cuando se esta dentro de una marca especifica */}
      {brandSlug && currentBrand && (
        <ContextBanner
          brandName={currentBrand.name}
          countryName={currentCountryName}
        />
      )}

      <StickyFilters
        countries={availableCountries}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <main className="container mx-auto px-3 py-4 max-w-[1600px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Leads & Pauta</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Metricas de captacion y desempeno de pauta digital
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={isLoading}
            className="text-sm text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
            aria-label="Actualizar datos"
          >
            {isLoading ? "Cargando..." : "Actualizar"}
          </button>
        </div>

        <section className="mb-6">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            Metricas de Pauta
          </h3>
          {renderPautaContent()}
        </section>

        <section className="mb-6">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            Performance de Comerciales
          </h3>
          {renderCommercialsContent()}
        </section>

        <footer className="text-center py-8 border-t border-slate-800 mt-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-slate-300">Grupo Effi</p>
            <p className="text-xs text-slate-500">
              Dashboard Captacion de Leads · Datos actualizados cada 4 horas
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function LeadsView({ brandSlug }: LeadsViewProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LeadsViewInner brandSlug={brandSlug} />
    </QueryClientProvider>
  );
}
