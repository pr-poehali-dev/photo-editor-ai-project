import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface EnhanceTabProps {
  selectedImage: string | null;
  fileInputRef: RefObject<HTMLInputElement>;
}

const EnhanceTab = ({ selectedImage, fileInputRef }: EnhanceTabProps) => {
  const enhanceFeatures = [
    { 
      icon: 'Zap', 
      title: 'Автоулучшение', 
      desc: 'ИИ анализирует и улучшает фото автоматически',
      category: 'Базовое'
    },
    { 
      icon: 'Eye', 
      title: 'Устранение шума', 
      desc: 'Профессиональное шумоподавление',
      category: 'Продвинутое'
    },
    { 
      icon: 'Maximize', 
      title: 'Увеличение разрешения', 
      desc: 'AI upscaling до 8K разрешения',
      category: 'Продвинутое'
    },
    { 
      icon: 'Sun', 
      title: 'HDR-обработка', 
      desc: 'Расширенный динамический диапазон',
      category: 'Профи'
    },
    { 
      icon: 'Sparkles', 
      title: 'Реставрация фото', 
      desc: 'ИИ восстанавливает старые и поврежденные фото',
      category: 'Профи'
    },
    { 
      icon: 'Brush', 
      title: 'Стилизация', 
      desc: 'Преобразование в художественные стили',
      category: 'Креативное'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        {enhanceFeatures.map((feature, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature.icon as any} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{feature.title}</h4>
                      <Badge variant="outline" className="text-xs">{feature.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Icon name={feature.icon as any} size={20} className="mr-2 text-primary" />
                  {feature.title}
                </DialogTitle>
                <DialogDescription>
                  {feature.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    {selectedImage ? (
                      <img src={selectedImage} alt="До" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Icon name="Image" size={32} className="text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-center">До</p>
                </div>
                <div className="space-y-2">
                  <div className="aspect-square bg-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="ArrowRight" size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-xs text-primary">Обработка ИИ</p>
                    </div>
                  </div>
                  <p className="text-sm text-center">Процесс</p>
                </div>
                <div className="space-y-2">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <p className="text-sm text-center">После</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Icon name="Wand2" size={16} className="mr-2" />
                  Начать обработку
                </Button>
                <Button variant="outline">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Предпросмотр
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-8 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Upload" size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Загрузите фото для демонстрации улучшений</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Выбрать файл
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhanceTab;