import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Privacy = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Политика конфиденциальности</h1>
        <p className="text-muted-foreground text-lg">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Введение
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray max-w-none dark:prose-invert">
          <p>
            AI Photo Editor (далее — «мы», «наш сервис») уважает вашу конфиденциальность и обязуется 
            защищать ваши персональные данные. Настоящая Политика конфиденциальности описывает, 
            как мы собираем, используем, храним и защищаем вашу информацию при использовании нашего сервиса.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Database" size={20} />
            Какие данные мы собираем
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Персональная информация</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Имя и email при регистрации</li>
              <li>Аватар профиля (если загружен)</li>
              <li>Настройки аккаунта и предпочтения</li>
              <li>История платежей и подписок</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Данные использования</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Изображения, которые вы загружаете для обработки</li>
              <li>Текстовые запросы для генерации изображений</li>
              <li>История созданных и отредактированных изображений</li>
              <li>Настройки фильтров и эффектов</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Технические данные</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>IP-адрес и геолокация</li>
              <li>Информация о браузере и устройстве</li>
              <li>Логи использования сервиса</li>
              <li>Файлы cookie и данные сессии</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Target" size={20} />
            Как мы используем ваши данные
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Основные цели:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Предоставление и улучшение наших сервисов</li>
                <li>Обработка ваших изображений и запросов</li>
                <li>Персонализация пользовательского опыта</li>
                <li>Обработка платежей и управление подписками</li>
                <li>Техническая поддержка и решение проблем</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Дополнительные цели:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Анализ использования для улучшения качества</li>
                <li>Предотвращение мошенничества и злоупотреблений</li>
                <li>Соблюдение юридических обязательств</li>
                <li>Отправка уведомлений о сервисе (с вашего согласия)</li>
                <li>Исследования и разработка новых функций</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} />
            Защита данных
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Технические меры безопасности:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>256-битное SSL/TLS шифрование всех данных</li>
              <li>Шифрование данных в базах данных</li>
              <li>Регулярные аудиты безопасности</li>
              <li>Ограниченный доступ к персональным данным</li>
              <li>Мониторинг подозрительной активности 24/7</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Организационные меры:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Обучение сотрудников принципам конфиденциальности</li>
              <li>Соглашения о неразглашении для всех сотрудников</li>
              <li>Регулярное обновление процедур безопасности</li>
              <li>Политика минимального доступа к данным</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={20} />
            Хранение данных
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Сроки хранения:</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong>Аккаунт активен:</strong> данные хранятся до удаления аккаунта</li>
                <li><strong>После удаления аккаунта:</strong> персональные данные удаляются в течение 30 дней</li>
                <li><strong>Загруженные изображения:</strong> автоматически удаляются через 90 дней</li>
                <li><strong>Логи системы:</strong> хранятся до 12 месяцев для обеспечения безопасности</li>
                <li><strong>Платежная информация:</strong> хранится согласно требованиям платежных систем</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm">
                <Icon name="InfoCircle" size={16} className="inline mr-2" />
                Вы можете в любое время запросить удаление своих данных, обратившись в службу поддержки.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Передача данных третьим лицам
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением следующих случаев:
          </p>

          <div>
            <h3 className="font-semibold mb-2">Сервис-провайдеры:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Облачные хостинг-провайдеры для хранения данных</li>
              <li>Платежные системы для обработки платежей</li>
              <li>Аналитические сервисы для улучшения продукта</li>
              <li>Службы рассылки для отправки уведомлений</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Юридические требования:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>По запросу правоохранительных органов</li>
              <li>Для защиты наших прав и безопасности пользователей</li>
              <li>При слиянии или продаже компании (с уведомлением пользователей)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Ваши права
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Вы имеете право:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Получать информацию о своих данных</li>
                <li>Исправлять неточную информацию</li>
                <li>Удалять свои персональные данные</li>
                <li>Ограничивать обработку данных</li>
                <li>Получать данные в машиночитаемом формате</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Как реализовать права:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Через настройки аккаунта</li>
                <li>Обращение в службу поддержки</li>
                <li>Отправка запроса на privacy@photoeditor.ai</li>
                <li>Отзыв согласия в любое время</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Cookie" size={20} />
            Файлы Cookie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Мы используем файлы cookie для улучшения работы сервиса:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Необходимые</h4>
              <p className="text-sm text-muted-foreground">
                Для базовой функциональности сайта
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Аналитические</h4>
              <p className="text-sm text-muted-foreground">
                Для анализа использования сервиса
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Персонализация</h4>
              <p className="text-sm text-muted-foreground">
                Для сохранения ваших предпочтений
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Phone" size={20} />
            Контактная информация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Если у вас есть вопросы о нашей Политике конфиденциальности или обработке ваших данных, 
            обращайтесь к нам:
          </p>
          
          <div className="space-y-2">
            <p><strong>Email:</strong> privacy@photoeditor.ai</p>
            <p><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 123</p>
            <p><strong>Время ответа:</strong> в течение 3 рабочих дней</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground text-center">
            Мы оставляем за собой право обновлять эту Политику конфиденциальности. 
            Об изменениях будет сообщено через email и уведомление в приложении за 30 дней до вступления в силу.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;