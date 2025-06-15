
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { ArrowLeft, Target, Move, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';

const HowToPlay: React.FC = () => {
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
            <Target className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl font-bold mb-4">{t('howToPlay')}</h1>
            <p className="text-lg text-gray-600">{t('gameRulesIntro')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-2">{t('objective')}</h3>
              <p className="text-sm text-gray-600">{t('objectiveText')}</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Move className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-2">{t('gameplay')}</h3>
              <p className="text-sm text-gray-600">{t('gameplayText')}</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <h3 className="font-semibold mb-2">{t('winning')}</h3>
              <p className="text-sm text-gray-600">{t('winningText')}</p>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">{t('detailedRules')}</h2>
            
            <h3 className="text-lg font-medium mb-2">{t('setup')}</h3>
            <p className="mb-4">{t('setupText')}</p>
            
            <h3 className="text-lg font-medium mb-2">{t('cardMovement')}</h3>
            <p className="mb-4">{t('cardMovementText')}</p>
            
            <h3 className="text-lg font-medium mb-2">{t('sequenceCompletion')}</h3>
            <p className="mb-4">{t('sequenceCompletionText')}</p>
            
            <h3 className="text-lg font-medium mb-2">{t('difficultyLevels')}</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>{t('easy')}:</strong> {t('easyDescription')}</li>
              <li><strong>{t('medium')}:</strong> {t('mediumDescription')}</li>
              <li><strong>{t('hard')}:</strong> {t('hardDescription')}</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2">{t('tips')}</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('tip1')}</li>
              <li>{t('tip2')}</li>
              <li>{t('tip3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
