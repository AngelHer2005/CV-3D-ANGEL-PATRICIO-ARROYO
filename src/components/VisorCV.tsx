// src/components/VisorCV.tsx
import { useState, useRef } from 'react';
import { MousePointer2, Minus, Plus } from 'lucide-react';

interface VisorCVProps {
  onClose: () => void;
}

export const VisorCV = ({ onClose }: VisorCVProps) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPan = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    const delta = -Math.sign(e.deltaY) * 0.1;
    setZoom(z => Math.min(Math.max(0.5, z + delta), 4));
  };

  const handleMouseDown = (e: React.MouseEvent) => { 
    e.preventDefault(); 
    isDragging.current = true; 
    startPan.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }; 
  };
  
  const handleMouseMove = (e: React.MouseEvent) => { 
    if (!isDragging.current) return; 
    setPan({ x: e.clientX - startPan.current.x, y: e.clientY - startPan.current.y }); 
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 overflow-hidden" 
         onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} 
         onMouseUp={() => isDragging.current = false} onMouseLeave={() => isDragging.current = false}
         onContextMenu={(e) => e.preventDefault()}>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-xl">
            <div className="text-white/70 text-[10px] font-mono flex items-center gap-6 uppercase tracking-wider">
                <span className="flex items-center gap-1 text-cyan-400"><MousePointer2 size={10}/> Arrastrar</span>
                <span className="flex items-center gap-1 text-orange-400"><Minus size={10}/> Zoom <Plus size={10}/></span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <button onClick={onClose} className="text-white hover:text-red-400 font-bold px-2 text-xs">CERRAR [X]</button>
        </div>
        <div className="w-full h-full flex items-center justify-center cursor-move">
            <img src="/CV-image.jpg" alt="CV Full" className="max-w-none shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-75 ease-out" 
                 style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, height: '80vh', pointerEvents: 'none' }} draggable={false} />
        </div>
    </div>
  );
};