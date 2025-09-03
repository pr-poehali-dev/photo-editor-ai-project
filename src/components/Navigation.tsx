import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/editor', label: 'Редактор', icon: 'ImageIcon' },
    { path: '/gallery', label: 'Галерея', icon: 'Images' },
    { path: '/about', label: 'О нас', icon: 'Info' }
  ];

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            AI Photo Editor
          </Link>
          
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                asChild
              >
                <Link to={item.path} className="flex items-center space-x-2">
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;