import { useState, useRef, useCallback } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import AIToolsSection from '@/components/sections/AIToolsSection';
import GallerySection from '@/components/sections/GallerySection';
import PricingSection from '@/components/sections/PricingSection';
import LearningSection from '@/components/sections/LearningSection';
import FooterSection from '@/components/sections/FooterSection';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user, login, register, logout } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [toolSettings, setToolSettings] = useState({
    brightness: [0],
    contrast: [0],
    saturation: [0],
    blur: [0],
    noise: [0]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadProgress(0);
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(25);
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Имитация API запроса - в реальном проекте здесь был бы вызов API генерации
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(mockImageUrl);
    } catch (error) {
      console.error('Ошибка генерации:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyFilter = (filterType: string) => {
    console.log(`Применение фильтра: ${filterType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      <Header user={user} onLogin={login} onRegister={register} onLogout={logout} />

      <HeroSection
        selectedImage={selectedImage}
        uploadProgress={uploadProgress}
        dragActive={dragActive}
        fileInputRef={fileInputRef}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
      />

      <AIToolsSection
        prompt={prompt}
        setPrompt={setPrompt}
        isGenerating={isGenerating}
        generatedImage={generatedImage}
        generateImage={generateImage}
        selectedImage={selectedImage}
        toolSettings={toolSettings}
        setToolSettings={setToolSettings}
        fileInputRef={fileInputRef}
      />

      <GallerySection />

      <PricingSection />

      <LearningSection />

      <FooterSection />
    </div>
  );
};

export default Index;