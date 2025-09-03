import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Project {
  id: string;
  name: string;
  type: 'generation' | 'editing' | 'enhancement';
  preview: string;
  createdAt: Date;
  status: 'completed' | 'processing' | 'failed';
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    imagesGenerated: 0,
    imagesEdited: 0,
    creditsUsed: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Загружаем проекты пользователя (имитация)
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Футуристический город',
        type: 'generation',
        preview: `https://picsum.photos/seed/project1/400/400`,
        createdAt: new Date(Date.now() - 86400000 * 2),
        status: 'completed'
      },
      {
        id: '2',
        name: 'Портретное фото',
        type: 'editing',
        preview: `https://picsum.photos/seed/project2/400/400`,
        createdAt: new Date(Date.now() - 86400000 * 1),
        status: 'completed'
      },
      {
        id: '3',
        name: 'Улучшение качества',
        type: 'enhancement',
        preview: `https://picsum.photos/seed/project3/400/400`,
        createdAt: new Date(),
        status: 'processing'
      }
    ];

    setProjects(mockProjects);
    setStats({
      totalProjects: mockProjects.length,
      imagesGenerated: 15,
      imagesEdited: 8,
      creditsUsed: 45
    });
  }, [user, navigate]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'generation': return 'Генерация';
      case 'editing': return 'Редактирование';
      case 'enhancement': return 'Улучшение';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'generation': return 'Sparkles';
      case 'editing': return 'Edit';
      case 'enhancement': return 'Zap';
      default: return 'Image';
    }
  };

  const planFeatures = {
    free: {
      name: 'Бесплатный',
      color: 'bg-gray-100',
      credits: 5,
      features: ['5 изображений в месяц', 'Базовые фильтры', 'Стандартное качество']
    },
    pro: {
      name: 'Профи',
      color: 'bg-gradient-to-r from-primary to-purple-600',
      credits: 100,
      features: ['100 изображений в месяц', 'Все ИИ-инструменты', '4K качество', 'API доступ']
    },
    team: {
      name: 'Команда',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
      credits: 999,
      features: ['Безлимитные изображения', 'Коллаборация', 'Приоритетная поддержка']
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header user={user} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать, {user.name}!</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge 
              className={`${planFeatures[user.plan].color} text-white px-4 py-2`}
            >
              {planFeatures[user.plan].name}
            </Badge>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-yellow-500" />
              <span className="font-medium">{user.credits} кредитов</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Всего проектов</p>
                  <p className="text-2xl font-bold">{stats.totalProjects}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={20} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Сгенерировано</p>
                  <p className="text-2xl font-bold">{stats.imagesGenerated}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Отредактировано</p>
                  <p className="text-2xl font-bold">{stats.imagesEdited}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Edit" size={20} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Использовано кредитов</p>
                  <p className="text-2xl font-bold">{stats.creditsUsed}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList>
            <TabsTrigger value="projects">Мои проекты</TabsTrigger>
            <TabsTrigger value="plan">Тарифный план</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Недавние проекты</span>
                  <Button onClick={() => navigate('/generate')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Новый проект
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="group hover:shadow-lg transition-all cursor-pointer">
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <img 
                              src={project.preview} 
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{project.name}</h3>
                              <Badge 
                                variant={project.status === 'completed' ? 'default' : 
                                        project.status === 'processing' ? 'secondary' : 'destructive'}
                              >
                                {project.status === 'completed' ? 'Готово' :
                                 project.status === 'processing' ? 'Обработка' : 'Ошибка'}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Icon name={getTypeIcon(project.type) as any} size={14} className="mr-1" />
                              <span>{getTypeLabel(project.type)}</span>
                              <span className="mx-2">•</span>
                              <span>{project.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Icon name="Image" size={48} className="mx-auto mb-4" />
                    <p>У вас пока нет проектов</p>
                    <p className="text-sm">Создайте свой первый проект!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plan" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Текущий план</CardTitle>
                  <CardDescription>
                    Ваш активный тарифный план и использование
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${planFeatures[user.plan].color} text-white`}>
                    <h3 className="text-lg font-bold">{planFeatures[user.plan].name}</h3>
                    <p className="opacity-90">Активен</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Использовано кредитов</span>
                      <span>{stats.creditsUsed} / {planFeatures[user.plan].credits}</span>
                    </div>
                    <Progress 
                      value={(stats.creditsUsed / planFeatures[user.plan].credits) * 100} 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Включено в план:</h4>
                    {planFeatures[user.plan].features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Icon name="Check" size={14} className="text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Обновить план</CardTitle>
                  <CardDescription>
                    Получите больше возможностей с премиум планом
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.plan === 'free' && (
                    <>
                      <div className="p-4 border border-primary rounded-lg">
                        <h3 className="font-bold text-lg mb-2">Профи</h3>
                        <p className="text-2xl font-bold mb-2">990 ₽/мес</p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 100 изображений в месяц</li>
                          <li>• Все ИИ-инструменты</li>
                          <li>• 4K качество</li>
                          <li>• API доступ</li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => navigate('/pricing')}>
                        Обновить до Pro
                      </Button>
                    </>
                  )}
                  
                  {user.plan === 'pro' && (
                    <>
                      <div className="p-4 border border-purple-500 rounded-lg">
                        <h3 className="font-bold text-lg mb-2">Команда</h3>
                        <p className="text-2xl font-bold mb-2">2990 ₽/мес</p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Безлимитные изображения</li>
                          <li>• Коллаборация в команде</li>
                          <li>• Приоритетная поддержка</li>
                          <li>• SLA 99.9%</li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => navigate('/pricing')}>
                        Обновить до Team
                      </Button>
                    </>
                  )}
                  
                  {user.plan === 'team' && (
                    <div className="text-center py-4">
                      <Icon name="Crown" size={48} className="text-yellow-500 mx-auto mb-2" />
                      <p className="font-medium">У вас максимальный план!</p>
                      <p className="text-sm text-gray-600">Спасибо за доверие</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Профиль</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Настройки аккаунта</h4>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Key" size={16} className="mr-2" />
                      Изменить пароль
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Bell" size={16} className="mr-2" />
                      Уведомления
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Приватность
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-800">
                      <Icon name="Shield" size={16} className="mr-2" />
                      <span className="font-medium">Аккаунт защищен</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Последний вход: сегодня
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Smartphone" size={16} className="mr-2" />
                      Двухфакторная аутентификация
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать данные
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Icon name="Trash" size={16} className="mr-2" />
                      Удалить аккаунт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;