import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, ChevronRight, Layers } from 'lucide-react';

interface EmbroideryRevealProps {
  onContinue: () => void;
}

export default function EmbroideryReveal({ onContinue }: EmbroideryRevealProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);

  const handleUnfold = () => {
    setIsUnfolded(true);
    // Hide initial dialogue after unfolding and maybe show next one later
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Texture & Color */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a] mix-blend-multiply opacity-50" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-[5]" />

      {/* The Unfinished Painting Background (Revealed) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isUnfolded ? 0.4 : 0,
          scale: isUnfolded ? 1 : 1.1
        }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-[url('/微信图片_20260513234838_1362_132.jpg')] bg-cover bg-center grayscale brightness-[0.4] contrast-125"
      />

      {/* Dramatic Silhouette of the Old Embroideress */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="relative group"
        >
          {/* Silhouette Representation */}
          <div className="relative w-80 h-[60vh] flex items-end justify-center">
             {/* Character Silhouette - Black Shadowy Figure */}
             <div className="relative z-10 w-64 h-full bg-black mask-silhouette transition-all duration-1000">
                {/* SVG Silhouette of an elderly woman embroidering (Simplified Path) */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-black opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <path d="M50 20c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm25 60c-5-20-20-30-25-30s-20 10-25 30l-5 10h60l-5-10z" />
                </svg>
             </div>
             
             {/* Aura behind her */}
             <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] -z-10 animate-pulse" />
          </div>

          {/* Floating Threads around her */}
          {!isUnfolded && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-px h-24 bg-accent/20"
                  animate={{ 
                    y: [-40, 40],
                    opacity: [0, 0.4, 0],
                    x: [Math.sin(i) * 100, Math.sin(i) * -100]
                  }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "linear" }}
                  style={{ top: '30%', left: '50%' }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Narrative Interaction Overlay */}
        <div className="absolute bottom-12 w-full max-w-4xl px-8 flex flex-col items-center z-20">
          
          {/* Dialogue Box (Song Painted Style) */}
          <AnimatePresence>
            {!isUnfolded && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-[#111] border border-white/10 p-8 relative shadow-2xl"
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-px bg-accent/40" />
                <div className="absolute top-0 left-0 h-4 w-px bg-accent/40" />
                
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                     <span className="text-[10px] font-serif tracking-[0.4em] text-accent font-bold uppercase">老绣娘</span>
                   </div>
                   <p className="font-calligraphy text-3xl md:text-4xl text-paper tracking-[0.2em] leading-relaxed">
                     “世人只知纹样，却不知纹样如何诞生。”
                   </p>
                </div>

                <div className="mt-12 flex justify-end">
                   <button 
                     onClick={handleUnfold}
                     className="group flex items-center gap-4 bg-accent/10 border border-accent/30 px-8 py-3 hover:bg-accent hover:text-paper transition-all duration-500 rounded-sm"
                   >
                     <span className="font-serif text-xs tracking-widest text-accent group-hover:text-paper uppercase">轻轻展开残卷 / Unfold Scroll</span>
                     <Layers className="text-accent group-hover:text-paper" size={14} />
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post-Unfold Content */}
          <AnimatePresence>
            {isUnfolded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="text-center space-y-10"
              >
                <div className="space-y-4">
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="font-serif text-[#999] text-sm tracking-[0.3em] uppercase italic"
                  >
                    这是尚未完成的...
                  </motion.p>
                  <motion.h2 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="font-calligraphy text-6xl md:text-8xl text-paper tracking-[0.3em] shadow-accent/20 drop-shadow-2xl"
                  >
                    《姑苏繁华图》
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                >
                  <button
                    onClick={onContinue}
                    className="group flex flex-col items-center gap-4"
                  >
                    <div className="px-12 py-4 border border-paper/10 bg-paper/5 hover:bg-accent hover:border-accent transition-all duration-700 flex items-center gap-4 group">
                      <span className="font-serif text-paper text-xs tracking-widest uppercase">承接遗命，步入繁华 / ENTER THE SCROLL</span>
                      <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-serif tracking-[0.4em] text-paper/30 uppercase">
                       <MousePointer2 size={10} />
                       <span>Click to proceed</span>
                    </div>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cinematic Borders */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      
      {/* Scroll Texture Overlay */}
      <motion.div 
        animate={{ 
          opacity: isUnfolded ? 0.1 : 0,
        }}
        className="absolute inset-0 z-[1] bg-[url('https://www.transparenttextures.com/patterns/silk.png')] pointer-events-none"
      />
    </motion.div>
  );
}
