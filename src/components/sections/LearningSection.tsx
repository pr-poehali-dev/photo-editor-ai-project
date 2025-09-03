import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const LearningSection = () => {
  const learningItems = [
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
  ];

  return (
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
          {learningItems.map((item, index) => (
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
  );
};

export default LearningSection;