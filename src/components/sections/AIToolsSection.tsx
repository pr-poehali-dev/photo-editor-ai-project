import { RefObject } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GenerationTab from '@/components/sections/aitools/GenerationTab';
import EditingTab from '@/components/sections/aitools/EditingTab';
import EnhanceTab from '@/components/sections/aitools/EnhanceTab';
import BatchTab from '@/components/sections/aitools/BatchTab';

interface AIToolsSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  generatedImage: string | null;
  generateImage: () => void;
  selectedImage: string | null;
  toolSettings: {
    brightness: number[];
    contrast: number[];
    saturation: number[];
    blur: number[];
    noise: number[];
  };
  setToolSettings: (settings: any) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const AIToolsSection = ({
  prompt,
  setPrompt,
  isGenerating,
  generatedImage,
  generateImage,
  selectedImage,
  toolSettings,
  setToolSettings,
  fileInputRef
}: AIToolsSectionProps) => {
  return (
    <section id="tools" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ИИ-инструменты редактирования
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Мощный набор инструментов для профессиональной обработки изображений
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="generate">Генерация</TabsTrigger>
            <TabsTrigger value="edit">Редактирование</TabsTrigger>
            <TabsTrigger value="enhance">Улучшение</TabsTrigger>
            <TabsTrigger value="batch">Пакетная</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="animate-fade-in">
            <GenerationTab
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              generateImage={generateImage}
            />
          </TabsContent>

          <TabsContent value="edit" className="animate-fade-in">
            <EditingTab
              selectedImage={selectedImage}
              toolSettings={toolSettings}
              setToolSettings={setToolSettings}
            />
          </TabsContent>

          <TabsContent value="enhance" className="animate-fade-in">
            <EnhanceTab
              selectedImage={selectedImage}
              fileInputRef={fileInputRef}
            />
          </TabsContent>

          <TabsContent value="batch" className="animate-fade-in">
            <BatchTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AIToolsSection;