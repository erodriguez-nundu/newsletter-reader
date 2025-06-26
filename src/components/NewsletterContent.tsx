
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

  // Simulated markdown content for demo purposes
  // In a real implementation, this would fetch from actual .md files
  const getMockContent = (date: string) => {
    const mockContent = `# Resumen Financiero Diario
*${new Date(date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}*

## Mercados Principales

### Renta Variable
Los índices europeos han mostrado una **tendencia alcista** durante la sesión de hoy, con el IBEX 35 cerrando con una ganancia del **0.8%**. Los sectores que mejor comportamiento han tenido son:

- **Tecnología**: +1.2%
- **Servicios Financieros**: +0.9%
- **Energía**: +0.7%

### Renta Fija
El mercado de bonos presenta una jornada de **consolidación**, con el bono alemán a 10 años manteniéndose estable en el **2.65%**.

> "La estabilidad en los mercados de deuda refleja las expectativas moderadas sobre futuras decisiones de política monetaria" - Analista Senior

## Noticias Destacadas

### Sector Bancario
El sector bancario europeo ha mostrado fortaleza tras los últimos resultados trimestrales publicados. **Santander** y **BBVA** lideran las ganancias del día.

### Materias Primas
- **Petróleo Brent**: $85.20 (+0.5%)
- **Oro**: $1,945 (-0.2%)
- **Cobre**: $8,150 (+0.8%)

## Perspectivas

Para la próxima sesión esperamos:
1. Continuidad en la tendencia alcista
2. Atención a los datos de inflación
3. Seguimiento de las decisiones del BCE

---

*Este boletín es una simulación para demostración. En un entorno real, el contenido se cargaría desde archivos .md ubicados en la carpeta del sistema.*`;

    return mockContent;
  };

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, this would be:
        // const response = await fetch(`/noticias/noticias-${date}.md`);
        // const markdownContent = await response.text();
        
        const mockContent = getMockContent(date);
        setContent(mockContent);
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
    // In production, you'd use a proper markdown parser like marked or remark
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
