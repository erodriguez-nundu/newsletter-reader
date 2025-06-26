
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsletterHeaderProps {
  currentDate: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const NewsletterHeader = ({ 
  currentDate, 
  onPreviousDay, 
  onNextDay, 
  hasNext, 
  hasPrevious 
}: NewsletterHeaderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-newsletter-blue rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Newsletter Diario</h1>
              <p className="text-sm text-newsletter-dark-gray capitalize">
                {formatDate(currentDate)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousDay}
              disabled={!hasPrevious}
              className="border-gray-300 hover:bg-gray-50 text-newsletter-blue hover:text-newsletter-blue"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextDay}
              disabled={!hasNext}
              className="border-gray-300 hover:bg-gray-50 text-newsletter-blue hover:text-newsletter-blue"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
