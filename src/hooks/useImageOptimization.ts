import { useState, useCallback, useMemo } from 'react';

interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export const useImageOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizeImage = useCallback(async (
    file: File, 
    options: ImageOptimizationOptions = {}
  ): Promise<string> => {
    const {
      maxWidth = 1024,
      maxHeight = 1024,
      quality = 0.8,
      format = 'webp'
    } = options;

    return new Promise((resolve) => {
      setIsOptimizing(true);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Вычисляем новые размеры с сохранением пропорций
        const { width, height } = calculateDimensions(
          img.width, 
          img.height, 
          maxWidth, 
          maxHeight
        );

        canvas.width = width;
        canvas.height = height;

        // Рисуем оптимизированное изображение
        ctx?.drawImage(img, 0, 0, width, height);

        // Конвертируем в нужный формат
        const mimeType = format === 'webp' ? 'image/webp' : 
                        format === 'jpeg' ? 'image/jpeg' : 'image/png';
        
        canvas.toBlob((blob) => {
          if (blob) {
            const optimizedUrl = URL.createObjectURL(blob);
            resolve(optimizedUrl);
          } else {
            resolve(URL.createObjectURL(file));
          }
          setIsOptimizing(false);
        }, mimeType, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }, []);

  const calculateDimensions = useMemo(() => {
    return (originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number) => {
      let { width, height } = { width: originalWidth, height: originalHeight };

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      return { width: Math.floor(width), height: Math.floor(height) };
    };
  }, []);

  return {
    optimizeImage,
    isOptimizing,
    calculateDimensions
  };
};