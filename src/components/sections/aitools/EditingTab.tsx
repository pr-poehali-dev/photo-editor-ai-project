import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface EditingTabProps {
  selectedImage: string | null;
  toolSettings: {
    brightness: number[];
    contrast: number[];
    saturation: number[];
    blur: number[];
    noise: number[];
  };
  setToolSettings: (settings: any) => void;
}

const EditingTab = ({ selectedImage, toolSettings, setToolSettings }: EditingTabProps) => {
  const editingTools = [
    { 
      icon: 'Crop', 
      title: 'Обрезка', 
      desc: 'Точная обрезка изображений',
      advanced: false
    },
    { 
      icon: 'Palette', 
      title: 'Цветокоррекция', 
      desc: 'ИИ-улучшение цветов',
      advanced: true
    },
    { 
      icon: 'Eraser', 
      title: 'Удаление объектов', 
      desc: 'Магическое удаление',
      advanced: true
    },
    { 
      icon: 'Copy', 
      title: 'Клонирование', 
      desc: 'Умное клонирование областей',
      advanced: false
    },
    { 
      icon: 'Filter', 
      title: 'Фильтры', 
      desc: 'Художественные эффекты',
      advanced: false
    },
    { 
      icon: 'Focus', 
      title: 'Размытие фона', 
      desc: 'Портретный режим',
      advanced: true
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {editingTools.map((tool, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={tool.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.desc}</p>
                {tool.advanced && (
                  <Badge variant="secondary" className="mt-2">AI</Badge>
                )}
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Icon name={tool.icon as any} size={20} className="mr-2 text-primary" />
                {tool.title}
              </DialogTitle>
              <DialogDescription>
                {tool.desc}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Оригинал" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center text-gray-500">
                      <Icon name="Image" size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Загрузите изображение</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-center text-gray-600">Оригинал</p>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Icon name="Wand2" size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Результат обработки</p>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-600">После обработки</p>
              </div>
            </div>
            
            {tool.advanced && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Настройки ИИ</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Интенсивность</Label>
                      <Slider
                        value={toolSettings.brightness}
                        onValueChange={(value) => 
                          setToolSettings((prev: any) => ({ ...prev, brightness: value }))
                        }
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Точность</Label>
                      <Slider
                        value={toolSettings.contrast}
                        onValueChange={(value) => 
                          setToolSettings((prev: any) => ({ ...prev, contrast: value }))
                        }
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Автоматическая оптимизация</Label>
                  </div>
                </div>
              </>
            )}
            
            <div className="flex gap-2">
              <Button className="flex-1">
                <Icon name="Play" size={16} className="mr-2" />
                Применить
              </Button>
              <Button variant="outline">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сброс
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default EditingTab;