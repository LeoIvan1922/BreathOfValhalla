import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { toast } from "@/hooks/use-toast";

export function Header() {
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsMenuOpen(false); // Закриваємо мобільне меню
      await signOut();
      toast({
        title: 'Успішно!',
        description: 'Ви успішно вийшли з системи'
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: 'Помилка',
        description: error?.message || 'Не вдалося вийти з системи',
        variant: 'destructive'
      });
    }
  };

  const navItems = [
    { title: "Головна", href: "#", active: true },
    { title: "Категорії", href: "#categories" },
    { title: "Наші переможці", href: "#winners" },
    { title: "Мої квитки", href: "#tickets" },
    { title: "Профіль", href: "#profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-slate-800 backdrop-blur supports-[backdrop-filter]:bg-slate-800/89">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FC2100] to-[#FC2847]">BREATH of WIND</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`text-xl font-semibold transition-colors hover:text-accent ${
                  item.active ? "text-accent" : "text-primary-foreground/80"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Wallet and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Wallet Balance */}
            {isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-2 card-glass px-3 py-2 rounded-lg">
                <Wallet className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {profile?.wallet_balance?.toFixed(2) || '0.00'}₴
                </span>
              </div>
            )}

            {/* User Actions */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4" />
                  <span className="max-w-32 truncate">{profile?.full_name || user?.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  disabled={loading}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {loading ? 'Вихід...' : 'Вийти'}
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setAuthModalOpen(true)}>
                  Увійти
                </Button>
                <Button variant="gold" size="sm" onClick={() => setAuthModalOpen(true)}>
                  Реєстрація
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#FF7F50] px-2 py-1 ${
                    item.active ? "text-[#FF7F50]" : "text-primary-foreground/80"
                  }`}
                >
                  {item.title}
                </a>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">
                        {profile?.wallet_balance?.toFixed(2) || '0.00'}₴
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm">{profile?.full_name || user?.email}</span>
                      <Button variant="outline" size="sm" onClick={handleSignOut}>
                        Вийти
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setAuthModalOpen(true)}>
                      Увійти
                    </Button>
                    <Button variant="gold" size="sm" onClick={() => setAuthModalOpen(true)}>
                      Реєстрація
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}

        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    </header>
  );
}
