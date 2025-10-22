import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";

interface LotteryCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
  endTime: Date;
  category: string;
  featured?: boolean;
}

export function LotteryCard({
  title,
  description,
  image,
  ticketPrice,
  totalTickets,
  soldTickets,
  endTime,
  category,
  featured = false,
}: LotteryCardProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}д ${hours}г ${minutes}х ${seconds}с`);
      } else {
        setTimeLeft("Завершено");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const progressPercentage = (soldTickets / totalTickets) * 100;

  return (
    <Card className={`group overflow-hidden hover-lift hover-glow-fuchsia ${featured ? 'ring-2 ring-accent glow-gold' : ''} card-glass`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
           <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              {category}
            </Badge>
          </div>
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge className="gradient-gold animate-pulse-slow">
                <TrendingUp className="w-3 h-3 mr-1" />
                Популярний
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg mb-2 text-balance">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Прогрес продажів</span>
            <span className="text-sm font-medium">{soldTickets}/{totalTickets}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {timeLeft}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {soldTickets} учасників
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-accent">{ticketPrice}₴</span>
          <span className="text-sm text-muted-foreground ml-1">за квиток</span>
        </div>
        <Button 
          variant={featured ? "gold" : "default"} 
          size="sm"
          className="min-w-[120px]"
        >
          Купити квиток
        </Button>
      </CardFooter>
    </Card>
  );
}
