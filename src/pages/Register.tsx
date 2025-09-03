import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    subscribe: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Слабый';
    if (strength <= 50) return 'Средний';
    if (strength <= 75) return 'Хороший';
    return 'Надежный';
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (!formData.acceptTerms) {
      alert('Необходимо принять условия использования');
      return;
    }

    setIsLoading(true);
    
    try {
      // Имитация регистрации
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration attempt:', formData);
      // Здесь будет логика регистрации
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Register with ${provider}`);
    // Здесь будет логика социальной регистрации
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">AI Photo Editor</h1>
          </Link>
          <p className="text-muted-foreground mt-2">
            Создайте свой аккаунт
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Регистрация</CardTitle>
            <CardDescription className="text-center">
              Заполните форму для создания аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Создайте надежный пароль"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Надежность пароля</span>
                      <span className={`font-medium ${
                        passwordStrength <= 25 ? 'text-red-500' :
                        passwordStrength <= 50 ? 'text-orange-500' :
                        passwordStrength <= 75 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getStrengthLabel(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getStrengthColor(passwordStrength)}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-500">Пароли не совпадают</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Я соглашаюсь с{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Условиями использования
                    </Link>{' '}
                    и{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Политикой конфиденциальности
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribe"
                    checked={formData.subscribe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, subscribe: checked as boolean }))
                    }
                  />
                  <Label htmlFor="subscribe" className="text-sm">
                    Получать новости и обновления по email
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !formData.acceptTerms}>
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                    Создание аккаунта...
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Создать аккаунт
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    или зарегистрируйтесь через
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialRegister('google')}
                  disabled={isLoading}
                >
                  <Icon name="Chrome" size={16} className="mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialRegister('github')}
                  disabled={isLoading}
                >
                  <Icon name="Github" size={16} className="mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Войти
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>Ваши данные защищены 256-битным шифрованием</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;