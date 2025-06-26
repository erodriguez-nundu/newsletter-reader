import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, AlertCircle } from 'lucide-react';

interface NewsletterContentProps {
  date: string;
}

export const NewsletterContent = ({ date }: NewsletterContentProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Nuevo formato esperado: newsletter/noticias-DD-mes-YYYY.md
        // Convertir la fecha a ese formato
        const meses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const fecha = new Date(date);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = meses[fecha.getMonth()];
        const anio = fecha.getFullYear();
        const fileName = `noticias-${dia}-${mes}-${anio}.md`;
        const response = await fetch(`/newsletter/${fileName}`);
        if (!response.ok) throw new Error('No existe el archivo para esta fecha.');
        const markdownContent = await response.text();
        setContent(markdownContent);
      } catch (err) {
        setError('No se pudo cargar el contenido para esta fecha.');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [date]);

  const renderMarkdown = (markdown: string) => {
    // Simple markdown parser for demo purposes
    // En producción, usa un parser real como marked o remark
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$1. $2</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^\s*\n/gm, '')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/h><\/p>/g, 'h>')
      .replace(/<p><li>/g, '<ul><li>')
      .replace(/<\/li><\/p>/g, '</li></ul>')
      .replace(/<p><blockquote>/g, '<blockquote>')
      .replace(/<\/blockquote><\/p>/g, '</blockquote>');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-12">
        <Card className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-newsletter-blue"></div>
            <span className="text-newsletter-dark-gray">Cargando newsletter...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-12">
        <Card className="p-8">
          <div className="flex items-center space-x-3 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Error al cargar el contenido</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <Card className="overflow-hidden">
        <div className="bg-newsletter-gray px-8 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-newsletter-blue" />
            <span className="text-sm font-medium text-newsletter-blue">
              Newsletter • {new Date(date).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
        
        <div className="p-8">
          <div 
            className="newsletter-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>
      </Card>
    </div>
  );
};
