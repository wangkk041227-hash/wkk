import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Sparkles } from 'lucide-react';
import { GUSU_HOTSPOTS, Hotspot } from '../data';

interface InteractivePaintingProps {
  onHotspotClick: (hotspot: Hotspot) => void;
}

export default function InteractivePainting({ onHotspotClick }: InteractivePaintingProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  // Background Image URLs (Using the uploaded historical images)
  const SCENE_IMAGES = [
    "/微信图片_20260513234838_1362_132.jpg",
    "/微信图片_20260513234840_1363_132.jpg",
    "/微信图片_20260513234841_1364_132.jpg"
  ];

  // Highly authentic historical segments
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const totalScrollWidth = scrollWidth - clientWidth;
    const currentProgress = totalScrollWidth > 0 ? (scrollLeft / totalScrollWidth) * 100 : 0;
    setProgress(currentProgress);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full h-screen bg-paper overflow-hidden">
      {/* Dynamic Background Parallax Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {SCENE_IMAGES.map((img, i) => {
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ 
                opacity: (progress > (i * 30) - 15 && progress < (i * 33) + 40) ? 1 : 0,
                scale: 1 + (progress * 0.0005) 
              }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
              style={{ 
                display: progress > (i * 30) - 20 && progress < (i * 33) + 50 ? 'block' : 'none',
                zIndex: i 
              }}
            >
              <img 
                src={img} 
                alt={`Scene ${i}`} 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-transparent to-paper/30" />
            </motion.div>
          );
        })}
      </div>

      {/* Silk Glow Texture */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />

      {/* 1. Flying Guide (Bird Equivalent) */}
      <motion.div 
        style={{ 
          left: `${15 + (progress * 0.7)}%`, 
          top: `${45 + Math.sin(progress * 0.1) * 10}%`, 
        }}
        className="fixed z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: isDragging ? 10 : 0,
            scale: isDragging ? 1.2 : 1
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.3 }
          }}
          className="relative"
        >
          <div className="w-6 h-6 rounded-full bg-accent shadow-[0_0_40px_rgba(139,44,44,0.9)] border-2 border-paper/80 flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-paper" />
          </div>
          <motion.div 
            animate={{ scale: [1, 3], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-accent/40"
          />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="font-serif text-[10px] tracking-[0.4em] text-accent font-bold px-3 py-1 bg-paper/60 backdrop-blur-md border border-accent/10 rounded-full shadow-sm">
              {progress < 30 ? "山江启程" : progress < 70 ? "市井巡游" : "归园访古"}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Trailing Thread Line (At Bottom) */}
      <div className="absolute bottom-16 left-12 right-12 z-40 bg-paper/20 backdrop-blur-sm p-4 rounded-sm border border-ink/5">
        <div className="relative h-px bg-ink/10 w-full mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_10px_rgba(139,44,44,0.5)]"
            style={{ width: `${progress}%` }} 
          />
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-lg border-2 border-paper"
            style={{ left: `${progress}%` }}
          />

          {/* Node Markers */}
          {GUSU_HOTSPOTS.map((node, i) => (
            <div 
              key={node.id} 
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%` }}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${progress >= node.x ? 'bg-accent scale-125' : 'bg-ink/20 scale-100'}`} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 -rotate-45 origin-left">
                <span className={`text-[9px] font-serif tracking-widest whitespace-nowrap transition-colors ${progress >= node.x ? 'text-accent font-bold' : 'text-ink/30'}`}>
                  {node.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center px-2">
           <span className="font-serif text-[10px] text-accent tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={10} /> 画卷漫游 · 丝线引路
           </span>
           <span className="font-serif text-[10px] text-ink/30 tracking-[0.2em]">苏州丝绸文化数字档案 · 繁华图</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`relative z-10 w-full h-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing no-scrollbar scroll-smooth mask-edge-fade grayscale-[0.3] hover:grayscale-0 transition-all duration-1000`}
      >
        <div className="relative h-full flex" style={{ width: '800vw' }}>
          <div className="absolute inset-0 z-20 pointer-events-none">
             {GUSU_HOTSPOTS.map((hotspot, index) => {
                const isSpecial = index === 0;
                return (
                  <motion.button
                    key={hotspot.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.25 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onHotspotClick(hotspot);
                    }}
                    style={{ 
                      left: `${hotspot.x}%`, 
                      top: `${hotspot.y}%` 
                    }}
                    className={`absolute pointer-events-auto group ${isSpecial ? 'z-30' : ''}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.div 
                        animate={{ 
                          scale: isSpecial ? [1, 2.5, 1] : [1, 2, 1], 
                          opacity: isSpecial ? [0.4, 0.8, 0.4] : [0.3, 0.6, 0.3] 
                        }}
                        transition={{ repeat: Infinity, duration: isSpecial ? 2 : 3 }}
                        className={`absolute rounded-full border border-accent/40 bg-accent/5 backdrop-blur-[1px] ${isSpecial ? 'w-16 h-16' : 'w-12 h-12'}`}
                      />
                      <div className={`rounded-full bg-accent text-paper flex items-center justify-center shadow-xl ring-4 ring-paper/30 ${isSpecial ? 'w-7 h-7' : 'w-5 h-5'}`}>
                        <Plus size={isSpecial ? 16 : 12} />
                      </div>
                      <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="bg-ink text-paper px-4 py-2 text-[11px] font-serif tracking-[0.2em] whitespace-nowrap rounded-sm shadow-2xl">
                          {isSpecial ? "开启艺术专题 · " : ""}{hotspot.title}
                        </div>
                        <div className="w-px h-4 bg-accent mx-auto" />
                      </div>
                      
                      {isSpecial && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute -top-12 whitespace-nowrap"
                        >
                           <span className="font-serif text-[10px] tracking-[0.3em] text-accent animate-pulse">FEATURE SPECIAL</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-30 pointer-events-none mix-blend-multiply" />
        </div>
      </div>

      <motion.div 
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <p className="font-serif text-[10px] tracking-[0.3em] uppercase opacity-30">
          Scroll or Drag to Flourish · 左右滑动 开启繁华
        </p>
      </motion.div>
    </div>
  );
}
