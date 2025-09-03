import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const BatchTab = () => {
  const batchFeatures = [
    'REST API для интеграции',
    'Webhook уведомления',
    'Приоритетная обработка',
    'Коллаборация в команде',
    'Пользовательские пресеты',
    'Автоматические воркфлоу'
  ];

  return (
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
              <p className="text-sm text-gray-500 mt-1">Поддержка ZIP-архивов до 1GB</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Icon name="Play" size={16} className="mr-2" />
                Начать обработку
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    API
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>API интеграция</DialogTitle>
                    <DialogDescription>
                      Интегрируйте наш ИИ-редактор в свои приложения
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>API ключ</Label>
                      <div className="flex gap-2">
                        <Input value="ai_photo_editor_api_key_***********" readOnly />
                        <Button variant="outline" size="sm">
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Пример запроса</Label>
                      <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono">
                        <pre>{`curl -X POST https://api.photoeditor.ai/v1/enhance \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg" \\
  -F "operation=auto_enhance"`}</pre>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button>
                        <Icon name="ExternalLink" size={16} className="mr-2" />
                        Документация
                      </Button>
                      <Button variant="outline">
                        <Icon name="Download" size={16} className="mr-2" />
                        SDK
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Возможности пакетной обработки:</h4>
            <div className="space-y-2 text-sm">
              {batchFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchTab;