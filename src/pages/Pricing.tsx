import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Бесплатный',
      description: 'Для начинающих пользователей',
      price: { monthly: 0, annual: 0 },
      badge: null,
      features: [
        '5 генераций изображений в день',
        'Базовые фильтры и эффекты',
        'Разрешение до 512x512',
        'Стандартное качество обработки',
        'Реклама в интерфейсе',
        'Email поддержка'
      ],
      limitations: [
        'Водяной знак на изображениях',
        'Ограниченный выбор стилей',
        'Нет приоритетной обработки'
      ],
      cta: 'Начать бесплатно',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Для креативных профессионалов',
      price: { monthly: 999, annual: 799 },
      badge: 'Популярный',
      features: [
        '100 генераций изображений в день',
        'Все фильтры и эффекты',
        'Разрешение до 2048x2048',
        'Высокое качество обработки',
        'Без рекламы',
        'Приоритетная поддержка',
        'Пакетная обработка',
        'API доступ',
        'Расширенные настройки AI'
      ],
      limitations: [],
      cta: 'Выбрать Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Для больших команд и бизнеса',
      price: { monthly: 2999, annual: 2399 },
      badge: 'Максимум',
      features: [
        'Безлимитные генерации',
        'Все возможности Pro',
        'Разрешение до 4096x4096',
        'Максимальное качество',
        'Белый лейбл',
        'Персональный менеджер',
        'SLA 99.9%',
        'Корпоративная безопасность',
        'Аналитика и отчеты',
        'Интеграция с корп. системами'
      ],
      limitations: [],
      cta: 'Связаться с нами',
      popular: false
    }
  ];

  const faq = [
    {
      question: 'Можно ли изменить тарифный план?',
      answer: 'Да, вы можете изменить тарифный план в любое время. При переходе на более высокий план разница доплачивается пропорционально.'
    },
    {
      question: 'Что происходит с неиспользованными генерациями?',
      answer: 'Неиспользованные генерации не переносятся на следующий период. Каждый месяц лимит обновляется.'
    },
    {
      question: 'Есть ли скидки для образовательных учреждений?',
      answer: 'Да, мы предоставляем скидку 50% для студентов и преподавателей. Свяжитесь с нами для получения промокода.'
    },
    {
      question: 'Можно ли отменить подписку?',
      answer: 'Да, вы можете отменить подписку в любое время в настройках аккаунта. Доступ к функциям сохранится до конца оплаченного периода.'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Тарифные планы
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Выберите план, который подходит именно вам. Все планы включают доступ к нашим AI технологиям
        </p>

        {/* Toggle Annual/Monthly */}
        <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="billing-toggle" className={!isAnnual ? 'font-medium' : 'text-muted-foreground'}>
            Ежемесячно
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="billing-toggle" className={isAnnual ? 'font-medium' : 'text-muted-foreground'}>
            Ежегодно
          </Label>
          <Badge variant="secondary" className="ml-2">
            Скидка 20%
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${
              plan.popular 
                ? 'border-primary shadow-lg scale-105' 
                : 'border-border'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  {plan.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">
                {plan.description}
              </CardDescription>
              
              <div className="pt-4">
                <div className="text-4xl font-bold">
                  {plan.price.monthly === 0 ? (
                    'Бесплатно'
                  ) : (
                    <>
                      ₽{isAnnual ? plan.price.annual : plan.price.monthly}
                      <span className="text-lg font-normal text-muted-foreground">
                        /мес
                      </span>
                    </>
                  )}
                </div>
                {plan.price.monthly > 0 && isAnnual && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ₽{plan.price.annual * 12} в год
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Ограничения:</p>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start space-x-3">
                        <Icon name="X" size={16} className="text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                asChild
              >
                <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                  {plan.cta}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Подробное сравнение</h2>
          <p className="text-muted-foreground">
            Все функции наших тарифных планов в одной таблице
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Возможности</th>
                    <th className="text-center p-4 font-medium">Бесплатный</th>
                    <th className="text-center p-4 font-medium">Pro</th>
                    <th className="text-center p-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4">Генерации в день</td>
                    <td className="text-center p-4">5</td>
                    <td className="text-center p-4">100</td>
                    <td className="text-center p-4">Безлимит</td>
                  </tr>
                  <tr>
                    <td className="p-4">Максимальное разрешение</td>
                    <td className="text-center p-4">512x512</td>
                    <td className="text-center p-4">2048x2048</td>
                    <td className="text-center p-4">4096x4096</td>
                  </tr>
                  <tr>
                    <td className="p-4">API доступ</td>
                    <td className="text-center p-4">
                      <Icon name="X" size={16} className="text-red-500 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Icon name="Check" size={16} className="text-green-500 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Icon name="Check" size={16} className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Приоритетная обработка</td>
                    <td className="text-center p-4">
                      <Icon name="X" size={16} className="text-red-500 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Icon name="Check" size={16} className="text-green-500 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Icon name="Check" size={16} className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Поддержка</td>
                    <td className="text-center p-4">Email</td>
                    <td className="text-center p-4">Приоритетная</td>
                    <td className="text-center p-4">Персональный менеджер</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-12 rounded-lg">
        <h2 className="text-3xl font-bold">Готовы начать?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Присоединяйтесь к тысячам пользователей, которые уже создают потрясающие изображения с помощью ИИ
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/register">
              Попробовать бесплатно
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">
              Связаться с нами
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;