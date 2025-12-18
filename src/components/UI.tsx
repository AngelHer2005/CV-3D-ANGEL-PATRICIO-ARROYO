import { useEffect, useState, useRef } from 'react';
import { Play, Eye, Download, Loader2, Settings, X, User, GraduationCap, Star, Award, ChevronRight, CornerDownLeft, ArrowUp } from 'lucide-react';
import { cvData } from '../data';

// --- PANTALLA INICIO ---
export const StartScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer group" onClick={onStart}>
     <div className="relative">
         <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
         <Play size={80} className="relative text-white/90 drop-shadow-[0_0_15px_rgba(255,100,0,0.8)] group-hover:scale-110 transition-transform duration-300" />
     </div>
     <h1 className="mt-8 text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-600 tracking-tighter drop-shadow-sm">ANGEL PATRICIO ARROYO</h1>
     <p className="mt-4 text-orange-200/50 font-mono text-xs tracking-[0.5em] uppercase animate-pulse border-b border-white/10 pb-1">Click para iniciar</p>
  </div>
);

// --- BOTONES FLOTANTES ---
export const FloatingButtons = ({ show, onView, onDownload, isGenerating }: any) => (
  <div className={`absolute top-1/2 -translate-y-1/2 w-full px-12 z-40 flex justify-between pointer-events-none transition-all duration-500 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-4'}`}>
      <div className="flex flex-col items-start gap-3 pointer-events-auto">
        <div className="bg-white/90 backdrop-blur text-black font-bold px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-bounce ml-6 text-xs tracking-wider">TECLA [V]</div>
        <button onClick={onView} className="group bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all hover:scale-105">
           <Eye className="w-8 h-8 text-cyan-400 group-hover:text-white mb-2 mx-auto transition-colors" />
           <span className="text-cyan-100/80 font-bold uppercase text-xs tracking-widest group-hover:text-white">Visualizar</span>
        </button>
      </div>
      <div className="flex flex-col items-end gap-3 pointer-events-auto">
        <div className="bg-white/90 backdrop-blur text-black font-bold px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-bounce mr-6 text-xs tracking-wider">TECLA [C]</div>
        <button onClick={onDownload} disabled={isGenerating} className="group bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/80 shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all hover:scale-105">
           {isGenerating ? <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto mb-2"/> : <Download className="w-8 h-8 text-orange-400 group-hover:text-white mx-auto mb-2 transition-colors" />}
           <span className="text-orange-100/80 font-bold uppercase text-xs tracking-widest group-hover:text-white">{isGenerating ? "..." : "Descargar"}</span>
        </button>
      </div>
  </div>
);

// --- MENÚ AJUSTES ---
export const SettingsMenu = ({ settings, onClose, selectedIndex }: any) => {
    const SettingItem = ({ label, value, max, current, selected }: any) => (
        <div className={`p-4 rounded border transition-all duration-200 ${selected ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(255,100,0,0.2)] transform scale-[1.02]' : 'bg-transparent border-white/5 opacity-70'}`}>
            <div className="flex justify-between text-xs text-slate-300 mb-2 font-mono uppercase">
                <span className="flex items-center gap-2">{selected && <ChevronRight size={12} className="text-orange-500"/>} {label}</span> 
                <span className="text-white font-bold">{value}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400" style={{width: `${(current/max)*100}%`}}></div>
            </div>
        </div>
    );

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95">
         <div className="bg-black border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(255,100,0,0.1)] relative">
             <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                 <h2 className="text-xl font-bold text-white flex items-center gap-3 tracking-wide"><Settings className="text-orange-500"/> SISTEMA</h2>
                 <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white"><X /></button>
             </div>
             <div className="space-y-4">
                 <SettingItem label="Sensibilidad" value={settings.sensitivity.toFixed(1)} max={2} current={settings.sensitivity} selected={selectedIndex === 0} />
                 <SettingItem label="Velocidad" value={settings.speed} max={30} current={settings.speed} selected={selectedIndex === 1} />
                 
                 <button onClick={onClose} className={`w-full mt-6 py-4 font-bold rounded text-xs uppercase tracking-widest transition-all ${selectedIndex === 2 ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'bg-white/5 text-white/50'}`}>
                     {selectedIndex === 2 && '► '} Guardar Configuración
                 </button>
             </div>
             <div className="mt-8 flex justify-center gap-6 text-[10px] text-white/20 font-mono uppercase border-t border-white/5 pt-4">
                 <span className="flex items-center gap-1"><ArrowUp size={10}/> Navegar</span> 
                 <span className="flex items-center gap-1">← → Ajustar</span> 
                 <span className="flex items-center gap-1"><CornerDownLeft size={10}/> Confirmar</span>
             </div>
         </div>
      </div>
    );
};

// --- PANEL INTERACTIVO (CORREGIDO) ---
export const InfoPanel = ({ section, onClose }: { section: string, onClose: () => void }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  
  const data = cvData as any;
  
  let items: any[] = [];
  let title = "";
  let icon = null;
  let color = "yellow"; // Default

  if (section === 'education') {
      items = data.education; title = "Formación"; icon = <GraduationCap size={28}/>; color = "red";
  } else if (section === 'hardSkills') {
      items = data.hardSkills; title = "Skills Técnicas"; icon = <Star size={28}/>; color = "yellow";
  } else if (section === 'certifications') {
      items = data.certifications; title = "Certificaciones"; icon = <Award size={28}/>; color = "purple";
  } else if (section === 'profile') {
      title = "Perfil Profesional"; icon = <User size={28}/>; color = "emerald";
  }

  // --- ARREGLO VISUAL: CLASES EXPLICITAS ---
  // Tailwind necesita ver la clase completa para generarla.
  const getColorClasses = (c: string) => {
      switch(c) {
          case 'yellow': return { 
              border: 'border-yellow-500/50', 
              bg: 'bg-yellow-500/20', 
              text: 'text-yellow-400',
              bar: 'bg-yellow-500',
              shadow: 'shadow-yellow-500/50'
          };
          case 'red': return { 
              border: 'border-red-500/50', 
              bg: 'bg-red-500/20', 
              text: 'text-red-400',
              bar: 'bg-red-500',
              shadow: 'shadow-red-500/50'
          };
          case 'purple': return { 
              border: 'border-purple-500/50', 
              bg: 'bg-purple-500/20', 
              text: 'text-purple-400',
              bar: 'bg-purple-500',
              shadow: 'shadow-purple-500/50'
          };
          case 'emerald': return { 
              border: 'border-emerald-500/50', 
              bg: 'bg-emerald-500/20', 
              text: 'text-emerald-400',
              bar: 'bg-emerald-500',
              shadow: 'shadow-emerald-500/50'
          };
          default: return { 
              border: 'border-white/50', 
              bg: 'bg-white/20', 
              text: 'text-white',
              bar: 'bg-white',
              shadow: 'shadow-white/50'
          };
      }
  };

  const theme = getColorClasses(color);

  useEffect(() => {
    if (listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
        if (selectedElement) {
            selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
  }, [selectedIndex]);

  useEffect(() => {
      const handlePanelKey = (e: KeyboardEvent) => {
          if (section === 'profile') return;

          const key = e.key.toLowerCase();
          
          if (key === 'arrowdown') {
              setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
          }
          if (key === 'arrowup') {
              setSelectedIndex(prev => Math.max(prev - 1, 0));
          }
          if (key === 'enter') {
              setShowDetail(true);
          }
          // CORRECCIÓN: Usamos Backspace para volver, eliminamos Escape
          if (key === 'backspace') {
              if (showDetail) setShowDetail(false);
              else onClose();
          }
      };

      window.addEventListener('keydown', handlePanelKey);
      return () => window.removeEventListener('keydown', handlePanelKey);
  }, [selectedIndex, showDetail, items.length, section, onClose]);

  if (section === 'profile') {
      return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0a0a0a] border border-emerald-500/30 p-8 rounded-2xl w-full max-w-2xl shadow-[0_0_60px_rgba(16,185,129,0.1)] relative">
                <div className="flex items-center gap-4 mb-6 border-b border-emerald-900/50 pb-4">
                    <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-xl">{icon}</div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed font-light">{data.profile}</p>
                <div className="mt-8 flex justify-end">
                    <button onClick={onClose} className="text-xs text-emerald-500/50 hover:text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-2">
                        Cerrar [X]
                    </button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className={`relative bg-[#080808] w-full max-w-4xl h-[70vh] flex rounded-2xl border border-white/10 shadow-2xl overflow-hidden`}>
        
        {/* LADO IZQUIERDO: LISTA */}
        <div className={`w-1/2 flex flex-col border-r border-white/5 bg-black/20 transition-all duration-300 ${showDetail ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}>
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex items-center gap-3">
                    <div className={theme.text}>{icon}</div>
                    <h2 className="text-xl font-bold text-white tracking-wide uppercase">{title}</h2>
                </div>
            </div>
            
            <div ref={listRef} className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {items.map((item: any, i: number) => (
                    <div 
                        key={i}
                        onClick={() => { setSelectedIndex(i); setShowDetail(true); }}
                        className={`
                            p-4 rounded-lg cursor-pointer transition-all duration-200 border
                            ${selectedIndex === i 
                                ? `${theme.bg} ${theme.border} translate-x-2` 
                                : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400'
                            }
                        `}
                    >
                        <div className="flex justify-between items-center">
                            <span className={`font-bold ${selectedIndex === i ? 'text-white' : 'text-inherit'}`}>
                                {item.title || item.label}
                            </span>
                            {item.percent && (
                                <span className={`text-xs font-mono ${selectedIndex === i ? theme.text : 'text-slate-600'}`}>
                                    {item.percent}%
                                </span>
                            )}
                        </div>
                        {(item.institution || item.issuer) && (
                            <p className="text-xs opacity-60 mt-1 truncate">{item.institution || item.issuer}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 text-[10px] text-white/20 font-mono uppercase text-center flex justify-center gap-4">
               <span>↑ ↓ Navegar</span>
               <span>Enter Detalles</span>
               <span>Backspace Salir</span>
            </div>
        </div>

        {/* LADO DERECHO: DETALLES */}
        <div className="w-1/2 relative bg-grid-pattern">
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent`}></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center transition-all duration-300">
                {showDetail ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full">
                        <div className={`w-16 h-16 rounded-2xl ${theme.bg} flex items-center justify-center ${theme.text} mb-6 mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                            {icon}
                        </div>
                        
                        <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                            {items[selectedIndex].title || items[selectedIndex].label}
                        </h3>
                        
                        <p className={`${theme.text} font-mono text-xs uppercase tracking-widest mb-6`}>
                            {items[selectedIndex].institution || items[selectedIndex].issuer || "Habilidad Técnica"}
                            {items[selectedIndex].date && ` • ${items[selectedIndex].date}`}
                            {items[selectedIndex].year && ` • ${items[selectedIndex].year}`}
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-slate-300 leading-relaxed text-sm w-full">
                            {items[selectedIndex].description || "Descripción detallada no disponible."}
                        </div>

                        {/* ARREGLO VISUAL: Barra de progreso */}
                        {items[selectedIndex].percent && (
                            <div className="mt-6 w-full px-4">
                                <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono uppercase">
                                    <span>Nivel de Dominio</span>
                                    <span>{items[selectedIndex].percent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${theme.bar} shadow-[0_0_10px_currentColor] transition-all duration-1000`} 
                                        style={{width: `${items[selectedIndex].percent}%`}}
                                    ></div>
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-12 text-white/20 text-[10px] font-mono animate-pulse">
                            Use Flechas para cambiar • Backspace para volver
                        </div>
                    </div>
                ) : (
                    <div className="text-white/30 flex flex-col items-center">
                        <CornerDownLeft size={48} className="mb-4 opacity-50"/>
                        <p className="text-sm font-mono uppercase tracking-widest">Selecciona un ítem</p>
                        <p className="text-xs mt-2 opacity-50">Presiona ENTER para ver detalles</p>
                    </div>
                )}
            </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full text-white/30 hover:text-white transition-colors z-50">
            <X size={20} />
        </button>

      </div>
    </div>
  );
};