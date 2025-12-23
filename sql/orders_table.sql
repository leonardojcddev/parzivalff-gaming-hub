-- Crear enum para el estado del pedido
CREATE TYPE public.order_status AS ENUM ('pending', 'completed', 'cancelled');

-- Crear tabla de pedidos
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  name text NOT NULL, -- nombre de la oferta seleccionada
  price decimal(10,2) NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Política: usuarios pueden ver sus propios pedidos
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Política: usuarios pueden crear sus propios pedidos
CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Política: admins pueden ver todos los pedidos
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Política: admins pueden actualizar cualquier pedido
CREATE POLICY "Admins can update all orders" ON public.orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Índices para mejor rendimiento
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
