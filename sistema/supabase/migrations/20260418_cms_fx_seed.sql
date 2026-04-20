-- ============================================================================
-- Migration: 20260418 — Seed brands + fx_rates
-- Requiere:  20260418_cms_foundations.sql ya aplicada
-- Descripción:
--   1) Inserta las 10 marcas del Grupo Effi en admin_effix_brands
--   2) Sembra TRMs iniciales para CRC, COP, DOP, GTQ (USD = 1.0 se resuelve directo)
--
-- Las TRMs iniciales son aproximaciones de mercado al 2026-04-17.
-- Podés ajustarlas luego desde la UI (Admin → FX rates) o re-ejecutando con
-- valores reales del BCCR / Banrep / Banco Central RD / Banguat.
-- Idempotente.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1) Marcas del Grupo Effi
-- ----------------------------------------------------------------------------
insert into public.admin_effix_brands (slug, name, countries, color_primary, active, display_order, metadata)
values
  ('feria-effix',        'Feria Effix 2026',    array['COL'],                       '#C9A84C', true, 10,
   '{"vertical":"Evento ecommerce","evento":true}'::jsonb),
  ('efficommerce',       'EffiCommerce',        array['COL','ECU','RD','CRI'],      '#0E2A47', true, 20,
   '{"vertical":"Software ecommerce + logistica"}'::jsonb),
  ('effi-system',        'Effi System',         array['COL','ECU','RD','GUA','CRI'], '#0E2A47', true, 30,
   '{"vertical":"Sistemas / ERP"}'::jsonb),
  ('effi-living',        'Effi Living',         array['COL'],                       '#1BC49C', true, 40,
   '{"vertical":"Lifestyle / hogar"}'::jsonb),
  ('effiwoman',          'EffiWoman',           array['COL'],                       '#E91E63', true, 50,
   '{"vertical":"Empoderamiento femenino"}'::jsonb),
  ('efficaex',           'Efficaex',            array['GUA','CRI'],                 '#C9A84C', true, 60,
   '{"vertical":"Evento ecommerce Centroamerica"}'::jsonb),
  ('sara-montoya',       'Sara Montoya',        array['COL'],                       '#F5B700', true, 70,
   '{"vertical":"Marca personal CEO"}'::jsonb),
  ('juan-carmona',       'Juan Carmona',        array['COL'],                       '#F5B700', true, 80,
   '{"vertical":"Marca personal lider"}'::jsonb),
  ('oswaldo-alarcon',    'Oswaldo Alarcon',     array['COL'],                       '#F5B700', true, 90,
   '{"vertical":"Marca personal lider"}'::jsonb),
  ('grupo-effi-eventos', 'Grupo Effi Eventos',  array['COL'],                       '#0E2A47', true, 100,
   '{"vertical":"Eventos generales"}'::jsonb)
on conflict (slug) do update
  set name = excluded.name,
      countries = excluded.countries,
      color_primary = excluded.color_primary,
      metadata = excluded.metadata,
      updated_at = now();


-- ----------------------------------------------------------------------------
-- 2) Tipos de cambio iniciales (USD base)
--    rate_usd representa: 1 unidad local * rate_usd = USD
--    Ej CRC: 1 colón = 0.001923 USD (≈ 520 CRC por USD)
-- ----------------------------------------------------------------------------

-- Tasas de referencia al 2026-04-17 (aproximadas — ajustar con reales)
insert into public.admin_effix_fx_rates (date, currency, rate_usd, source, metadata)
values
  -- Costa Rica: ~520 CRC por USD
  ('2026-04-17', 'CRC', 0.001923, 'manual', '{"ref":"BCCR aprox"}'::jsonb),
  -- Colombia: ~4,000 COP por USD
  ('2026-04-17', 'COP', 0.000250, 'manual', '{"ref":"Banrep aprox"}'::jsonb),
  -- Rep. Dominicana: ~60 DOP por USD
  ('2026-04-17', 'DOP', 0.016667, 'manual', '{"ref":"BCRD aprox"}'::jsonb),
  -- Guatemala: ~7.75 GTQ por USD
  ('2026-04-17', 'GTQ', 0.129032, 'manual', '{"ref":"Banguat aprox"}'::jsonb),
  -- Ecuador: USD oficial
  ('2026-04-17', 'USD', 1.000000, 'manual', '{"ref":"oficial"}'::jsonb)
on conflict (date, currency) do nothing;


-- Sembrar los últimos 30 días con la misma tasa (el equipo actualiza manualmente
-- las que cambian diariamente antes de registrar spend en esas fechas).
-- Esto evita que el trigger validate_spend_usd falle por falta de TRM en el primer mes.
insert into public.admin_effix_fx_rates (date, currency, rate_usd, source, metadata)
select
  d::date,
  c.currency,
  c.rate_usd,
  'manual',
  '{"ref":"seed inicial — actualizar con tasa real"}'::jsonb
from generate_series('2026-03-18'::date, '2026-04-16'::date, '1 day'::interval) d
cross join (
  values
    ('CRC'::text, 0.001923::numeric),
    ('COP', 0.000250),
    ('DOP', 0.016667),
    ('GTQ', 0.129032),
    ('USD', 1.000000)
) c (currency, rate_usd)
on conflict (date, currency) do nothing;


-- ----------------------------------------------------------------------------
-- 3) Reporte post-seed
-- ----------------------------------------------------------------------------
do $$
declare
  total_brands integer;
  total_rates integer;
  total_currencies integer;
begin
  select count(*) into total_brands from public.admin_effix_brands;
  select count(*) into total_rates from public.admin_effix_fx_rates;
  select count(distinct currency) into total_currencies from public.admin_effix_fx_rates;

  raise notice 'CMS seed aplicado';
  raise notice '  Marcas:       %', total_brands;
  raise notice '  FX rates:     %', total_rates;
  raise notice '  Currencies:   %', total_currencies;

  if total_brands < 10 then
    raise warning 'Menos de 10 marcas. Revisar seed.';
  end if;
end $$;
