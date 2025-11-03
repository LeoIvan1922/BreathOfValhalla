import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryCard } from "@/components/CategoryCard";
import { LotteryCard } from "@/components/LotteryCard";
import { Footer } from "@/components/Footer";
import { useCategories, useLotteries } from "@/hooks/useLotteries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Gift, Crown, Trophy, Star } from "lucide-react";
import * as Icons from "lucide-react";

const Index = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { lotteries: activeLotteries, loading: lotteriesLoading } = useLotteries({ 
    status: 'active',
    limit: 8 
  });

  // Функція для отримання іконки з назви
  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Gift;
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_640.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Header />
        
        <main>
          <HeroSection />

        {/* Categories Section */}
        <section id="categories" className="py-2 bg-background backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-2">
              <Badge className="mb-2 gradient-gold text-lg px-6 py-3">
                <Gift className="w-6 h-6 mr-3" />
                Категорії призів
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-0">
                Оберіть свою <span className="gradient-primary bg-clip-text text-transparent">мрію</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Від нерухомості до електроніки - знайдіть лотерею своєї мрії серед наших категорій
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="py-4">
                {categoriesLoading ? (
                  // Показуємо скелетон під час завантаження
                  Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 px-2">
                      <div className="card-glass rounded-lg p-6 animate-pulse">
                        <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4" />
                        <div className="h-4 bg-muted rounded mb-2" />
                        <div className="h-3 bg-muted rounded w-2/3 mx-auto" />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  categories.map((category, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 px-2">
                    <CategoryCard 
                      icon={getIconComponent(category.icon)}
                      title={category.name}
                      count={0} // TODO: Додати підрахунок лотерей по категорії
                      gradient={category.gradient || 'gradient-primary'}
                    />
                  </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Active Lotteries Section */}
        <section className="py-16 bg-background/15 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 gradient-primary text-lg px-6 py-3">
                <Trophy className="w-6 h-6 mr-3" />
                Активні розіграші
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Гарячі <span className="gradient-gold bg-clip-text text-transparent">розіграші</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Не пропустіть можливість виграти неймовірні призи у наших найпопулярніших розіграшах
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {lotteriesLoading ? (
                // Показуємо скелетон під час завантаження
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="card-glass rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-2 bg-muted rounded" />
                      <div className="flex justify-between">
                        <div className="h-8 w-20 bg-muted rounded" />
                        <div className="h-8 w-24 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                activeLotteries.map((lottery) => (
                  <LotteryCard 
                    key={lottery.id} 
                    id={lottery.id}
                    title={lottery.title}
                    description={lottery.description}
                    image={lottery.image_url}
                    ticketPrice={lottery.ticket_price}
                    totalTickets={lottery.total_tickets}
                    soldTickets={lottery.sold_tickets || 0}
                    endTime={new Date(lottery.end_time)}
                    category={lottery.categories?.name || 'Без категорії'}
                    featured={lottery.featured || false}
                  />
                ))
              )}
            </div>

            <div className="text-center">
              <Button variant="default" size="lg">
                Переглянути всі розіграші
                <Star className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="py-16 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 gradient-gold text-lg px-6 py-3">
                <Crown className="w-6 h-6 mr-3" />
                Маркетплейс
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Купуйте товари <span className="gradient-primary bg-clip-text text-transparent">прямо зараз</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Не хочете чекати на розіграш? Купуйте товари напряму за спеціальними цінами
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeLotteries.slice(0, 3).map((item) => (
                <div key={`market-${item.id}`} className="card-glass rounded-lg overflow-hidden group hover-lift hover-glow-fuchsia">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3 bg-accent/90">
                      Купити зараз
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-accent">
                          {(item.ticket_price * item.total_tickets * 0.8).toLocaleString()}₴
                        </span>
                        <div className="text-sm text-muted-foreground line-through">
                          {(item.ticket_price * item.total_tickets).toLocaleString()}₴
                        </div>
                      </div>
                      <Button variant="gold">
                        Купити зараз
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;