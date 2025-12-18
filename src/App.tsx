import { useState, useEffect, useCallback } from 'react';
import { Scene } from './world/Scene';
import { Settings } from 'lucide-react';
// Elimina: import { PdfHidden } from './components/PdfHidden';
import { VisorCV } from './components/VisorCV';
import { StartScreen, FloatingButtons, SettingsMenu, InfoPanel } from './components/UI';
import { usePdfGenerator } from './hooks/usePdfGenerator';
import { cvData } from './data';

function App() {
  // ... (estados igual que antes) ...
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isNearMonolith, setIsNearMonolith] = useState(false);
  const [isViewingCv, setIsViewingCv] = useState(false);
  
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({ sensitivity: 0.8, speed: 18 });
  const [settingsIndex, setSettingsIndex] = useState(0);

  // CORRECCIÓN: Ya no pasamos ref al hook
  const { generatePdf, isGenerating } = usePdfGenerator();

  // ... (resto de handlers lockPointer, handleCloseAll igual que antes) ...
  const lockPointer = useCallback(() => {
    setIsLocked(true);
    const element = document.body;
    // @ts-ignore
    const requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    if (requestPointerLock) requestPointerLock.call(element);
  }, []);

  const handleCloseAll = useCallback(() => {
    setActiveSection(null);
    setIsViewingCv(false);
    setShowSettings(false);
    lockPointer();
  }, [lockPointer]);

  // --- DESCARGA ---
  const triggerDownload = useCallback(async () => {
    if (isGenerating) return;
    // Generar PDF
    await generatePdf(`CV_${cvData.personalInfo.name.replace(/\s+/g, '_')}.pdf`);
    // Recuperar puntero si seguimos en el juego
    if (!activeSection && !isViewingCv && !showSettings) {
        lockPointer();
    }
  }, [isGenerating, generatePdf, lockPointer, activeSection, isViewingCv, showSettings]);

  // ... (useEffect de teclado igual que antes) ...
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        // ... lógica de settings igual ...
        if (showSettings) {
             // ... copiar lógica de settings anterior ...
            if (key === 'arrowdown') setSettingsIndex(prev => Math.min(prev + 1, 2));
            if (key === 'arrowup') setSettingsIndex(prev => Math.max(prev - 1, 0));
            if (key === 'arrowleft' || key === 'arrowright') {
                const dir = key === 'arrowright' ? 1 : -1;
                if (settingsIndex === 0) setSettings(s => ({ ...s, sensitivity: Math.max(0.1, Math.min(2.0, parseFloat((s.sensitivity + 0.1 * dir).toFixed(1)))) }));
                if (settingsIndex === 1) setSettings(s => ({ ...s, speed: Math.max(5, Math.min(30, s.speed + 1 * dir)) }));
            }
            if (['enter', 'o', 'x'].includes(key)) handleCloseAll();
            return;
        }

        if (key === 'o' && !activeSection && !isViewingCv) {
            setShowSettings(true); setIsLocked(false); document.exitPointerLock(); setSettingsIndex(0);
        }
        if ((key === 'x' || key === 'backspace') && (activeSection || isViewingCv)) handleCloseAll();
        
        if (isNearMonolith && !activeSection && !isViewingCv && !showSettings) {
            if (key === 'c') triggerDownload();
            if (key === 'v') { setIsViewingCv(true); setIsLocked(false); document.exitPointerLock(); }
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isNearMonolith, isViewingCv, showSettings, handleCloseAll, settingsIndex, settings, triggerDownload]);

  const handleOpenSection = (section: string) => { setActiveSection(section); setIsLocked(false); document.exitPointerLock(); };
  const handleStart = () => lockPointer();

  return (
    <div className="w-full h-screen bg-[#0a0500] relative font-sans overflow-hidden select-none">
      
      {/* ELIMINADO: <PdfHidden ref={pdfContentRef} /> ya no es necesario */}

      <div className="absolute inset-0">
          <Scene onOpenSection={handleOpenSection} isLocked={isLocked} setNearMonolith={setIsNearMonolith} settings={settings} />
      </div>

      <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
          <button onClick={() => { setShowSettings(true); setIsLocked(false); document.exitPointerLock(); setSettingsIndex(0); }} className="p-3 bg-black/60 hover:bg-orange-900/40 border border-white/10 hover:border-orange-500 rounded-full text-white/70 hover:text-orange-400 transition-all backdrop-blur-md">
             <Settings size={20} />
          </button>
          <div className="bg-black/40 border border-white/5 px-2 py-1 rounded text-[10px] text-white/40 font-mono hidden md:block backdrop-blur-sm">[O] AJUSTES</div>
      </div>

      {!isLocked && !activeSection && !isGenerating && !isViewingCv && !showSettings && (
        <StartScreen onStart={handleStart} />
      )}

      {isLocked && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full pointer-events-none z-10 shadow-[0_0_8px_white]" />}

      <FloatingButtons 
        show={isNearMonolith && !activeSection && !isViewingCv && !showSettings} 
        onView={() => { setIsViewingCv(true); setIsLocked(false); document.exitPointerLock(); }}
        onDownload={triggerDownload}
        isGenerating={isGenerating}
      />

      {showSettings && <SettingsMenu settings={settings} setSettings={setSettings} onClose={handleCloseAll} selectedIndex={settingsIndex} />}
      {isViewingCv && <VisorCV onClose={handleCloseAll} />}
      {activeSection && <InfoPanel section={activeSection} onClose={handleCloseAll} />}

    </div>
  );
}

export default App;