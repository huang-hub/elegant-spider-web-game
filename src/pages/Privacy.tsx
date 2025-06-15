
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const Privacy: React.FC = () => {
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
          
          <h1 className="text-3xl font-bold mb-6">{t('privacyPolicy')}</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">{t('dataCollection')}</h2>
            <p className="mb-4">{t('dataCollectionText')}</p>
            
            <h2 className="text-xl font-semibold mb-3">{t('dataUsage')}</h2>
            <p className="mb-4">{t('dataUsageText')}</p>
            
            <h2 className="text-xl font-semibold mb-3">{t('dataStorage')}</h2>
            <p className="mb-4">{t('dataStorageText')}</p>
            
            <h2 className="text-xl font-semibold mb-3">{t('contact')}</h2>
            <p className="mb-4">{t('contactText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
