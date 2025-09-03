import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

const Navigation = () => {
  const location = useLocation();

  const mainNavItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/gallery', label: 'Галерея', icon: 'Images' },
    { path: '/pricing', label: 'Тарифы', icon: 'CreditCard' },
    { path: '/about', label: 'О нас', icon: 'Info' }
  ];

  const editorItems = [
    { path: '/generate', label: 'Генерация', icon: 'Wand2' },
    { path: '/editor', label: 'Редактирование', icon: 'ImageIcon' },
    { path: '/enhance', label: 'Улучшение', icon: 'Sparkles' }
  ];

  const authItems = [
    { path: '/login', label: 'Вход', icon: 'LogIn' },
    { path: '/register', label: 'Регистрация', icon: 'UserPlus' }
  ];

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            AI Photo Editor
          </Link>
          
          <div className="flex items-center space-x-1">
            {/* Main Navigation */}
            <div className="hidden md:flex space-x-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  asChild
                  size="sm"
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon name={item.icon as any} size={16} />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>

            {/* Editor Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={editorItems.some(item => location.pathname === item.path) ? 'default' : 'ghost'} 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Edit" size={16} />
                  <span>Инструменты</span>
                  <Icon name="ChevronDown" size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {editorItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center space-x-2 w-full">
                      <Icon name={item.icon as any} size={16} />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={authItems.some(item => location.pathname === item.path) ? 'default' : 'ghost'} 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon name="User" size={16} />
                  <span>Аккаунт</span>
                  <Icon name="ChevronDown" size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {authItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center space-x-2 w-full">
                      <Icon name={item.icon as any} size={16} />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon name="Menu" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {mainNavItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center space-x-2 w-full">
                        <Icon name={item.icon as any} size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {editorItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center space-x-2 w-full">
                        <Icon name={item.icon as any} size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {authItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center space-x-2 w-full">
                        <Icon name={item.icon as any} size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;