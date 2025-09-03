import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { enhanceImage, removeBackground, upscaleImage } from '@/services/imageAPI';
import Icon from '@/components/ui/icon';

const Editor = () => {
  const { user, login, register, logout } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  
  const [filters, setFilters] = useState({
    brightness: [0],
    contrast: [0],
    saturation: [0],
    blur: [0],
    sharpness: [0],
  });

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setCurrentFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setProcessedImage(null);
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

  const processImage = async (operation: string) => {
    if (!currentFile || !user) return;

    if (user.credits <= 0) {
      alert('У вас недостаточно кредитов для обработки изображений');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      let result: string;
      
      switch (operation) {
        case 'enhance':
          result = await enhanceImage(currentFile, 'auto_enhance');
          break;
        case 'remove_bg':
          result = await removeBackground(currentFile);
          break;
        case 'upscale':
          result = await upscaleImage(currentFile, 2);
          break;
        default:
          result = await enhanceImage(currentFile, operation);
      }

      clearInterval(progressInterval);
      setProgress(100);
      setProcessedImage(result);

      setTimeout(() => setProgress(0), 1000);

    } catch (error) {
      console.error('Processing failed:', error);
      alert('Ошибка обработки изображения. Попробуйте еще раз.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tools = [
    {
      id: 'enhance',
      name: 'Автоулучшение',
      icon: 'Sparkles',
      description: 'ИИ анализирует и улучшает фото автоматически',
      category: 'basic'
    },
    {
      id: 'remove_bg',
      name: 'Удаление фона',
      icon: 'Eraser',
      description: 'Точное удаление фона с сохранением деталей',
      category: 'advanced'
    },
    {
      id: 'upscale',
      name: 'Увеличение разрешения',
      icon: 'Maximize',
      description: 'AI upscaling до 4K без потери качества',
      category: 'advanced'
    },
    {
      id: 'denoise',
      name: 'Устранение шума',
      icon: 'Eye',
      description: 'Профессиональное шумоподавление',
      category: 'advanced'
    },
    {
      id: 'colorize',
      name: 'Колоризация',
      icon: 'Palette',
      description: 'Добавление цвета к черно-белым фото',
      category: 'creative'
    },
    {
      id: 'restore',
      name: 'Реставрация',
      icon: 'RefreshCw',
      description: 'Восстановление старых и поврежденных фото',
      category: 'advanced'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header user={user} onLogin={login} onRegister={register} onLogout={logout} />
      
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

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ИИ-редактор изображений
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Профессиональное редактирование фотографий с помощью передовых алгоритмов машинного обучения
          </p>
          {user && (
            <div className="mt-4">
              <Badge variant="secondary">
                <Icon name="Zap" size={14} className="mr-1" />
                Кредитов: {user.credits}
              </Badge>
            </div>
          )}
        </div>

        {!selectedImage ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon name="Upload" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Загрузите изображение</h3>
                <p className="text-gray-600 mb-4">
                  Перетащите файл сюда или кликните для выбора
                </p>
                <p className="text-sm text-gray-500">
                  Поддерживаются форматы: PNG, JPG, WEBP (до 10MB)
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Инструменты */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Wrench" size={20} className="mr-2" />
                    ИИ-инструменты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => processImage(tool.id)}
                      disabled={isProcessing || !user}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={tool.icon as any} size={16} className="text-primary" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-gray-500 text-left">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Sliders" size={20} className="mr-2" />
                    Ручная настройка
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(filters).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-sm capitalize">
                          {key === 'brightness' ? 'Яркость' :
                           key === 'contrast' ? 'Контраст' :
                           key === 'saturation' ? 'Насыщенность' :
                           key === 'blur' ? 'Размытие' :
                           'Резкость'}
                        </Label>
                        <span className="text-sm text-gray-500">{value[0]}</span>
                      </div>
                      <Slider
                        value={value}
                        onValueChange={(newValue) =>
                          setFilters(prev => ({ ...prev, [key]: newValue }))
                        }
                        max={100}
                        min={-100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => processImage('manual_adjust')}
                    disabled={isProcessing}
                  >
                    Применить настройки
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Изображения */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="compare" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="original">Оригинал</TabsTrigger>
                  <TabsTrigger value="processed">Обработанное</TabsTrigger>
                  <TabsTrigger value="compare">Сравнение</TabsTrigger>
                </TabsList>

                <TabsContent value="original">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Исходное изображение</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Icon name="Upload" size={16} className="mr-2" />
                          Загрузить другое
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={selectedImage} 
                          alt="Оригинал" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="processed">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Обработанное изображение</span>
                        {processedImage && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadImage(processedImage, 'processed-image.jpg')}
                          >
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {isProcessing ? (
                          <div className="text-center space-y-4">
                            <div className="animate-pulse">
                              <Icon name="Wand2" size={48} className="text-primary mx-auto mb-4" />
                            </div>
                            <div>
                              <p className="text-gray-600 mb-2">Обработка изображения...</p>
                              <Progress value={progress} className="w-48 mx-auto" />
                              <p className="text-xs text-gray-500 mt-2">{Math.round(progress)}%</p>
                            </div>
                          </div>
                        ) : processedImage ? (
                          <img 
                            src={processedImage} 
                            alt="Обработанное" 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <Icon name="ImageOff" size={48} className="mx-auto mb-4" />
                            <p>Обработанное изображение появится здесь</p>
                            <p className="text-sm mt-2">Выберите инструмент обработки</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="compare">
                  <Card>
                    <CardHeader>
                      <CardTitle>Сравнение до и после</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">До</h4>
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                              src={selectedImage} 
                              alt="До" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">После</h4>
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                            {processedImage ? (
                              <img 
                                src={processedImage} 
                                alt="После" 
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="text-center text-gray-500">
                                <Icon name="ArrowRight" size={24} className="mx-auto mb-2" />
                                <p className="text-sm">Результат обработки</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;