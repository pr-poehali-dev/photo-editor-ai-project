import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Photo Editor</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#tools" className="text-gray-600 hover:text-primary transition-colors">Инструменты</a>
              <a href="#gallery" className="text-gray-600 hover:text-primary transition-colors">Галерея</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Тарифы</a>
              <a href="#learn" className="text-gray-600 hover:text-primary transition-colors">Обучение</a>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">Войти</Button>
              <Button size="sm">Начать</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4">
              <Icon name="Zap" size={14} className="mr-1" />
              Powered by AI
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Профессиональное
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                редактирование фото
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Создавайте, редактируйте и улучшайте изображения с помощью передовых ИИ-технологий. 
              Профессиональный результат за считанные секунды.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Icon name="Upload" size={18} className="mr-2" />
                Загрузить фото
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Icon name="Play" size={18} className="mr-2" />
                Смотреть демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section id="tools" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ИИ-инструменты редактирования
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Мощный набор инструментов для профессиональной обработки изображений
            </p>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="generate">Генерация</TabsTrigger>
              <TabsTrigger value="edit">Редактирование</TabsTrigger>
              <TabsTrigger value="enhance">Улучшение</TabsTrigger>
              <TabsTrigger value="batch">Пакетная</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="Sparkles" size={20} className="mr-2 text-primary" />
                      ИИ-генератор изображений
                    </CardTitle>
                    <CardDescription>
                      Создавайте уникальные изображения из текстового описания
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      placeholder="Опишите изображение, которое хотите создать..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Icon name="Wand2" size={16} className="mr-2" />
                        Сгенерировать
                      </Button>
                      <Button variant="outline">
                        <Icon name="Settings" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-indigo-200 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Image" size={48} className="text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Сгенерированное изображение появится здесь
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="edit" className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: 'Crop', title: 'Обрезка', desc: 'Точная обрезка изображений' },
                  { icon: 'Palette', title: 'Цветокоррекция', desc: 'ИИ-улучшение цветов' },
                  { icon: 'Eraser', title: 'Удаление объектов', desc: 'Магическое удаление' },
                  { icon: 'Copy', title: 'Клонирование', desc: 'Умное клонирование областей' },
                  { icon: 'Filter', title: 'Фильтры', desc: 'Художественные эффекты' },
                  { icon: 'Focus', title: 'Размытие фона', desc: 'Портретный режим' }
                ].map((tool, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon name={tool.icon as any} size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{tool.title}</h3>
                      <p className="text-sm text-gray-600">{tool.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="enhance" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[
                    { icon: 'Zap', title: 'Автоулучшение', desc: 'ИИ анализирует и улучшает фото автоматически' },
                    { icon: 'Eye', title: 'Устранение шума', desc: 'Профессиональное шумоподавление' },
                    { icon: 'Maximize', title: 'Увеличение разрешения', desc: 'AI upscaling до 4K и выше' },
                    { icon: 'Sun', title: 'HDR-обработка', desc: 'Расширенный динамический диапазон' }
                  ].map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={feature.icon as any} size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Upload" size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Загрузите фото для демонстрации улучшений</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="batch" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Layers" size={20} className="mr-2 text-primary" />
                    Пакетная обработка
                  </CardTitle>
                  <CardDescription>
                    Обрабатывайте сотни изображений одновременно с API-интеграцией
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Icon name="FolderOpen" size={32} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Перетащите папку с изображениями</p>
                        <p className="text-sm text-gray-500 mt-1">Поддержка ZIP-архивов</p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Icon name="Play" size={16} className="mr-2" />
                          Начать обработку
                        </Button>
                        <Button variant="outline">
                          <Icon name="Download" size={16} className="mr-2" />
                          Скачать API
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Возможности API:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-green-500" />
                          <span>REST API для интеграции</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-green-500" />
                          <span>Webhook уведомления</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-green-500" />
                          <span>Приоритетная обработка</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-green-500" />
                          <span>Коллаборация в команде</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Галерея работ
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Примеры обработанных изображений и результаты работы наших пользователей
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-200 to-indigo-200 aspect-square cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white text-sm font-medium">Образец #{index + 1}</p>
                  <p className="text-white/70 text-xs">ИИ-обработка</p>
                </div>
                <div className="flex items-center justify-center h-full">
                  <Icon name="Image" size={32} className="text-purple-600" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <Icon name="Plus" size={18} className="mr-2" />
              Загрузить в галерею
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Тарифные планы
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Выберите подходящий план для ваших задач
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Стартовый',
                price: 'Бесплатно',
                period: '',
                features: ['5 изображений в месяц', 'Базовые фильтры', 'Стандартное качество', 'Поддержка сообщества'],
                popular: false
              },
              {
                name: 'Профи',
                price: '990',
                period: '₽/мес',
                features: ['100 изображений в месяц', 'Все ИИ-инструменты', '4K качество', 'Приоритетная поддержка', 'API доступ'],
                popular: true
              },
              {
                name: 'Команда',
                price: '2990',
                period: '₽/мес',
                features: ['Безлимитная обработка', 'Коллаборация', 'Белый лейбл', 'Персональный менеджер', 'SLA 99.9%'],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {plan.period && <span className="text-lg text-gray-500 font-normal">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === 'Бесплатно' ? 'Начать бесплатно' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section id="learn" className="py-16 px-4 bg-gradient-to-br from-primary/5 to-purple-100/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Обучение и поддержка
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Освойте все возможности редактора с помощью наших материалов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'BookOpen',
                title: 'Документация',
                description: 'Подробные руководства по всем функциям',
                link: 'Читать'
              },
              {
                icon: 'Video',
                title: 'Видеоуроки',
                description: 'Пошаговые видеоинструкции',
                link: 'Смотреть'
              },
              {
                icon: 'Users',
                title: 'Сообщество',
                description: 'Общайтесь с другими пользователями',
                link: 'Присоединиться'
              },
              {
                icon: 'MessageCircle',
                title: 'Поддержка 24/7',
                description: 'Помощь в любое время',
                link: 'Написать'
              },
              {
                icon: 'Lightbulb',
                title: 'Советы и трюки',
                description: 'Секреты профессиональной обработки',
                link: 'Узнать'
              },
              {
                icon: 'Code',
                title: 'API документация',
                description: 'Интегрируйте наш сервис в свои проекты',
                link: 'Изучить'
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon name={item.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    {item.link}
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg">AI Photo Editor</span>
              </div>
              <p className="text-gray-400 text-sm">
                Профессиональное редактирование фотографий с помощью искусственного интеллекта
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Функции</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Интеграции</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Мобильное приложение</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сообщество</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Статус системы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пресса</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AI Photo Editor. Все права защищены.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;