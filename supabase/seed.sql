create extension if not exists pgcrypto with schema extensions;

insert into public.admins (name, email, password_hash)
values (
  'Admin User',
  'admin@example.com',
  extensions.crypt('ChangeMe123!', extensions.gen_salt('bf', 12))
)
on conflict (email) do nothing;

insert into public.products (name, category, price, stock_status)
select seed.name, seed.category, seed.price, seed.stock_status::public.enum_products_stock_status
from (
  values
  ('Wireless Mouse', 'Accessories', 29.99, 'IN_STOCK'),
  ('Mechanical Keyboard', 'Accessories', 89.99, 'LOW_STOCK'),
  ('USB-C Docking Station', 'Electronics', 129.50, 'IN_STOCK'),
  ('Noise Cancelling Headphones', 'Audio', 199.99, 'OUT_OF_STOCK'),
  ('Adjustable Laptop Stand', 'Office', 45.00, 'IN_STOCK')
) as seed(name, category, price, stock_status)
where not exists (
  select 1
  from public.products
  where products.name = seed.name
);
