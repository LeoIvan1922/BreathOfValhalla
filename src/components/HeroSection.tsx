import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Gift } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-2 overflow-hidden">
      <div className="container mx-auto px-0 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-0 gradient-gold text-lg px-6 py-3 animate-pulse-slow">
            <Sparkles className="w-5 h-5 mr-2" />
            Найкращі лотереї України
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-0 leading-tight">
            Виграйте свою <span className="gradient-primary bg-clip-text text-transparent">мрію</span> вже сьогодні!
          </h1>
          
          <p className="text-xl text-gold mb-4 max-w-2xl mx-auto">
            Приєднуйтесь до тисяч щасливчиків, які вже виграли автомобілі, квартири та інші неймовірні призи
          </p>

          {/*<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="gold" className="text-lg px-8 py-4">
              <Gift className="w-5 h-5 mr-2" />
              Переглянути лотереї
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Users className="w-5 h-5 mr-2" />
              Наші переможці
            </Button>
          </div>
           CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-6">
            <Button 
              size="lg" 
              variant="premium" 
              className="text-lg px-8 py-3 h-auto"
            >
              <Gift className="w-5 h-5 mr-2" />
              Ознайомтеся з лотереями
            </Button>
            <Button 
              size="lg" 
              variant="gold" 
              className="text-lg px-8 py-3 h-auto"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Приєднатись зараз
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 max-w-3xl mx-auto">
            <div className="card-glass p-2 rounded-lg hover-lift">
              <div className="w-12 h-6 gradient-gold rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">1000+ призів</h3>
              <p className="text-white  text-sm">Щомісяця розігруємо сотні цінних призів</p>
            </div>

            <div className="card-glass p-2 rounded-lg hover-lift">
              <div className="w-12 h-6 gradient-gold rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">50,000+ учасників</h3>
              <p className="text-white  text-sm">Приєднуйтесь до великої спільноти</p>
            </div>

            <div className="card-glass p-2 rounded-lg hover-lift">
              <div className="w-12 h-6 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% чесно</h3>
              <p className="text-white text-sm">Прозорі розіграші з відеофіксацією</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}