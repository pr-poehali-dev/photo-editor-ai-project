import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Photo Editor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональное редактирование фотографий с помощью искусственного интеллекта. 
            Создавайте потрясающие изображения за считанные секунды.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/editor" className="flex items-center gap-2">
                <Icon name="Wand2" size={20} />
                Начать редактирование
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/gallery">
                Посмотреть галерею
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={24} className="text-purple-600" />
                <CardTitle>AI Генерация</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Создавайте уникальные изображения из текстового описания с помощью продвинутых AI моделей.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="Palette" size={24} className="text-pink-600" />
                <CardTitle>Фильтры и Эффекты</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Широкий выбор художественных фильтров и эффектов для создания идеального стиля изображения.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="Download" size={24} className="text-blue-600" />
                <CardTitle>Быстрое Сохранение</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Мгновенная обработка и загрузка результатов в высоком качестве.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;