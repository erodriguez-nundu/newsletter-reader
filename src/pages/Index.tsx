
import { NewsletterHeader } from '@/components/NewsletterHeader';
import { NewsletterContent } from '@/components/NewsletterContent';
import { useDateNavigation } from '@/hooks/useDateNavigation';

const Index = () => {
  const {
    currentDate,
    goToPreviousDay,
    goToNextDay,
    hasNext,
    hasPrevious
  } = useDateNavigation();

  return (
    <div className="min-h-screen bg-white">
      <NewsletterHeader
        currentDate={currentDate}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
      
      <main className="pb-16">
        <NewsletterContent date={currentDate} />
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center text-sm text-newsletter-dark-gray">
            <p>Newsletter Diario Profesional</p>
            <p className="mt-1">Diseñado para ofrecer información financiera de calidad</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
