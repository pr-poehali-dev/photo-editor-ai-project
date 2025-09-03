import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface GenerationTabProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  generatedImage: string | null;
  generateImage: () => void;
}

const GenerationTab = ({
  prompt,
  setPrompt,
  isGenerating,
  generatedImage,
  generateImage
}: GenerationTabProps) => {
  return (
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
  );
};

export default GenerationTab;