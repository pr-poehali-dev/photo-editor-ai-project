import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Примерные данные галереи
  const images = [
    { id: 1, src: '/api/placeholder/300/300', title: 'Портрет в стиле ренессанс', category: 'portrait', likes: 45 },
    { id: 2, src: '/api/placeholder/300/400', title: 'Футуристический город', category: 'landscape', likes: 89 },
    { id: 3, src: '/api/placeholder/400/300', title: 'Абстрактное искусство', category: 'abstract', likes: 32 },
    { id: 4, src: '/api/placeholder/350/350', title: 'Космический пейзаж', category: 'space', likes: 156 },
    { id: 5, src: '/api/placeholder/300/350', title: 'Цветочная композиция', category: 'nature', likes: 78 },
    { id: 6, src: '/api/placeholder/400/300', title: 'Винтажный автомобиль', category: 'vintage', likes: 67 },
    { id: 7, src: '/api/placeholder/300/400', title: 'Горный пейзаж', category: 'landscape', likes: 123 },
    { id: 8, src: '/api/placeholder/350/300', title: 'Городская архитектура', category: 'urban', likes: 91 },
  ];

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3X3' },
    { id: 'portrait', label: 'Портреты', icon: 'User' },
    { id: 'landscape', label: 'Пейзажи', icon: 'Mountain' },
    { id: 'abstract', label: 'Абстракция', icon: 'Palette' },
    { id: 'space', label: 'Космос', icon: 'Rocket' },
    { id: 'nature', label: 'Природа', icon: 'Flower' },
    { id: 'vintage', label: 'Винтаж', icon: 'Clock' },
    { id: 'urban', label: 'Городское', icon: 'Building' },
  ];

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Галерея AI Art</h1>
        <p className="text-muted-foreground text-lg">
          Коллекция изображений, созданных с помощью искусственного интеллекта
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск изображений..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon name={category.icon as any} size={16} />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Просмотр
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{image.title}</h3>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {categories.find(c => c.id === image.category)?.label}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Heart" size={16} className="text-red-500" />
                        <span className="text-sm text-muted-foreground">{image.likes}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl">
              <div className="space-y-4">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{image.title}</h2>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      {categories.find(c => c.id === image.category)?.label}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={16} className="text-red-500" />
                      <span>{image.likes} лайков</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex items-center gap-2">
                      <Icon name="Download" size={16} />
                      Скачать
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Icon name="Share2" size={16} />
                      Поделиться
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Icon name="Heart" size={16} />
                      Нравится
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить критерии поиска или выбрать другую категорию
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;