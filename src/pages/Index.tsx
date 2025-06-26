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

      <footer className="bg-white border-t border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-blue-600">
          <div className="w-full md:w-1/3 text-left mb-1 md:mb-0">
          Software desarrollado por Nundu Desarrollo de Software S.L
          </div>
          <div className="w-full md:w-1/3 text-center mb-1 md:mb-0">
            <a href="https://nundusoft.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              https://nundusoft.com
            </a>
          </div>
          <div className="w-full md:w-1/3 text-right">
            <span className="text-blue-600">Todos los derechos reservados 2025 ©</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
