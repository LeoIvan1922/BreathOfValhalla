/*
  # Create products table for marketplace

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key to categories)
      - `name` (text) - назва товару
      - `description` (text) - опис товару
      - `image_url` (text) - URL зображення товару
      - `price` (integer) - ціна товару в гривнях
      - `rating` (numeric) - оцінка товару (0-5)
      - `reviews_count` (integer) - кількість відгуків
      - `in_stock` (boolean) - наявність товару
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  rating numeric DEFAULT 5.0,
  reviews_count integer DEFAULT 0,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);
