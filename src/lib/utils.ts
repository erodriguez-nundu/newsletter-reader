import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface NoticiaItem {
  empresa: string;
  title: string;
  link: string;
  [key: string]: unknown;
}

export interface GenerarMarkdownResult {
  texto: string;
  archivo: string;
  grupo: number;
}

export function generarMarkdownNoticias(items: NoticiaItem[]): GenerarMarkdownResult {
  const agrupadas: Record<string, { title: string; link: string }[]> = {};
  const grupo = Number(items[0]?.grupo) || 1;

  // Fecha en español
  const hoy = new Date();
  const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = hoy.toLocaleDateString('es-ES', opciones);

  // Nombre del archivo tipo: noticias-26-junio-2025.md
  const dia = hoy.getDate().toString().padStart(2, '0');
  const mes = hoy.toLocaleDateString('es-ES', { month: 'long' }).toLowerCase();
  const año = hoy.getFullYear();
  const nombreArchivo = `noticias-${dia}-${mes}-${año}.md`;

  // Agrupar noticias por empresa
  for (const item of items) {
    const { empresa, title, link } = item;
    if (!empresa || !title || !link) continue;
    if (!agrupadas[empresa]) agrupadas[empresa] = [];
    agrupadas[empresa].push({ title, link });
  }

  // Construcción del Markdown EXACTAMENTE como el ejemplo
  let markdown = `# 📰 Informe Diario de Noticias\n\n${fechaFormateada}\n\n---\n`;

  for (const empresa in agrupadas) {
    const noticiasEmpresa = agrupadas[empresa].slice(0, 3);

    markdown += `\n## 🔹 ${empresa}\n`;

    noticiasEmpresa.forEach((noticia, index) => {
      markdown += `\n**${index + 1}) [${noticia.title}](${noticia.link})**\n`;
    });
  }

  markdown += `\n---\n`;
  markdown += `_Informe generado automáticamente por el sistema de seguimiento de noticias de **Nundu Desarrollos**._`;

  return {
    texto: markdown,
    archivo: nombreArchivo,
    grupo
  };
}
