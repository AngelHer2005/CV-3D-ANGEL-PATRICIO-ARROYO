// src/hooks/usePdfGenerator.ts
import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import CVPdfDocument from '../components/CVPdfDocument';

// Ya no necesitamos argumentos, el componente tiene los datos
export const usePdfGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = useCallback(async (fileName: string) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      // 1. Generamos el BLOB del PDF usando el componente
      const blob = await pdf(<CVPdfDocument /> as any).toBlob();
      
      // 2. Creamos una URL para descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // 3. Forzamos la descarga
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generando PDF nativo:", error);
      alert("Hubo un error al generar el PDF.");
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  return { generatePdf, isGenerating };
};