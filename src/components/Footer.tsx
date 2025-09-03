import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { path: '/about', label: 'О нас' },
    { path: '/pricing', label: 'Тарифы' },
    { path: '/gallery', label: 'Галерея' },
    { path: '/contact', label: 'Контакты' }
  ];

  const productLinks = [
    { path: '/generate', label: 'AI Генерация' },
    { path: '/editor', label: 'Редактирование' },
    { path: '/enhance', label: 'Улучшение' },
    { path: '/api', label: 'API' }
  ];

  const supportLinks = [
    { path: '/help', label: 'Помощь' },
    { path: '/tutorials', label: 'Туториалы' },
    { path: '/faq', label: 'FAQ' },
    { path: '/status', label: 'Статус сервиса' }
  ];

  const legalLinks = [
    { path: '/terms', label: 'Пользовательское соглашение' },
    { path: '/privacy', label: 'Политика конфиденциальности' },
    { path: '/data-processing', label: 'Обработка данных' },
    { path: '/cookies', label: 'Cookie' }
  ];

  const socialLinks = [
    { href: 'https://t.me/photoeditor', icon: 'MessageCircle', label: 'Telegram' },
    { href: 'https://github.com/photoeditor', icon: 'Github', label: 'GitHub' },
    { href: 'https://twitter.com/photoeditor', icon: 'Twitter', label: 'Twitter' },
    { href: 'https://youtube.com/photoeditor', icon: 'Youtube', label: 'YouTube' }
  ];

  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-xl font-bold text-primary">AI Photo Editor</h2>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Профессиональное редактирование изображений с помощью искусственного интеллекта. 
              Создавайте потрясающие визуалы за секунды.
            </p>
            
            {/* Социальные сети */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-full"
                  aria-label={social.label}
                >
                  <Icon name={social.icon as any} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Компания */}
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Продукт */}
          <div>
            <h3 className="font-semibold mb-4">Продукт</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Юридическое */}
          <div>
            <h3 className="font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Нижняя часть */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AI Photo Editor. Все права защищены.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Сделано в России 🇷🇺</span>
              <span>•</span>
              <span>Сервера в РФ</span>
            </div>
          </div>

          {/* Языки и валюта */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={14} />
              <span>Русский</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>₽</span>
              <span>RUB</span>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 pt-6 border-t border-muted/30">
          <div className="grid md:grid-cols-3 gap-6 text-xs text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Безопасность</h4>
              <p>
                Все данные защищены 256-битным шифрованием SSL. 
                Изображения автоматически удаляются через 90 дней.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Техподдержка</h4>
              <p>
                Служба поддержки работает 24/7. Среднее время ответа — менее 2 часов. 
                Доступна на русском и английском языках.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Гарантии</h4>
              <p>
                30-дневная гарантия возврата средств. SLA 99.9% для платных планов. 
                Регулярные обновления и улучшения сервиса.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;