import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const PricingSection = () => {
  const plans = [
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
  ];

  return (
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
          {plans.map((plan, index) => (
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
  );
};

export default PricingSection;