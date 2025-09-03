import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <Icon 
        name="Loader2" 
        className={cn('animate-spin text-primary', sizeClasses[size])}
      />
      {text && (
        <p className={cn('text-gray-600', textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;