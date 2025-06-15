
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { ArrowLeft, Palette, Image, Brush } from 'lucide-react';
import { Button } from '../components/ui/button';

const BackgroundTutorial: React.FC = () => {
  const { lang = 'en' } = useParams();
  const t = useTranslation(lang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Button asChild variant="outline">
              <Link to={`/${lang}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToGame')}
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <Palette className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl font-bold mb-4">{t('backgroundTutorial')}</h1>
            <p className="text-lg text-gray-600">{t('tutorialIntro')}</p>
          </div>
          
          <div className="space-y-8">
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Brush className="w-6 h-6 mr-3 text-blue-600" />
                <h2 className="text-xl font-semibold">{t('gradientBackgrounds')}</h2>
              </div>
              <p className="mb-4">{t('gradientTutorial')}</p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">{t('gradientSteps')}</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Palette className="w-6 h-6 mr-3 text-purple-600" />
                <h2 className="text-xl font-semibold">{t('solidColors')}</h2>
              </div>
              <p className="mb-4">{t('solidColorTutorial')}</p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">{t('solidSteps')}</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Image className="w-6 h-6 mr-3 text-green-600" />
                <h2 className="text-xl font-semibold">{t('customImage')}</h2>
              </div>
              <p className="mb-4">{t('imageTutorial')}</p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600 mb-2">{t('imageSteps')}</p>
                <p className="text-xs text-gray-500">{t('imageRequirements')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTutorial;
