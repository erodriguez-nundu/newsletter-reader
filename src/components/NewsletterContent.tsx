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
        console.log('Contenido markdown cargado:', markdownContent);
        setContent(markdownContent);
      } catch (err) {
        setError('No se pudo cargar el contenido para esta fecha.');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [date]);

  // Función para convertir el markdown generado a HTML real
  const renderMarkdown = (markdown: string) => {
    return markdown
      // Títulos
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-newsletter-blue mt-6 mb-2">$1</h2>')
      // Separador
      .replace(/^---$/gm, '<hr class="my-6 border-newsletter-blue" />')
      // Enlaces con negrita y numeración
      .replace(/\*\*(\d+)\) \[([^\]]+)\]\(([^)]+)\)\*\*/g, '<strong>$1) <a href="$3" class="text-newsletter-blue hover:underline" target="_blank">$2</a></strong>')
      // Negritas
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Texto en párrafos (líneas sueltas que no son títulos, separadores ni enlaces)
      .replace(/^(?!<h|<hr|<strong|<a|\s*$)(.+)$/gm, '<p>$1</p>')
      // Reemplazar saltos de línea múltiples por uno solo
      .replace(/\n{2,}/g, '\n')
      // Reemplazar saltos de línea restantes por <br />
      .replace(/\n/g, '<br />')
      // Eliminar <br /> duplicados
      .replace(/(<br \/>\s*){2,}/g, '<br />')
      // Eliminar <p></p> vacíos
      .replace(/<p><\/p>/g, '');
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
      <Card className="overflow-hidden border-0">
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