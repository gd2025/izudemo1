
-- Server-side authoritative order total: recompute total_cents from products table on insert.
-- Prevents client-side price manipulation regardless of what the client submits.
CREATE OR REPLACE FUNCTION public.enforce_order_total()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  computed_total integer := 0;
  item jsonb;
  prod_price integer;
  qty integer;
  pid uuid;
  rebuilt jsonb := '[]'::jsonb;
BEGIN
  IF NEW.items IS NULL OR jsonb_typeof(NEW.items) <> 'array' OR jsonb_array_length(NEW.items) = 0 THEN
    RAISE EXCEPTION 'Order must contain at least one item';
  END IF;

  FOR item IN SELECT * FROM jsonb_array_elements(NEW.items)
  LOOP
    pid := NULLIF(item->>'product_id','')::uuid;
    qty := COALESCE((item->>'quantity')::int, 0);
    IF pid IS NULL OR qty <= 0 THEN
      RAISE EXCEPTION 'Invalid order item';
    END IF;

    SELECT price_cents INTO prod_price FROM public.products WHERE id = pid;
    IF prod_price IS NULL THEN
      RAISE EXCEPTION 'Unknown product %', pid;
    END IF;

    computed_total := computed_total + (prod_price * qty);
    rebuilt := rebuilt || jsonb_build_array(jsonb_build_object(
      'product_id', pid,
      'quantity', qty,
      'price_cents', prod_price
    ));
  END LOOP;

  NEW.total_cents := computed_total;
  NEW.items := rebuilt;
  NEW.status := 'pending';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_order_total_trg ON public.orders;
CREATE TRIGGER enforce_order_total_trg
BEFORE INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.enforce_order_total();
