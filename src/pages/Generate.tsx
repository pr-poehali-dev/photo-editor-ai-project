import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { generateImage } from '@/services/imageAPI';
import Icon from '@/components/ui/icon';

const Generate = () => {
  const { user, login, register, logout } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    style: 'realistic',
    width: 512,
    height: 512,
    steps: 4,
    guidance: 7.5,
    highRes: false,
  });
  const [history, setHistory] = useState<Array<{
    id: string;
    prompt: string;
    image: string;
    timestamp: Date;
  }>>([]);

  const styles = [
    { value: 'realistic', label: 'Реалистичный', icon: 'Camera' },
    { value: 'artistic', label: 'Художественный', icon: 'Palette' },
    { value: 'anime', label: 'Аниме', icon: 'Sparkles' },
    { value: '3d', label: '3D рендер', icon: 'Box' },
    { value: 'vintage', label: 'Винтаж', icon: 'Clock' },
    { value: 'cyberpunk', label: 'Киберпанк', icon: 'Zap' },
  ];

  const resolutions = [
    { width: 512, height: 512, label: '1:1 (512×512)' },
    { width: 768, height: 512, label: '3:2 (768×512)' },
    { width: 512, height: 768, label: '2:3 (512×768)' },
    { width: 1024, height: 1024, label: '1:1 HD (1024×1024)', premium: true },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    if (!user) {
      alert('Войдите в аккаунт для генерации изображений');
      return;
    }

    if (user.credits <= 0) {
      alert('У вас недостаточно кредитов. Обновите тарифный план.');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGeneratedImage(null);

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

      const enhancedPrompt = `${prompt}, ${settings.style} style, high quality, detailed`;
      
      const imageUrl = await generateImage({
        prompt: enhancedPrompt,
        width: settings.width,
        height: settings.height,
        num_inference_steps: settings.steps,
        guidance_scale: settings.guidance,
      });

      clearInterval(progressInterval);
      setProgress(100);
      
      setGeneratedImage(imageUrl);
      
      const newItem = {
        id: Date.now().toString(),
        prompt,
        image: imageUrl,
        timestamp: new Date(),
      };
      
      setHistory(prev => [newItem, ...prev.slice(0, 9)]);

      setTimeout(() => {
        setProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Generation failed:', error);
      alert('Ошибка генерации изображения. Попробуйте еще раз.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header user={user} onLogin={login} onRegister={register} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ИИ-генератор изображений
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Создавайте уникальные изображения из текстового описания с помощью передовых нейронных сетей
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Настройки и промпт */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Type" size={20} className="mr-2" />
                  Описание изображения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Опишите изображение, которое хотите создать. Например: 'Футуристический город на закате, неоновые огни, киберпанк стиль, высокая детализация'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="text-xs text-gray-500">
                  Чем подробнее описание, тем лучше результат
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Settings" size={20} className="mr-2" />
                  Настройки генерации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Стиль</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((style) => (
                      <Button
                        key={style.value}
                        variant={settings.style === style.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSettings(prev => ({ ...prev, style: style.value }))}
                        className="justify-start"
                      >
                        <Icon name={style.icon as any} size={14} className="mr-2" />
                        {style.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium mb-3 block">Разрешение</Label>
                  <Select 
                    value={`${settings.width}x${settings.height}`}
                    onValueChange={(value) => {
                      const [width, height] = value.split('x').map(Number);
                      setSettings(prev => ({ ...prev, width, height }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutions.map((res) => (
                        <SelectItem 
                          key={`${res.width}x${res.height}`} 
                          value={`${res.width}x${res.height}`}
                          disabled={res.premium && user?.plan === 'free'}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{res.label}</span>
                            {res.premium && <Badge size="sm">PRO</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-sm font-medium">Качество</Label>
                    <span className="text-sm text-gray-500">{settings.steps} шагов</span>
                  </div>
                  <Slider
                    value={[settings.steps]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, steps: value }))}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-sm font-medium">Точность</Label>
                    <span className="text-sm text-gray-500">{settings.guidance}</span>
                  </div>
                  <Slider
                    value={[settings.guidance]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, guidance: value }))}
                    max={20}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Высокое разрешение</Label>
                  <Switch
                    checked={settings.highRes}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, highRes: checked }))}
                    disabled={user?.plan === 'free'}
                  />
                </div>
                {user?.plan === 'free' && (
                  <p className="text-xs text-gray-500">Доступно в PRO версии</p>
                )}
              </CardContent>
            </Card>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim() || !user}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Icon name="Wand2" size={18} className="mr-2" />
                  Сгенерировать изображение
                </>
              )}
            </Button>
          </div>

          {/* Результат */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon name="Image" size={20} className="mr-2" />
                    Результат
                  </div>
                  {generatedImage && (
                    <Button variant="outline" size="sm" onClick={downloadImage}>
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center space-y-4">
                      <div className="animate-pulse">
                        <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-4" />
                      </div>
                      <div>
                        <p className="text-gray-600 mb-2">Генерация изображения...</p>
                        <Progress value={progress} className="w-48 mx-auto" />
                        <p className="text-xs text-gray-500 mt-2">{Math.round(progress)}%</p>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <img 
                      src={generatedImage} 
                      alt="Сгенерированное изображение" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <Icon name="ImagePlus" size={48} className="mx-auto mb-4" />
                      <p>Сгенерированное изображение появится здесь</p>
                      <p className="text-sm mt-2">Опишите желаемое изображение и нажмите "Сгенерировать"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* История генераций */}
            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="History" size={20} className="mr-2" />
                    История генераций
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {history.map((item) => (
                      <div 
                        key={item.id} 
                        className="group cursor-pointer"
                        onClick={() => setGeneratedImage(item.image)}
                      >
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:ring-2 group-hover:ring-primary transition-all">
                          <img 
                            src={item.image} 
                            alt={item.prompt} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-600 truncate" title={item.prompt}>
                          {item.prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;