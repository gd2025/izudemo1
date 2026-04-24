ALTER TABLE public.products ADD COLUMN IF NOT EXISTS moods text[] DEFAULT ARRAY[]::text[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS fabric text;
CREATE INDEX IF NOT EXISTS idx_products_moods ON public.products USING gin(moods);