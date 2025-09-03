import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AIToolsSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  generatedImage: string | null;
  generateImage: () => void;
  selectedImage: string | null;
  toolSettings: {
    brightness: number[];
    contrast: number[];
    saturation: number[];
    blur: number[];
    noise: number[];
  };
  setToolSettings: (settings: any) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const AIToolsSection = ({
  prompt,
  setPrompt,
  isGenerating,
  generatedImage,
  generateImage,
  selectedImage,
  toolSettings,
  setToolSettings,
  fileInputRef
}: AIToolsSectionProps) => {
  return (
    <section id="tools" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ИИ-инструменты редактирования
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Мощный набор инструментов для профессиональной обработки изображений
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="generate">Генерация</TabsTrigger>
            <TabsTrigger value="edit">Редактирование</TabsTrigger>
            <TabsTrigger value="enhance">Улучшение</TabsTrigger>
            <TabsTrigger value="batch">Пакетная</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Sparkles" size={20} className="mr-2 text-primary" />
                    ИИ-генератор изображений
                  </CardTitle>
                  <CardDescription>
                    Создавайте уникальные изображения из текстового описания
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Опишите изображение, которое хотите создать..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={generateImage}
                      disabled={isGenerating || !prompt.trim()}
                    >
                      {isGenerating ? (
                        <>
                          <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                          Генерация...
                        </>
                      ) : (
                        <>
                          <Icon name="Wand2" size={16} className="mr-2" />
                          Сгенерировать
                        </>
                      )}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Icon name="Settings" size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Настройки генерации</DialogTitle>
                          <DialogDescription>
                            Настройте параметры для создания изображения
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Стиль</Label>
                            <select className="w-full p-2 border rounded">
                              <option>Реалистичный</option>
                              <option>Художественный</option>
                              <option>Аниме</option>
                              <option>3D рендер</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Качество</Label>
                            <Slider
                              value={[80]}
                              max={100}
                              step={10}
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch />
                            <Label>Высокое разрешение</Label>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-purple-200 to-indigo-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                    {generatedImage ? (
                      <img 
                        src={generatedImage} 
                        alt="Сгенерированное изображение" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : isGenerating ? (
                      <div className="text-center">
                        <Icon name="Loader2" size={48} className="text-purple-600 animate-spin mb-2" />
                        <p className="text-sm text-purple-600">Генерация изображения...</p>
                      </div>
                    ) : (
                      <Icon name="Image" size={48} className="text-purple-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {generatedImage ? 'Изображение сгенерировано успешно!' : 'Сгенерированное изображение появится здесь'}
                  </p>
                  {generatedImage && (
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      <Icon name="Download" size={14} className="mr-2" />
                      Скачать
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="edit" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              {[
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
              ].map((tool, index) => (
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
          </TabsContent>

          <TabsContent value="enhance" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
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
                ].map((feature, index) => (
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
          </TabsContent>

          <TabsContent value="batch" className="animate-fade-in">
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
                      {[
                        'REST API для интеграции',
                        'Webhook уведомления',
                        'Приоритетная обработка',
                        'Коллаборация в команде',
                        'Пользовательские пресеты',
                        'Автоматические воркфлоу'
                      ].map((feature, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AIToolsSection;