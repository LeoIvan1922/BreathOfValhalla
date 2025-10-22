/*
  # Створення схеми для лотерейної системи

  1. Нові таблиці
    - `categories` - категорії лотерей (нерухомість, транспорт, електроніка тощо)
    - `lotteries` - основна таблиця лотерей з усією інформацією про розіграші
    - `tickets` - квитки користувачів
    - `winners` - переможці лотерей
    - `user_profiles` - профілі користувачів з додатковою інформацією

  2. Безпека
    - Увімкнено RLS для всіх таблиць
    - Додано політики для автентифікованих користувачів
    - Користувачі можуть читати свої дані та публічну інформацію

  3. Зміни
    - Створено індекси для оптимізації запитів
    - Додано тригери для автоматичного оновлення timestamps
    - Встановлено зовнішні ключі для забезпечення цілісності даних
*/

-- Створення таблиці категорій
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text NOT NULL,
  gradient text DEFAULT 'gradient-primary',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Створення таблиці лотерей
CREATE TABLE IF NOT EXISTS lotteries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  ticket_price integer NOT NULL DEFAULT 0,
  total_tickets integer NOT NULL DEFAULT 0,
  sold_tickets integer DEFAULT 0,
  start_time timestamptz DEFAULT now(),
  end_time timestamptz NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Створення таблиці профілів користувачів
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  wallet_balance decimal(10,2) DEFAULT 0.00,
  phone text,
  date_of_birth date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Створення таблиці квитків
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lottery_id uuid REFERENCES lotteries(id) ON DELETE CASCADE,
  ticket_number text NOT NULL,
  purchase_price integer NOT NULL,
  purchased_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'winner', 'expired'))
);

-- Створення таблиці переможців
CREATE TABLE IF NOT EXISTS winners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lottery_id uuid REFERENCES lotteries(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ticket_id uuid REFERENCES tickets(id) ON DELETE CASCADE,
  prize_description text NOT NULL,
  won_at timestamptz DEFAULT now(),
  claimed boolean DEFAULT false,
  claimed_at timestamptz
);

-- Створення індексів для оптимізації
CREATE INDEX IF NOT EXISTS idx_lotteries_category ON lotteries(category_id);
CREATE INDEX IF NOT EXISTS idx_lotteries_status ON lotteries(status);
CREATE INDEX IF NOT EXISTS idx_lotteries_end_time ON lotteries(end_time);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_lottery ON tickets(lottery_id);
CREATE INDEX IF NOT EXISTS idx_winners_lottery ON winners(lottery_id);
CREATE INDEX IF NOT EXISTS idx_winners_user ON winners(user_id);

-- Увімкнення RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lotteries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Політики для categories (публічне читання)
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  USING (true);

-- Політики для lotteries (публічне читання)
CREATE POLICY "Lotteries are viewable by everyone"
  ON lotteries
  FOR SELECT
  USING (true);

-- Політики для user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Політики для tickets
CREATE POLICY "Users can view own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Політики для winners (публічне читання, але обмежена інформація)
CREATE POLICY "Winners are viewable by everyone"
  ON winners
  FOR SELECT
  USING (true);

-- Функція для автоматичного оновлення updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Тригери для автоматичного оновлення updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lotteries_updated_at
  BEFORE UPDATE ON lotteries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Функція для автоматичного створення профілю користувача
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Тригер для створення профілю при реєстрації
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();