import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  selectedImage: string | null;
  uploadProgress: number;
  dragActive: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
}

const HeroSection = ({
  selectedImage,
  uploadProgress,
  dragActive,
  fileInputRef,
  handleDrop,
  handleDragOver,
  handleDragLeave
}: HeroSectionProps) => {
  return (
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
  );
};

export default HeroSection;