/*
  # Заповнення початковими даними

  1. Категорії
    - Додаємо основні категорії лотерей з іконками та градієнтами

  2. Тестові лотереї
    - Створюємо кілька тестових лотерей для демонстрації

  3. Примітки
    - Дані можна змінювати через адмін панель
    - Зображення використовують placeholder URL
*/

-- Вставка категорій
INSERT INTO categories (name, description, icon, gradient) VALUES
  ('Нерухомість', 'Квартири, будинки та комерційна нерухомість', 'Home', 'gradient-primary'),
  ('Транспорт', 'Автомобілі, мотоцикли та інший транспорт', 'Car', 'gradient-gold'),
  ('Електроніка', 'Смартфони, ноутбуки та гаджети', 'Smartphone', 'gradient-primary'),
  ('Ювелірні вироби', 'Золото, срібло та коштовності', 'Gem', 'gradient-gold'),
  ('Краса', 'Косметика та засоби по догляду', 'Palette', 'gradient-primary'),
  ('Дитячі товари', 'Іграшки та товари для дітей', 'Baby', 'gradient-gold'),
  ('Спорт', 'Спортивне обладнання та інвентар', 'Dumbbell', 'gradient-primary'),
  ('Ремонт', 'Інструменти та будівельні матеріали', 'Wrench', 'gradient-gold'),
  ('Послуги', 'Різноманітні послуги та сертифікати', 'Briefcase', 'gradient-primary'),
  ('Подорожі', 'Путівки та туристичні послуги', 'Plane', 'gradient-gold'),
  ('Розваги', 'Квитки на концерти та заходи', 'Music', 'gradient-primary'),
  ('Ігри', 'Ігрові консолі та відеоігри', 'Gamepad2', 'gradient-gold')
ON CONFLICT DO NOTHING;

-- Отримуємо ID категорій для використання в лотереях
DO $$
DECLARE
  transport_id uuid;
  real_estate_id uuid;
  electronics_id uuid;
  travel_id uuid;
BEGIN
  SELECT id INTO transport_id FROM categories WHERE name = 'Транспорт' LIMIT 1;
  SELECT id INTO real_estate_id FROM categories WHERE name = 'Нерухомість' LIMIT 1;
  SELECT id INTO electronics_id FROM categories WHERE name = 'Електроніка' LIMIT 1;
  SELECT id INTO travel_id FROM categories WHERE name = 'Подорожі' LIMIT 1;

  -- Вставка тестових лотерей
  INSERT INTO lotteries (
    title, 
    description, 
    image_url, 
    category_id, 
    ticket_price, 
    total_tickets, 
    sold_tickets, 
    end_time, 
    featured
  ) VALUES
    (
      'BMW XM 2025',
      'Розкішний позашляховик з повним приводом та преміум інтер''єром',
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      transport_id,
      150,
      5000,
      3247,
      now() + interval '5 days',
      true
    ),
    (
      'Квартира в ЖК "Метрополіс"',
      '2-кімнатна квартира 65м² в центрі міста з сучасним ремонтом',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      real_estate_id,
      200,
      3000,
      1890,
      now() + interval '7 days',
      false
    ),
    (
      'iPhone 15 Pro Max',
      'Найновіший флагман Apple з титановим корпусом та камерою 48MP',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
      electronics_id,
      50,
      8000,
      6234,
      now() + interval '3 days',
      true
    ),
    (
      'Відпочинок на Мальдівах',
      'Тижневе перебування в 5-зірковому готелі з повним пансіоном',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
      travel_id,
      100,
      2000,
      967,
      now() + interval '10 days',
      false
    );
END $$;