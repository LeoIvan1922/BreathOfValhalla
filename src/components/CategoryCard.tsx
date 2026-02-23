import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  count: number;
  gradient?: string;
}

export function CategoryCard({ id, icon: Icon, title, count, gradient = "gradient-primary" }: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="group overflow-hidden hover-lift hover-glow-fuchsia cursor-pointer card-glass hover:z-10 relative transition-all"
    >
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-slow transition-all`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-balance">{title}</h3>
        <p className="text-muted-foreground text-sm">{count} розіграшів</p>
      </CardContent>
    </Card>
  );
}