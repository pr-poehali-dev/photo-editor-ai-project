import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogin?: (email: string, password: string) => void;
  onRegister?: (name: string, email: string, password: string) => void;
  onLogout?: () => void;
}

const Header = ({ user, onLogin, onRegister, onLogout }: HeaderProps) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Главная', href: '/', icon: 'Home' },
    { name: 'Генерация', href: '/generate', icon: 'Sparkles' },
    { name: 'Редактирование', href: '/editor', icon: 'Edit' },
    { name: 'Улучшение', href: '/enhance', icon: 'Zap' },
    { name: 'Галерея', href: '/gallery', icon: 'Image' },
    { name: 'Тарифы', href: '/pricing', icon: 'CreditCard' },
  ];

  const handleLogin = () => {
    if (onLogin) {
      onLogin(loginData.email, loginData.password);
      setLoginData({ email: '', password: '' });
    }
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister(registerData.name, registerData.email, registerData.password);
      setRegisterData({ name: '', email: '', password: '' });
    }
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">AI Photo Editor</h1>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Icon name={item.icon as any} size={16} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Icon name="User" className="mr-2 h-4 w-4" />
                    Личный кабинет
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Icon name="Settings" className="mr-2 h-4 w-4" />
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    <Icon name="LogOut" className="mr-2 h-4 w-4" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">Войти</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Вход в аккаунт</DialogTitle>
                      <DialogDescription>
                        Войдите в свой аккаунт или создайте новый
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="your@email.com"
                              value={loginData.email}
                              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Пароль</Label>
                            <Input
                              id="login-password"
                              type="password"
                              value={loginData.password}
                              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                            />
                          </div>
                          <Button onClick={handleLogin} className="w-full">
                            <Icon name="LogIn" size={16} className="mr-2" />
                            Войти
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="register">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="register-name">Имя</Label>
                            <Input
                              id="register-name"
                              placeholder="Ваше имя"
                              value={registerData.name}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-email">Email</Label>
                            <Input
                              id="register-email"
                              type="email"
                              placeholder="your@email.com"
                              value={registerData.email}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-password">Пароль</Label>
                            <Input
                              id="register-password"
                              type="password"
                              value={registerData.password}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                            />
                          </div>
                          <Button onClick={handleRegister} className="w-full">
                            <Icon name="UserPlus" size={16} className="mr-2" />
                            Создать аккаунт
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
                <Button size="sm">Начать бесплатно</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;