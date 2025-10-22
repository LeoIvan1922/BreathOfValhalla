import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Loader as Loader2, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { signIn, signUp, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  
  // Стан для форми входу
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Стан для форми реєстрації
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInData.email || !signInData.password) {
      toast({
        title: 'Помилка',
        description: 'Будь ласка, заповніть всі поля',
        variant: 'destructive'
      });
      return;
    }

    try {
      await signIn(signInData.email, signInData.password);
      toast({
        title: 'Успішно!',
        description: 'Ви успішно увійшли в систему'
      });
      onOpenChange(false);
      setSignInData({ email: '', password: '' });
    } catch (error: any) {
      toast({
        title: 'Помилка входу',
        description: error.message || 'Невірний email або пароль',
        variant: 'destructive'
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      toast({
        title: 'Помилка',
        description: 'Будь ласка, заповніть всі обов\'язкові поля',
        variant: 'destructive'
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: 'Помилка',
        description: 'Паролі не співпадають',
        variant: 'destructive'
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: 'Помилка',
        description: 'Пароль повинен містити мінімум 6 символів',
        variant: 'destructive'
      });
      return;
    }

    try {
      await signUp(signUpData.email, signUpData.password, signUpData.fullName);
      toast({
        title: 'Успішно!',
        description: 'Акаунт створено. Перевірте email для підтвердження'
      });
      onOpenChange(false);
      setSignUpData({ email: '', password: '', confirmPassword: '', fullName: '' });
    } catch (error: any) {
      toast({
        title: 'Помилка реєстрації',
        description: error.message || 'Не вдалося створити акаунт',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Вхід до системи
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Вхід</TabsTrigger>
            <TabsTrigger value="signup">Реєстрація</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Вхід...
                  </>
                ) : (
                  'Увійти'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Повне ім'я (необов'язково)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Ваше повне ім'я"
                    className="pl-10"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Підтвердження паролю</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Реєстрація...
                  </>
                ) : (
                  'Зареєструватися'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}