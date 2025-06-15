
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { ArrowLeft, Users, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';

const About: React.FC = () => {
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
            <Users className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl font-bold mb-4">{t('aboutTeam')}</h1>
            <p className="text-lg text-gray-600">{t('teamDescription')}</p>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">{t('ourMission')}</h2>
            <p className="mb-4">{t('missionText')}</p>
            
            <h2 className="text-xl font-semibold mb-3">{t('gameFeatures')}</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('feature1')}</li>
              <li>{t('feature2')}</li>
              <li>{t('feature3')}</li>
              <li>{t('feature4')}</li>
            </ul>
            
            <div className="text-center mt-8 p-6 bg-green-50 rounded-lg">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="text-gray-700">{t('madeWithLove')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
