import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Молниеносная обработка',
      description: 'Современные алгоритмы обеспечивают мгновенную обработку изображений'
    },
    {
      icon: 'Brain',
      title: 'Нейронные сети',
      description: 'Используем передовые технологии машинного обучения для создания уникального контента'
    },
    {
      icon: 'Palette',
      title: 'Художественные стили',
      description: 'Широкий выбор стилей и фильтров для создания неповторимых изображений'
    },
    {
      icon: 'Shield',
      title: 'Безопасность данных',
      description: 'Ваши изображения защищены современными методами шифрования'
    }
  ];

  const team = [
    {
      name: 'Алексей Космонавт',
      role: 'Ведущий разработчик AI',
      description: 'Специалист по машинному обучению с 8-летним опытом в области компьютерного зрения',
      avatar: '/api/placeholder/100/100'
    },
    {
      name: 'Мария Стардаст',
      role: 'UX/UI Дизайнер',
      description: 'Создает интуитивные интерфейсы для сложных технологических решений',
      avatar: '/api/placeholder/100/100'
    },
    {
      name: 'Дмитрий Галактика',
      role: 'Backend разработчик',
      description: 'Эксперт по высоконагруженным системам и облачным технологиям',
      avatar: '/api/placeholder/100/100'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          О нашем проекте
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AI Photo Editor — это революционная платформа, которая объединяет мощь искусственного интеллекта 
          с простотой использования для создания потрясающих визуальных произведений.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <Icon name="Target" size={48} className="mx-auto text-purple-600" />
            <h2 className="text-3xl font-bold">Наша миссия</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы верим, что каждый человек обладает творческим потенциалом. Наша цель — предоставить 
              мощные инструменты AI, которые помогут раскрыть этот потенциал и создать невероятные 
              визуальные произведения без специальных навыков программирования или дизайна.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Преимущества платформы</h2>
          <p className="text-muted-foreground">
            Технологии, которые делают нас лучше
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Команда</h2>
          <p className="text-muted-foreground">
            Познакомьтесь с космическими умами за нашим проектом
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      <Badge className="bg-purple-600">
                        <Icon name="Rocket" size={12} />
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      {member.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-purple-100">Созданных изображений</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-purple-100">Активных пользователей</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-purple-100">AI моделей</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-purple-100">Время работы</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Готовы начать творить?</h2>
        <p className="text-muted-foreground text-lg">
          Присоединяйтесь к тысячам творческих людей, которые уже используют наш AI редактор
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/editor" className="flex items-center gap-2">
              <Icon name="Rocket" size={20} />
              Начать создавать
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/gallery">
              Посмотреть примеры
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;