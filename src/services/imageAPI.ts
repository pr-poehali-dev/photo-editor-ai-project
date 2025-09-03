const FLUX_API_URL = 'https://api.replicate.com/v1/predictions';
const FLUX_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN || '';

export interface GenerateImageRequest {
  prompt: string;
  width?: number;
  height?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
}

export interface ImageGenerationResult {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  output?: string[];
  error?: string;
}

export const generateImage = async (request: GenerateImageRequest): Promise<string> => {
  try {
    // Для демонстрации используем Picsum с параметрами из промпта
    const { width = 512, height = 512, seed } = request;
    
    // Создаем детерминированный seed на основе промпта
    const promptSeed = seed || Array.from(request.prompt).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Имитируем задержку генерации
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // В реальном проекте здесь был бы вызов реального API
    if (FLUX_API_TOKEN) {
      const response = await fetch(FLUX_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${FLUX_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "black-forest-labs/flux-schnell:bf2f5ee5d90b8b9e6b522d0e9dc7fc9c7a4e9e8e4f5e2d8c6b5a3f1e9d8c7b6a",
          input: {
            prompt: request.prompt,
            width,
            height,
            num_inference_steps: request.num_inference_steps || 4,
            guidance_scale: request.guidance_scale || 0,
            seed: promptSeed,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const result = await response.json();
      
      // Ждем завершения генерации
      let status = 'starting';
      let attempts = 0;
      const maxAttempts = 60; // 5 минут максимум
      
      while (status !== 'succeeded' && status !== 'failed' && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
          headers: {
            'Authorization': `Token ${FLUX_API_TOKEN}`,
          }
        });
        
        const statusData = await statusResponse.json();
        status = statusData.status;
        
        if (status === 'succeeded') {
          return statusData.output[0];
        }
        
        if (status === 'failed') {
          throw new Error(statusData.error || 'Generation failed');
        }
        
        attempts++;
      }
      
      if (attempts >= maxAttempts) {
        throw new Error('Generation timeout');
      }
    }
    
    // Fallback к Picsum для демонстрации
    return `https://picsum.photos/seed/${promptSeed}/${width}/${height}`;
    
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Fallback к случайному изображению
    const fallbackSeed = Date.now();
    return `https://picsum.photos/seed/${fallbackSeed}/${request.width || 512}/${request.height || 512}`;
  }
};

export const enhanceImage = async (imageFile: File, enhancement: string): Promise<string> => {
  try {
    // Имитируем обработку изображения
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // В реальном проекте здесь была бы загрузка файла и обработка через API
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('enhancement', enhancement);
    
    // Для демонстрации возвращаем обработанную версию
    const seed = Date.now();
    return `https://picsum.photos/seed/${seed}/512/512?blur=2`;
    
  } catch (error) {
    console.error('Error enhancing image:', error);
    throw new Error('Ошибка обработки изображения');
  }
};

export const removeBackground = async (imageFile: File): Promise<string> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // В реальном проекте здесь был бы вызов API для удаления фона
    const seed = Date.now();
    return `https://picsum.photos/seed/${seed}/512/512`;
    
  } catch (error) {
    console.error('Error removing background:', error);
    throw new Error('Ошибка удаления фона');
  }
};

export const upscaleImage = async (imageFile: File, scale: number = 2): Promise<string> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // В реальном проекте здесь был бы вызов Real-ESRGAN или аналогичного API
    const seed = Date.now();
    const newSize = 512 * scale;
    return `https://picsum.photos/seed/${seed}/${newSize}/${newSize}`;
    
  } catch (error) {
    console.error('Error upscaling image:', error);
    throw new Error('Ошибка увеличения разрешения');
  }
};