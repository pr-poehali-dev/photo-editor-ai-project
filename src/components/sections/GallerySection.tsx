import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const GallerySection = () => {
  return (
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
  );
};

export default GallerySection;