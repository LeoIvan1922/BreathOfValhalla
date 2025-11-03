import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  gradient?: string;
}

export function CategoryCard({ icon: Icon, title, count, gradient = "gradient-primary" }: CategoryCardProps) {
  return (
    <Card className="group overflow-hidden hover-lift hover-glow-fuchsia cursor-pointer card-glass hover:z-10 relative">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-slow`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-balance">{title}</h3>
        <p className="text-muted-foreground text-sm">{count} розіграшів</p>
      </CardContent>
    </Card>
  );
}