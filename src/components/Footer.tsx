import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook,Send, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    "Компанія": [
      { title: "Про нас", href: "#" },
      { title: "Як це працює", href: "#" },
      { title: "Наша команда", href: "#" },
      { title: "Кар'єра", href: "#" },
    ],
    "Підтримка": [
      { title: "Центр допомоги", href: "#" },
      { title: "Контакти", href: "#" },
      { title: "Часті питання", href: "#" },
      { title: "Безпека", href: "#" },
    ],
    "Правові": [
      { title: "Політика конфіденційності", href: "#" },
      { title: "Умови використання", href: "#" },
      { title: "Правила лотерей", href: "#" },
      { title: "Відповідальна гра", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Send , href: "#", label: "Send" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-card border-t border-border/40 bg-slate-800 backdrop-blur supports-[backdrop-filter]:bg-slate-800/85">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="gradient-primary bg-clip-text text-transparent">Breath</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Ваш надійний партнер у світі лотерей та призів. 
              Створюємо мрії та втілюємо їх у реальність.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Підпишіться на новини</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Отримуйте інформацію про нові лотереї та спеціальні пропозиції
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Ваша електронна пошта"
                className="flex-1"
              />
              <Button variant="gold">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Телефон</p>
                <p className="text-muted-foreground text-sm">+38 (044) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground text-sm">support@breath.ua</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Адреса</p>
                <p className="text-muted-foreground text-sm">м. Тернопіль, вул. Тісна, 1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Breath. Всі права захищені.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Ліцензія №123456</span>
            <span>•</span>
            <span>18+ Відповідальна гра</span>
          </div>
        </div>
      </div>
    </footer>
  );
}