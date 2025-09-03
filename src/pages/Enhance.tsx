import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { enhanceImage, upscaleImage } from '@/services/imageAPI';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Icon from '@/components/ui/icon';

const Enhance = () => {
  const { user, login, register, logout } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setIsProcessing(true);

    try {
      let result: string;
      
      switch (operation) {
        case 'upscale':
          result = await upscaleImage(currentFile, 2);
          break;
        case 'upscale_4x':
          result = await upscaleImage(currentFile, 4);
          break;
        default:
          result = await enhanceImage(currentFile, operation);
      }

      setProcessedImage(result);

    } catch (error) {
      console.error('Processing failed:', error);
      alert('Ошибка обработки изображения');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enhancements = [
    {
      id: 'auto_enhance',
      name: 'Автоулучшение',
      icon: 'Sparkles',
      description: 'ИИ анализирует и улучшает фото автоматически',
      category: 'Базовое',
      premium: false
    },
    {
      id: 'denoise',
      name: 'Устранение шума',
      icon: 'Eye',
      description: 'Профессиональное шумоподавление',
      category: 'Продвинутое',
      premium: true
    },
    {
      id: 'upscale',
      name: 'Увеличение 2x',
      icon: 'Maximize',
      description: 'AI upscaling до 2K разрешения',
      category: 'Продвинутое',
      premium: true
    },
    {
      id: 'upscale_4x',
      name: 'Увеличение 4x',
      icon: 'Maximize2',
      description: 'AI upscaling до 4K разрешения',
      category: 'Профи',
      premium: true
    },
    {
      id: 'hdr',
      name: 'HDR-обработка',
      icon: 'Sun',
      description: 'Расширенный динамический диапазон',
      category: 'Профи',
      premium: true
    },
    {
      id: 'restore',
      name: 'Реставрация',
      icon: 'RefreshCw',
      description: 'ИИ восстанавливает старые и поврежденные фото',
      category: 'Профи',
      premium: true
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
            ИИ-улучшение изображений
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Профессиональное улучшение качества фотографий с помощью передовых алгоритмов машинного обучения
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
                <h3 className="text-lg font-semibold mb-2">Загрузите изображение для улучшения</h3>
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
            {/* Инструменты улучшения */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Wand2" size={20} className="mr-2" />
                    ИИ-улучшения
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {enhancements.map((enhancement) => (
                    <Button
                      key={enhancement.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => processImage(enhancement.id)}
                      disabled={isProcessing || !user || (enhancement.premium && user.plan === 'free')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={enhancement.icon as any} size={16} className="text-primary" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{enhancement.name}</span>
                            {enhancement.premium && (
                              <Badge size="sm" variant="secondary">PRO</Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 text-left">
                            {enhancement.description}
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
                    <Icon name="Info" size={20} className="mr-2" />
                    Информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Загруженное изображение:</h4>
                    <p className="text-gray-600">
                      Формат: {currentFile?.type || 'Неизвестен'}
                    </p>
                    <p className="text-gray-600">
                      Размер: {currentFile ? Math.round(currentFile.size / 1024) : 0} KB
                    </p>
                  </div>
                  {user?.plan === 'free' && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-800 text-xs">
                        Некоторые функции доступны только в PRO версии
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Изображения */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="compare" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="original">Оригинал</TabsTrigger>
                  <TabsTrigger value="enhanced">Улучшенное</TabsTrigger>
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

                <TabsContent value="enhanced">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Улучшенное изображение</span>
                        {processedImage && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadImage(processedImage)}
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
                          <LoadingSpinner size="lg" text="Улучшение изображения..." />
                        ) : processedImage ? (
                          <img 
                            src={processedImage} 
                            alt="Улучшенное" 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <Icon name="ImageOff" size={48} className="mx-auto mb-4" />
                            <p>Улучшенное изображение появится здесь</p>
                            <p className="text-sm mt-2">Выберите тип улучшения</p>
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
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 text-center">До улучшения</h4>
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                              src={selectedImage} 
                              alt="До" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3 text-center">После улучшения</h4>
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                            {isProcessing ? (
                              <LoadingSpinner text="Обработка..." />
                            ) : processedImage ? (
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
                      
                      {processedImage && !isProcessing && (
                        <div className="mt-6 text-center">
                          <div className="inline-flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <Icon name="CheckCircle" size={20} className="text-green-600" />
                            <span className="text-green-800 font-medium">Изображение успешно улучшено!</span>
                          </div>
                        </div>
                      )}
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

export default Enhance;