import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const FooterSection = () => {
  return (
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
            <h4 className="font-semibold mb-4">Юридическая информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-white transition-colors text-left">
                    Политика конфиденциальности
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Политика конфиденциальности</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <p>Настоящая Политика конфиденциальности определяет условия обработки и защиты персональных данных пользователей сервиса AI Photo Editor.</p>
                      
                      <h4 className="font-semibold">1. Сбор информации</h4>
                      <p>Мы собираем следующие данные:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Загружаемые изображения для обработки</li>
                        <li>Данные аккаунта (email, имя пользователя)</li>
                        <li>Техническая информация (IP-адрес, браузер)</li>
                        <li>Статистика использования сервиса</li>
                      </ul>

                      <h4 className="font-semibold">2. Использование данных</h4>
                      <p>Собранные данные используются для:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Предоставления услуг ИИ-обработки изображений</li>
                        <li>Улучшения качества алгоритмов</li>
                        <li>Технической поддержки пользователей</li>
                        <li>Анализа и улучшения сервиса</li>
                      </ul>

                      <h4 className="font-semibold">3. Защита данных</h4>
                      <p>Мы применяем современные методы защиты, включая шифрование данных при передаче и хранении, регулярный аудит безопасности, ограниченный доступ к персональным данным.</p>

                      <h4 className="font-semibold">4. Ваши права</h4>
                      <p>Вы имеете право на доступ к своим данным, исправление неточностей, удаление персональных данных, ограничение обработки.</p>

                      <p className="text-gray-600">Дата последнего обновления: 03.09.2024</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-white transition-colors text-left">
                    Пользовательское соглашение
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Пользовательское соглашение</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <p>Данное соглашение определяет условия использования сервиса AI Photo Editor.</p>
                      
                      <h4 className="font-semibold">1. Предмет соглашения</h4>
                      <p>Компания предоставляет доступ к платформе для ИИ-обработки изображений. Пользователь получает право на использование сервиса согласно выбранному тарифному плану.</p>

                      <h4 className="font-semibold">2. Права и обязанности</h4>
                      <p>Пользователь обязуется:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Не загружать изображения, нарушающие авторские права</li>
                        <li>Не использовать сервис для незаконных целей</li>
                        <li>Соблюдать лимиты выбранного тарифного плана</li>
                      </ul>

                      <h4 className="font-semibold">3. Интеллектуальная собственность</h4>
                      <p>Все права на программное обеспечение и алгоритмы принадлежат компании. Пользователь сохраняет права на загружаемые изображения.</p>

                      <h4 className="font-semibold">4. Ограничение ответственности</h4>
                      <p>Компания не несет ответственности за качество обработанных изображений, использование сервиса третьими лицами, временную недоступность сервиса.</p>

                      <h4 className="font-semibold">5. Оплата и возврат</h4>
                      <p>Оплата производится согласно выбранному тарифу. Возврат средств возможен в течение 14 дней при технических проблемах сервиса.</p>

                      <p className="text-gray-600">Дата последнего обновления: 03.09.2024</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-white transition-colors text-left">
                    Согласие на обработку данных
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Согласие на обработку персональных данных</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <p>Используя сервис AI Photo Editor, вы даете согласие на обработку персональных данных в соответствии с Федеральным законом №152-ФЗ "О персональных данных".</p>
                      
                      <h4 className="font-semibold">Цели обработки:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Предоставление услуг ИИ-редактирования</li>
                        <li>Техническая поддержка</li>
                        <li>Улучшение качества сервиса</li>
                        <li>Выполнение договорных обязательств</li>
                      </ul>

                      <h4 className="font-semibold">Обрабатываемые данные:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>ФИО, email, телефон</li>
                        <li>Данные об использовании сервиса</li>
                        <li>Загружаемые изображения</li>
                        <li>IP-адрес и файлы cookies</li>
                      </ul>

                      <p>Согласие действует до его отзыва в письменном виде.</p>
                      
                      <div className="flex gap-2 mt-6">
                        <Button size="sm">Принимаю</Button>
                        <Button variant="outline" size="sm">Отклонить</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
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
  );
};

export default FooterSection;