
import React, { useState } from 'react';
import { useGameStore, BackgroundSettings } from '../stores/gameStore';
import { useTranslation } from '../utils/translations';
import { Palette, Image, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const BackgroundCustomizer: React.FC = () => {
  const { backgroundSettings, updateBackgroundSettings, language } = useGameStore();
  const t = useTranslation(language);
  const [tempImageUrl, setTempImageUrl] = useState(backgroundSettings.imageUrl);

  const presetGradients = [
    { from: '#166534', to: '#14532d', name: 'default' },
    { from: '#1e40af', to: '#1e3a8a', name: 'blue' },
    { from: '#7c2d12', to: '#991b1b', name: 'red' },
    { from: '#581c87', to: '#6b21a8', name: 'purple' },
    { from: '#374151', to: '#1f2937', name: 'gray' }
  ];

  const presetColors = [
    '#166534', '#1e40af', '#7c2d12', '#581c87', '#374151'
  ];

  const handleGradientChange = (from: string, to: string) => {
    updateBackgroundSettings({
      type: 'gradient',
      gradientFrom: from,
      gradientTo: to
    });
  };

  const handleSolidColorChange = (color: string) => {
    updateBackgroundSettings({
      type: 'solid',
      solidColor: color
    });
  };

  const handleImageUrlSubmit = () => {
    if (tempImageUrl.trim()) {
      updateBackgroundSettings({
        type: 'image',
        imageUrl: tempImageUrl.trim()
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
          <Palette className="w-4 h-4 mr-2" />
          {t('customizeBackground')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">{t('gradientBackgrounds')}</h4>
            <div className="grid grid-cols-5 gap-2">
              {presetGradients.map((gradient, index) => (
                <button
                  key={index}
                  className="w-12 h-12 rounded border-2 border-gray-300 hover:border-gray-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`
                  }}
                  onClick={() => handleGradientChange(gradient.from, gradient.to)}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('solidColors')}</h4>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((color, index) => (
                <button
                  key={index}
                  className="w-12 h-12 rounded border-2 border-gray-300 hover:border-gray-500"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSolidColorChange(color)}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('customImage')}</h4>
            <div className="space-y-2">
              <Input
                type="url"
                placeholder={t('imageUrlPlaceholder')}
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
              />
              <Button 
                onClick={handleImageUrlSubmit}
                className="w-full"
                size="sm"
              >
                <Image className="w-4 h-4 mr-2" />
                {t('applyImage')}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BackgroundCustomizer;
