import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const DataProcessing = () => {
  const [consents, setConsents] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  });

  const updateConsent = (type: keyof typeof consents, value: boolean) => {
    setConsents(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const savePreferences = () => {
    // Здесь будет логика сохранения настроек
    console.log('Saving consent preferences:', consents);
    alert('Настройки сохранены');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Согласие на обработку персональных данных</h1>
        <p className="text-muted-foreground text-lg">
          Управляйте тем, как мы используем ваши данные
        </p>
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} />
            Ваши данные под защитой
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Мы серьезно относимся к защите ваших персональных данных и соблюдаем требования 
            федерального закона «О персональных данных» № 152-ФЗ. Ниже вы можете настроить, 
            какие данные мы можем обрабатывать и для каких целей.
          </p>
        </CardContent>
      </Card>

      {/* Необходимые данные */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lock" size={20} />
              Необходимые для работы сервиса
            </CardTitle>
            <Badge variant="secondary">Обязательно</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={consents.necessary}
              onCheckedChange={() => {}}
              disabled
              className="mt-1"
            />
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">Основные функции сервиса</h3>
                <p className="text-sm text-muted-foreground">
                  Эти данные необходимы для работы AI Photo Editor и не могут быть отключены.
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1">Какие данные обрабатываем:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Email и имя для создания аккаунта</li>
                    <li>Загружаемые изображения для обработки</li>
                    <li>Технические данные (IP-адрес, браузер) для безопасности</li>
                    <li>Информация о подписке и платежах</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Цели обработки:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Предоставление услуг редактирования изображений</li>
                    <li>Управление аккаунтом и подпиской</li>
                    <li>Обеспечение безопасности и предотвращение мошенничества</li>
                    <li>Техническая поддержка пользователей</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Аналитика */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart" size={20} />
            Аналитика и улучшение сервиса
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={consents.analytics}
              onCheckedChange={(checked) => updateConsent('analytics', checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">Данные использования для улучшения продукта</h3>
                <p className="text-sm text-muted-foreground">
                  Помогите нам делать сервис лучше, разрешив сбор анонимной статистики.
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1">Что мы анализируем:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Какие функции используются чаще всего</li>
                    <li>Время обработки изображений</li>
                    <li>Частота ошибок и технических проблем</li>
                    <li>Популярные стили и фильтры</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Как это помогает:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Улучшение производительности и стабильности</li>
                    <li>Разработка новых востребованных функций</li>
                    <li>Оптимизация пользовательского интерфейса</li>
                    <li>Исправление ошибок и багов</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Маркетинг */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Mail" size={20} />
            Маркетинговые коммуникации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={consents.marketing}
              onCheckedChange={(checked) => updateConsent('marketing', checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">Новости и специальные предложения</h3>
                <p className="text-sm text-muted-foreground">
                  Получайте информацию о новых функциях, акциях и полезных материалах.
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1">Типы сообщений:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Новости о новых функциях и обновлениях</li>
                    <li>Образовательные материалы и туториалы</li>
                    <li>Специальные предложения и скидки</li>
                    <li>Приглашения на вебинары и события</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Частота отправки:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Не чаще 2-3 раз в месяц</li>
                    <li>Возможность отписаться в любой момент</li>
                    <li>Только релевантная и полезная информация</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Персонализация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            Персонализация опыта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={consents.personalization}
              onCheckedChange={(checked) => updateConsent('personalization', checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">Индивидуальный подход</h3>
                <p className="text-sm text-muted-foreground">
                  Позвольте нам адаптировать интерфейс и рекомендации под ваши предпочтения.
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1">Что персонализируем:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Предложения стилей на основе истории</li>
                    <li>Персональные рекомендации фильтров</li>
                    <li>Настройки интерфейса под ваши привычки</li>
                    <li>Релевантные советы и подсказки</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Преимущества:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Более быстрое получение нужных результатов</li>
                    <li>Экономия времени на настройке параметров</li>
                    <li>Открытие новых возможностей сервиса</li>
                    <li>Более комфортное использование</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Права пользователя */}
      <Card className="bg-blue-50 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Scale" size={20} />
            Ваши права
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Вы всегда можете:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-500" />
                  Изменить согласия в настройках аккаунта
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-500" />
                  Запросить копию ваших данных
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-500" />
                  Исправить неточную информацию
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-500" />
                  Удалить аккаунт и все данные
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Как связаться с нами:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  privacy@photoeditor.ai
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={14} />
                  Чат в приложении
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Clock" size={14} />
                  Ответ в течение 3 дней
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Кнопки действий */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={savePreferences} size="lg">
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить настройки
        </Button>
        <Button variant="outline" size="lg">
          <Icon name="Download" size={18} className="mr-2" />
          Скачать копию данных
        </Button>
      </div>

      <Separator />

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Icon name="InfoCircle" size={20} className="text-blue-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold">Важная информация</h3>
              <p className="text-sm text-muted-foreground">
                Согласие на обработку персональных данных можно изменить или отозвать в любое время. 
                Отзыв согласия не влияет на законность обработки данных до момента отзыва. 
                Некоторые функции сервиса могут стать недоступными при отзыве определенных согласий.
              </p>
              <p className="text-sm text-muted-foreground">
                Дополнительную информацию об обработке персональных данных можно найти в нашей{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Политике конфиденциальности
                </a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataProcessing;