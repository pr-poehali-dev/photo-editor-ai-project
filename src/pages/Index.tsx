import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { user, login, register, logout } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [toolSettings, setToolSettings] = useState({
    brightness: [0],
    contrast: [0],
    saturation: [0],
    blur: [0],
    noise: [0]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadProgress(0);
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(25);
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Имитация API запроса - в реальном проекте здесь был бы вызов API генерации
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(mockImageUrl);
    } catch (error) {
      console.error('Ошибка генерации:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyFilter = (filterType: string) => {
    console.log(`Применение фильтра: ${filterType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      <Header user={user} onLogin={login} onRegister={register} onLogout={logout} />

      {/* Hero Section with Upload */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4">
              <Icon name="Zap" size={14} className="mr-1" />
              Powered by AI
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Профессиональное
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                редактирование фото
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Создавайте, редактируйте и улучшайте изображения с помощью передовых ИИ-технологий. 
              Профессиональный результат за считанные секунды.
            </p>
            
            {/* Upload Area */}
            <div className="max-w-md mx-auto mb-8">
              <div
                className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img src={selectedImage} alt="Загруженное изображение" className="max-w-full h-32 object-cover rounded-lg mx-auto" />
                    <p className="text-sm text-gray-600">Изображение загружено успешно!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Icon name="Upload" size={32} className="text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600">Перетащите изображение сюда или кликните</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP до 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generate">
                <Button size="lg" className="px-8">
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  Генерировать ИИ
                </Button>
              </Link>
              <Link to="/editor">
                <Button variant="outline" size="lg" className="px-8">
                  <Icon name="Upload" size={18} className="mr-2" />
                  Редактировать фото
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section with Modals */}
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
                                    setToolSettings(prev => ({ ...prev, brightness: value }))
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
                                    setToolSettings(prev => ({ ...prev, contrast: value }))
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

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Галерея работ
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Примеры обработанных изображений и результаты работы наших пользователей
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-200 to-indigo-200 aspect-square cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white text-sm font-medium">Образец #{index + 1}</p>
                  <p className="text-white/70 text-xs">ИИ-обработка</p>
                </div>
                <div className="flex items-center justify-center h-full">
                  <Icon name="Image" size={32} className="text-purple-600" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <Icon name="Plus" size={18} className="mr-2" />
              Загрузить в галерею
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Тарифные планы
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Выберите подходящий план для ваших задач
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Стартовый',
                price: 'Бесплатно',
                period: '',
                features: ['5 изображений в месяц', 'Базовые фильтры', 'Стандартное качество', 'Поддержка сообщества'],
                popular: false
              },
              {
                name: 'Профи',
                price: '990',
                period: '₽/мес',
                features: ['100 изображений в месяц', 'Все ИИ-инструменты', '4K качество', 'Приоритетная поддержка', 'API доступ'],
                popular: true
              },
              {
                name: 'Команда',
                price: '2990',
                period: '₽/мес',
                features: ['Безлимитная обработка', 'Коллаборация', 'Белый лейбл', 'Персональный менеджер', 'SLA 99.9%'],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {plan.period && <span className="text-lg text-gray-500 font-normal">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === 'Бесплатно' ? 'Начать бесплатно' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section id="learn" className="py-16 px-4 bg-gradient-to-br from-primary/5 to-purple-100/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Обучение и поддержка
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Освойте все возможности редактора с помощью наших материалов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'BookOpen',
                title: 'Документация',
                description: 'Подробные руководства по всем функциям',
                link: 'Читать'
              },
              {
                icon: 'Video',
                title: 'Видеоуроки',
                description: 'Пошаговые видеоинструкции',
                link: 'Смотреть'
              },
              {
                icon: 'Users',
                title: 'Сообщество',
                description: 'Общайтесь с другими пользователями',
                link: 'Присоединиться'
              },
              {
                icon: 'MessageCircle',
                title: 'Поддержка 24/7',
                description: 'Помощь в любое время',
                link: 'Написать'
              },
              {
                icon: 'Lightbulb',
                title: 'Советы и трюки',
                description: 'Секреты профессиональной обработки',
                link: 'Узнать'
              },
              {
                icon: 'Code',
                title: 'API документация',
                description: 'Интегрируйте наш сервис в свои проекты',
                link: 'Изучить'
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon name={item.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    {item.link}
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;