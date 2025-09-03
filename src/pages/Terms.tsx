import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Terms = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Пользовательское соглашение</h1>
        <p className="text-muted-foreground text-lg">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
        </p>
      </div>

      <Alert>
        <Icon name="InfoCircle" size={16} />
        <AlertDescription>
          Используя наш сервис, вы соглашаетесь с условиями данного соглашения. 
          Пожалуйста, внимательно прочитайте все разделы.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" size={20} />
            1. Общие положения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между 
            ООО «AI Photo Editor» (далее — «Компания», «мы») и пользователем сервиса AI Photo Editor 
            (далее — «Сервис», «Платформа»).
          </p>
          
          <div>
            <h3 className="font-semibold mb-2">Принятие условий:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Регистрация аккаунта означает полное согласие с условиями</li>
              <li>Использование Сервиса без регистрации также означает согласие</li>
              <li>Несогласие с условиями означает запрет на использование Сервиса</li>
              <li>Мы вправе изменять условия с уведомлением пользователей</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            2. Аккаунт пользователя
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Регистрация и доступ:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Для регистрации необходимо достичь 16 лет или получить согласие родителей</li>
              <li>Предоставляемая информация должна быть точной и актуальной</li>
              <li>Вы несете ответственность за безопасность своего аккаунта</li>
              <li>Запрещено создавать множественные аккаунты для одного лица</li>
              <li>Мы вправе заблокировать аккаунт при нарушении условий</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Обязанности пользователя:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Поддерживать конфиденциальность учетных данных</li>
              <li>Немедленно уведомлять о компрометации аккаунта</li>
              <li>Обновлять контактную информацию при изменении</li>
              <li>Соблюдать правила использования Сервиса</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Zap" size={20} />
            3. Описание сервиса
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            AI Photo Editor — это платформа для создания и редактирования изображений с использованием 
            технологий искусственного интеллекта.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Основные функции:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Генерация изображений на основе текстового описания</li>
              <li>Улучшение качества и разрешения фотографий</li>
              <li>Применение художественных фильтров и эффектов</li>
              <li>Удаление и замена фона изображений</li>
              <li>Коррекция цвета, яркости и контрастности</li>
              <li>Пакетная обработка изображений (в Pro версии)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Ограничения сервиса:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Доступность зависит от технических возможностей</li>
              <li>Качество результатов не гарантируется</li>
              <li>Время обработки может варьироваться</li>
              <li>Некоторые функции доступны только в платных планах</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Ban" size={20} />
            4. Запрещенное использование
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200">
              Строго запрещается использование Сервиса для:
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-red-700 dark:text-red-300 text-sm">
              <li>Создания контента для взрослых, порнографии или эротики</li>
              <li>Генерации изображений насилия, жестокости или экстремизма</li>
              <li>Создания дипфейков или поддельных изображений реальных людей</li>
              <li>Нарушения авторских прав или других интеллектуальных прав</li>
              <li>Распространения ложной информации или пропаганды</li>
              <li>Дискриминации по любым признакам</li>
              <li>Создания контента, нарушающего законы РФ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Технические ограничения:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Запрещено использование автоматизированных средств доступа</li>
              <li>Нельзя пытаться обходить ограничения API</li>
              <li>Запрещена перепродажа доступа к Сервису</li>
              <li>Нельзя создавать копии или аналоги Сервиса</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Copyright" size={20} />
            5. Интеллектуальная собственность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Права Компании:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Сервис и его технологии принадлежат Компании</li>
              <li>Алгоритмы, модели ИИ и программный код защищены авторским правом</li>
              <li>Логотипы, товарные знаки и дизайн являются собственностью Компании</li>
              <li>Использование без разрешения запрещено</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Права пользователя на создаваемый контент:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Вы сохраняете права на загружаемые вами изображения</li>
              <li>Созданные с помощью ИИ изображения принадлежат вам</li>
              <li>Вы можете использовать результаты в коммерческих целях</li>
              <li>При нарушении правил мы вправе удалить контент</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Лицензия на использование:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Мы предоставляем вам ограниченную лицензию на использование Сервиса</li>
              <li>Лицензия действует только при соблюдении условий Соглашения</li>
              <li>Лицензия автоматически прекращается при нарушении условий</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="CreditCard" size={20} />
            6. Платежи и подписки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Тарифные планы:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Бесплатный план имеет ограничения по функциям и количеству операций</li>
              <li>Платные планы предоставляют расширенные возможности</li>
              <li>Цены указаны в российских рублях с НДС</li>
              <li>Мы вправе изменять цены с уведомлением за 30 дней</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Оплата и возвраты:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Оплата производится авансом за период подписки</li>
              <li>Автоматическое продление подписки (можно отключить)</li>
              <li>Возврат средств возможен в течение 14 дней при технических проблемах</li>
              <li>При нарушении условий использования возврат не предоставляется</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} />
            7. Ограничение ответственности
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Важно:</strong> Сервис предоставляется «как есть», без гарантий любого рода.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Мы не гарантируем:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Бесперебойную работу Сервиса 24/7</li>
              <li>Отсутствие ошибок или технических сбоев</li>
              <li>Качество и точность результатов обработки</li>
              <li>Соответствие ваших ожиданий</li>
              <li>Сохранность данных при форс-мажорных обстоятельствах</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Ограничение ущерба:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Максимальная ответственность ограничена суммой подписки</li>
              <li>Мы не несем ответственности за косвенные убытки</li>
              <li>Исключается ответственность за действия третьих лиц</li>
              <li>Пользователь самостоятельно оценивает риски использования</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Scale" size={20} />
            8. Разрешение споров
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Претензионный порядок:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Все споры решаются путем переговоров</li>
              <li>Претензия направляется на support@photoeditor.ai</li>
              <li>Срок рассмотрения претензии — 30 дней</li>
              <li>При недостижении согласия спор передается в суд</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Применимое право:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Соглашение регулируется законодательством РФ</li>
              <li>Споры рассматриваются судами г. Москвы</li>
              <li>При противоречиях приоритет у российского права</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="RefreshCw" size={20} />
            9. Изменения и прекращение
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Изменения Соглашения:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Мы вправе изменять условия в одностороннем порядке</li>
              <li>О существенных изменениях уведомляем за 30 дней</li>
              <li>Продолжение использования означает согласие с изменениями</li>
              <li>При несогласии вы можете прекратить использование</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Прекращение действия:</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Вы можете удалить аккаунт в любое время</li>
              <li>Мы вправе заблокировать аккаунт при нарушениях</li>
              <li>При прекращении работы Сервиса — уведомление за 90 дней</li>
              <li>Некоторые положения продолжают действовать после прекращения</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Phone" size={20} />
            10. Контактная информация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>ООО «AI Photo Editor»</strong></p>
            <p>ИНН: 1234567890</p>
            <p>Адрес: 123456, г. Москва, ул. Примерная, д. 123, офис 456</p>
            <p>Email: legal@photoeditor.ai</p>
            <p>Техподдержка: support@photoeditor.ai</p>
            <p>Телефон: +7 (495) 123-45-67</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground text-center">
            Данное Соглашение составлено на русском языке и вступает в силу с момента его принятия пользователем. 
            Все переводы носят справочный характер.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;