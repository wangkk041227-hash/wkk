import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, BrainCircuit, User, Layout, ArrowRight, MousePointer2, Check, Info } from 'lucide-react';
import type { Hotspot } from '../data';

interface ChapterViewProps {
  hotspot: Hotspot | null;
  onClose: () => void;
  onChoice: (choice: string) => void;
  userChoices: Record<string, string>;
}

export default function ChapterView({ hotspot, onClose, onChoice, userChoices }: ChapterViewProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'stitch' | 'choice'>('intro');
  const [tracingProgress, setTracingProgress] = useState(0);
  const [isTracing, setIsTracing] = useState(false);

  if (!hotspot) return null;

  const currentChoice = userChoices[hotspot.id];
  const isAIChosen = Object.values(userChoices).includes('AI');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 backdrop-blur-md p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#fdfcf5] flex flex-col md:flex-row overflow-hidden rounded-sm shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-ink/5 hover:bg-ink/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Left: Interactive Visualization */}
          <div className="w-full md:w-[55%] h-64 md:h-full relative overflow-hidden bg-ink/5">
             <img 
               src={hotspot.image} 
               className="w-full h-full object-cover grayscale opacity-40 blur-[4px] scale-110" 
               alt="" 
             />
             
             {/* Interaction Stage */}
             <div className="absolute inset-0 z-10">
               {activeTab === 'stitch' && (
                 <StitchInteraction 
                   hotspot={hotspot} 
                   isAIChosen={isAIChosen}
                 />
               )}
               {activeTab === 'intro' && (
                 <div className="h-full w-full flex items-center justify-center p-12">
                    <motion.div 
                      layoutId="spotlight"
                      className="w-80 h-80 rounded-full border border-accent/20 bg-paper/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden"
                    >
                       <img src={hotspot.image} className="w-full h-full object-cover grayscale-0 opacity-100" alt="" />
                       <div className="absolute inset-0 ring-1 ring-inset ring-accent/40" />
                    </motion.div>
                 </div>
               )}
             </div>

             <div className="absolute bottom-6 left-6 z-20">
                <div className="flex items-center gap-3 px-4 py-2 bg-paper/80 backdrop-blur-md border border-ink/5 rounded-full">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                   <span className="font-serif text-[10px] tracking-widest text-ink/60 uppercase">
                     {activeTab === 'intro' ? 'Digital Archeology View' : 'Microscopy Mode'}
                   </span>
                </div>
             </div>
          </div>

          {/* Right: Narrative & Content */}
          <div className="w-full md:w-[45%] h-full flex flex-col overflow-y-auto no-scrollbar border-l border-ink/5">
             <div className="p-8 lg:p-12">
                <header className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-accent font-serif text-[10px] tracking-[0.5em] uppercase">{hotspot.chapterTitle}</span>
                  </div>
                  <h2 className="font-calligraphy text-6xl text-ink mb-4">{hotspot.title}</h2>
                  <div className="h-0.5 w-16 bg-accent/30" />
                </header>

                {/* Tab Navigation */}
                <div className="flex gap-8 mb-10 border-b border-ink/5 pb-2">
                   <TabButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')}>故事</TabButton>
                   <TabButton active={activeTab === 'stitch'} onClick={() => setActiveTab('stitch')}>针法交互</TabButton>
                   {hotspot.choice && <TabButton active={activeTab === 'choice'} onClick={() => setActiveTab('choice')}>决策</TabButton>}
                </div>

                <div className="space-y-8">
                  {activeTab === 'intro' && (
                    <motion.div 
                      key="intro"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <p className="font-serif text-lg leading-loose text-ink/70 italic">
                        “{hotspot.description}”
                      </p>

                      <div className="space-y-6">
                        {hotspot.dialogue?.map((d, i) => (
                          <DialogueCard key={i} dialogue={d} />
                        ))}
                      </div>

                      <button 
                        onClick={() => setActiveTab('stitch')}
                        className="w-full py-4 border border-accent/30 hover:bg-accent hover:text-paper transition-all flex items-center justify-center gap-4 text-xs font-serif tracking-widest"
                      >
                         查看细节针法 <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'stitch' && (
                    <motion.div 
                      key="stitch"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 gap-6">
                         {hotspot.needleworkDetails?.map((nd, i) => (
                           <div key={i} className="p-6 bg-accent/5 border-l-2 border-accent rounded-sm">
                              <h4 className="font-serif font-bold text-accent text-sm mb-2">{nd.name}</h4>
                              <p className="font-serif text-xs leading-loose text-ink/60">{nd.desc}</p>
                           </div>
                         ))}
                      </div>

                      <div className="p-6 bg-blue-500/5 border-l-2 border-blue-500/30 rounded-sm">
                         <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit size={14} className="text-blue-500" />
                            <span className="text-[10px] font-bold text-blue-500 tracking-widest uppercase">Digital Transcription Info</span>
                         </div>
                         <p className="text-xs font-serif text-blue-900/60 leading-relaxed">
                            {isAIChosen 
                              ? "当前已应用 AI 算法，该区域针法由数字粒子一秒生成，效率提升 300%。" 
                              : "当前为传统手工路线，所有粒子均模拟真实刺绣走线，每一针都包含匠心。"}
                         </p>
                      </div>

                      <button 
                        onClick={() => hotspot.choice ? setActiveTab('choice') : onClose()}
                        className="w-full py-4 bg-ink text-paper hover:bg-accent transition-all flex items-center justify-center gap-4 text-xs font-serif tracking-widest"
                      >
                         {hotspot.choice ? "进入关键决断" : "继续游览画卷"} <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'choice' && hotspot.choice && (
                    <motion.div 
                      key="choice"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="p-8 bg-paper border border-accent/20 rounded-sm shadow-inner">
                         <h3 className="text-sm font-bold text-accent font-serif mb-6 leading-loose">抉择提示: {hotspot.choice.prompt}</h3>
                         <div className="flex flex-col gap-4">
                            {hotspot.choice.options.map(opt => (
                              <button 
                                key={opt.id}
                                onClick={() => {
                                  onChoice(opt.id);
                                  onClose();
                                }}
                                className={`p-4 border font-serif text-xs tracking-widest flex items-center justify-between group transition-all ${currentChoice === opt.id ? 'bg-accent text-paper border-accent' : 'bg-white border-ink/10 hover:border-accent'}`}
                              >
                                {opt.text}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${currentChoice === opt.id ? 'bg-paper text-accent border-paper' : 'border-ink/10 group-hover:border-accent group-hover:text-accent'}`}>
                                   {currentChoice === opt.id && <Check size={12} />}
                                </div>
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="p-4 flex gap-4 items-start">
                         <Info size={16} className="text-ink/20 shrink-0 mt-1" />
                         <p className="text-[10px] font-serif text-ink/30 leading-loose">
                           注意：你的选择将影响后续的互动体验及最终结局。
                         </p>
                      </div>
                    </motion.div>
                  )}
                </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative font-serif text-xs tracking-widest pb-2 transition-colors ${active ? 'text-accent font-bold' : 'text-ink/40 hover:text-ink'}`}
    >
      {children}
      {active && (
        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
      )}
    </button>
  );
}

function DialogueCard({ dialogue }: { dialogue: any, key?: any }) {
  const isEmbroideress = dialogue.role === 'embroideress';
  const isEngineer = dialogue.role === 'engineer';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-8 mb-4 border border-ink/5 bg-paper/50 backdrop-blur-sm shadow-sm group overflow-hidden`}
    >
       {/* Decorative Corner */}
       <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/20" />
       <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/20" />
       
       {/* Character Label */}
       <div className="flex items-center gap-3 mb-6">
          <div className={`w-2 h-2 rounded-full ${isEngineer ? 'bg-blue-500' : 'bg-accent'} animate-pulse`} />
          <span className={`text-[10px] font-serif font-bold tracking-[0.4em] uppercase ${isEngineer ? 'text-blue-600' : 'text-accent'}`}>
            {dialogue.role === 'engineer' ? 'AI 工程师' : dialogue.role === 'embroideress' ? '老绣娘' : dialogue.role === 'planner' ? '项目策划' : '青年学徒'}
          </span>
       </div>

       {/* Silhouette Accent for Embroideress */}
       {isEmbroideress && (
         <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none opacity-[0.03] select-none">
            <span className="font-calligraphy text-9xl leading-none">绣</span>
         </div>
       )}

       <p className={`relative z-10 font-calligraphy text-3xl md:text-4xl leading-relaxed text-ink/80 tracking-widest italic`}>
         “{dialogue.text}”
       </p>
       
       <div className="mt-6 flex justify-end opacity-20 group-hover:opacity-100 transition-opacity">
          <Sparkles size={12} className="text-accent" />
       </div>
    </motion.div>
  );
}

function StitchInteraction({ hotspot, isAIChosen }: { hotspot: Hotspot, isAIChosen: boolean }) {
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState<{x: number, y: number, isValid: boolean}[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  // Specific interaction logic based on hotspot
  const renderInteraction = () => {
    switch (hotspot.id) {
      case 'mudu': // Ping Stitch: Horizontal parallel lines on drag
        return (
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center p-12 overflow-hidden"
            onMouseDown={(e) => {
              setIsDrawing(true);
              lastPos.current = { x: e.clientX, y: e.clientY };
            }}
            onMouseMove={(e) => {
              if (!isDrawing) return;
              const rect = containerRef.current?.getBoundingClientRect();
              if (!rect) return;
              
              const x = (e.clientX - rect.left);
              const y = (e.clientY - rect.top);
              const dx = Math.abs(e.clientX - lastPos.current.x);
              const dy = Math.abs(e.clientY - lastPos.current.y);
              
              // Validation for "uniform and stable"
              const isValid = dx > 5 && dx < 30 && dy < 5;
              
              if (dx > 5) {
                setPoints(prev => [...prev, { x, y, isValid }].slice(-200));
                lastPos.current = { x: e.clientX, y: e.clientY };
                setProgress(prev => Math.min(1, prev + 0.005));
              }
            }}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/silk.png')] opacity-10" />
            
            {/* Background mirror/landscape clearing up with progress */}
            <div 
              className="absolute inset-0 grayscale opacity-20 pointer-events-none transition-all duration-1000"
              style={{ 
                filter: `blur(${10 * (1 - progress)}px) contrast(${1 + progress})`,
                opacity: 0.1 + progress * 0.4
              }}
            >
              <img src={hotspot.image} className="w-full h-full object-cover" alt="" />
            </div>

            <svg viewBox="0 0 800 400" className="w-full h-full relative z-10 cursor-crosshair">
               {points.map((p, i) => (
                 <motion.line 
                   key={i}
                   x1={p.x - 20} y1={p.y} x2={p.x + 20} y2={p.y}
                   stroke={p.isValid ? "var(--color-accent)" : "var(--color-ink)"}
                   strokeWidth={p.isValid ? "0.5" : "1"}
                   strokeOpacity={p.isValid ? 0.8 : 0.3}
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 0.2 }}
                 />
               ))}
               
               {/* Silk Luster Overlay */}
               <motion.rect 
                 width="100%" height="100%" 
                 fill="url(#silk-gradient)" 
                 animate={{ x: [-1000, 1000] }}
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                 style={{ opacity: progress * 0.2 }}
               />
               <defs>
                 <linearGradient id="silk-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
               </defs>
            </svg>
            
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
               <span className="text-[10px] font-serif tracking-[0.5em] text-accent/60 uppercase">平针修习：持稳横向拖动</span>
               <div className="w-48 h-px bg-ink/10 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-accent origin-left"
                    style={{ scaleX: progress }}
                  />
               </div>
            </div>
          </div>
        );
      case 'shihu': // Xushi Stitch: Density control landscape
        return (
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-12 cursor-ns-resize relative overflow-hidden"
            onMouseMove={(e) => {
               if (containerRef.current) {
                 const rect = containerRef.current.getBoundingClientRect();
                 const y = (e.clientY - rect.top) / rect.height;
                 setProgress(1 - y); // Higher mouse = higher density
               }
            }}
          >
            {/* Background Ink Wash - Density affects transparency and depth */}
            <div className="absolute inset-0 transition-all duration-700 bg-paper">
               <img 
                 src={hotspot.image} 
                 className="w-full h-full object-cover transition-all duration-1000"
                 style={{ 
                   filter: `blur(${5 * (1 - progress)}px) contrast(${0.5 + progress * 1.5}) grayscale(0.5)`,
                   opacity: 0.2 + progress * 0.8
                 }}
               />
               
               {/* Ink Diffusion Overlays */}
               <div 
                 className="absolute inset-0 bg-[#333] transition-opacity duration-1000"
                 style={{ opacity: Math.max(0, (progress - 0.7) * 2) }}
               />
            </div>

            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full mix-blend-multiply opacity-40">
               {[...Array(50)].map((_, i) => (
                 <motion.circle 
                   key={i}
                   cx={Math.random() * 100}
                   cy={Math.random() * 100}
                   r={0.1 + Math.random() * 0.5}
                   fill="var(--color-ink)"
                   animate={{ 
                    opacity: [0, progress, 0],
                    scale: [0.5, 1, 0.5]
                   }}
                   transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 2 }}
                 />
               ))}
            </svg>

            <div className="relative z-10 text-center space-y-4 bg-paper/30 backdrop-blur-md p-6 border border-white/20 rounded-sm">
                <p className="text-[10px] font-serif tracking-[0.5em] text-ink/60 uppercase">虚实针：上下滑动控制山水呼吸</p>
                <div className="flex items-center gap-4 justify-center">
                   <span className="text-[9px] font-serif text-ink/40">虚 (Xu)</span>
                   <div className="w-32 h-0.5 bg-ink/10 relative">
                      <motion.div 
                        className="absolute top-0 bottom-0 left-0 bg-accent"
                        style={{ width: `${progress * 100}%` }}
                      />
                   </div>
                   <span className="text-[9px] font-serif text-ink/40">实 (Shi)</span>
                </div>
            </div>
          </div>
        );
      case 'changmen': // Panjin: Golden swirl interaction
        return (
          <div 
            className="h-full w-full flex items-center justify-center relative overflow-hidden"
            onMouseMove={(e) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setPoints(prev => [...prev, { x, y, isValid: true }].slice(-100));
                setProgress(prev => Math.min(1, prev + 0.002));
              }
            }}
          >
             <div className="absolute inset-0 bg-black/80" />
             
             {/* Artifact Outline */}
             <div className="relative z-10 w-64 h-64 border border-gold/10 rounded-full flex items-center justify-center">
                <div className="text-gold/20 font-calligraphy text-8xl">尊</div>
                
                <svg className="absolute inset-0 w-full h-full">
                   {/* Double Golden Lines tracing mouse */}
                   {points.map((p, i) => (
                     <React.Fragment key={i}>
                       <motion.circle 
                         cx={p.x} cy={p.y} r="1.5"
                         fill="var(--color-gold)"
                         animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                         transition={{ duration: 1 }}
                       />
                       {i > 0 && (
                         <line 
                           x1={points[i-1].x} y1={points[i-1].y} 
                           x2={p.x} y2={p.y} 
                           stroke="var(--color-gold)" 
                           strokeWidth="0.5"
                           strokeOpacity={0.4}
                         />
                       )}
                     </React.Fragment>
                   ))}

                   {/* Spiral Glow Effects */}
                   {[...Array(5)].map((_, i) => (
                     <motion.circle 
                       key={i}
                       cx="50%" cy="50%" r={20 + i * 15}
                       fill="none" stroke="var(--color-gold)"
                       strokeWidth="0.2"
                       strokeDasharray="5 5"
                       animate={{ rotate: 360, opacity: progress * 0.3 }}
                       transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
                     />
                   ))}
                </svg>
             </div>

             <div className="absolute bottom-12 text-center z-20">
                <div className="text-gold font-serif text-[10px] tracking-[0.4em] uppercase mb-2">盘金：轨迹回旋，重塑礼器</div>
                <div className="flex gap-1">
                   {[...Array(10)].map((_, i) => (
                     <motion.div 
                        key={i}
                        className="w-2 h-2 bg-gold/20"
                        animate={{ 
                          backgroundColor: i / 10 < progress ? "var(--color-gold)" : "rgba(197,160,89,0.2)",
                          boxShadow: i / 10 < progress ? "0 0 10px var(--color-gold)" : "none"
                        }}
                     />
                   ))}
                </div>
             </div>
          </div>
        );
      case 'shantang': // Rao Stitch: Petal wrapping
        return (
          <div 
            className="h-full w-full flex flex-col items-center justify-center p-12 relative overflow-hidden"
            onMouseMove={(e) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Track if mouse is moving along a general "petal" circle
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const dist = Math.sqrt((x-centerX)**2 + (y-centerY)**2);
                const isValid = dist > 60 && dist < 120;
                
                if (isValid) {
                  setPoints(prev => [...prev, { x, y, isValid }].slice(-150));
                  setProgress(prev => Math.min(1, prev + 0.003));
                }
              }
            }}
          >
             <div className="relative w-80 h-80 flex items-center justify-center">
                {/* Petal Underlay */}
                <div 
                  className="absolute inset-0 bg-accent/5 rounded-full transition-all duration-1000"
                  style={{ scale: 0.5 + progress * 0.5, rotate: progress * 45 }}
                />
                
                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 cursor-alias">
                   {points.map((p, i) => (
                     <motion.line 
                        key={i}
                        x1={p.x} y1={p.y}
                        x2={p.x + 10} y2={p.y + (p.isValid ? 10 : 20)}
                        stroke="var(--color-accent)"
                        strokeWidth="0.8"
                        strokeOpacity={0.6}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                     />
                   ))}
                   
                   {/* Ghost Flower Outline */}
                   <path 
                     d="M200,100 C250,100 300,150 300,200 C300,250 250,300 200,300 C150,300 100,250 100,200 C100,150 150,100 200,100"
                     fill="none" stroke="var(--color-ink)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2"
                   />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-accent/20 font-calligraphy text-6xl">瓣</div>
                </div>
             </div>
             
             <p className="mt-8 text-[10px] font-serif tracking-[0.5em] text-ink/40 uppercase">绕针：按轮廓方向均匀缠绕</p>
          </div>
        );
      case 'fengqiao': // Gun Stitch: Flowing waves
        return (
          <div 
            className="h-full w-full flex flex-col items-center justify-center p-12 relative overflow-hidden"
            onMouseMove={(e) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setPoints(prev => [...prev, { x, y, isValid: true }].slice(-200));
                setProgress(prev => Math.min(1, prev + 0.005));
              }
            }}
          >
             <div className="w-full h-64 relative border-b border-ink/5 overflow-hidden">
                <svg viewBox="0 0 800 400" className="w-full h-full cursor-move">
                   {/* Flowing Path */}
                   {points.length > 1 && points.map((p, i) => {
                     if (i === 0) return null;
                     const prev = points[i-1];
                     return (
                       <React.Fragment key={i}>
                        <motion.line 
                          x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
                          stroke="var(--color-accent)"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                        />
                        <motion.line 
                          x1={prev.x} y1={prev.y + 4} x2={p.x} y2={p.y + 4}
                          stroke="var(--color-accent)"
                          strokeWidth="1"
                          strokeOpacity={0.4}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                        />
                       </React.Fragment>
                     );
                   })}
                   
                   {/* Background Wave Helpers */}
                   {[...Array(3)].map((_, i) => (
                     <motion.path 
                        key={i}
                        d={`M 0 ${150 + i*40} Q 200 ${100 + i*40}, 400 ${150 + i*40} T 800 ${150 + i*40}`}
                        fill="none" stroke="var(--color-ink)" strokeWidth="0.2" opacity="0.1"
                        animate={{ x: [-800, 0] }}
                        transition={{ repeat: Infinity, duration: 15 + i*5, ease: "linear" }}
                     />
                   ))}
                </svg>
             </div>
             
             <div className="mt-8 flex flex-col items-center gap-4">
                <p className="text-[10px] font-serif tracking-[0.5em] text-ink/40 uppercase">滚针：流畅滑动，注入流水生命</p>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${progress > 0.5 ? 'bg-accent animate-ping' : 'bg-ink/10'}`} />
                   <span className="text-[8px] font-serif tracking-widest text-ink/30 uppercase">Neural Flow Synchronized</span>
                </div>
             </div>
          </div>
        );
      case 'huqiu': // Luan Stitch: Random cross-hatched lines and surfacing landscape
        return (
          <div 
            className="h-full w-full flex flex-col items-center justify-center p-12 relative overflow-hidden bg-stone-900"
            onMouseDown={(e) => {
              setIsDrawing(true);
              lastPos.current = { x: e.clientX, y: e.clientY };
            }}
            onMouseMove={(e) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (!rect) return;
              
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // Update "hover" points for the particle density effect
              setHoverPos({ x, y });

              // If dragging, create permanent "stitches"
              if (isDrawing) {
                const count = 3 + Math.floor(Math.random() * 5);
                for (let i = 0; i < count; i++) {
                  setPoints(prev => [...prev, { x, y, isValid: true }].slice(-500));
                }
                setProgress(prev => Math.min(1, prev + 0.002));
              }
            }}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
             {/* Background Painting - Gradually Emerges */}
             <div 
               className="absolute inset-0 transition-opacity duration-1000"
               style={{ 
                 opacity: 0.1 + progress * 0.7,
                 filter: `grayscale(${0.5 - progress * 0.5}) contrast(${1.2 + progress * 0.3})`
               }}
             >
                <img src={hotspot.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-stone-950/20" />
             </div>

             <svg viewBox="0 0 800 400" className="w-full h-full relative z-10 cursor-crosshair">
                {/* Permanent Stitches */}
                {points.map((p, i) => {
                   const r1 = (Math.random() - 0.5) * 40;
                   const r2 = (Math.random() - 0.5) * 40;
                   return (
                     <motion.line 
                        key={i}
                        x1={p.x - r1} y1={p.y - r2} 
                        x2={p.x + r1} y2={p.y + r2}
                        stroke={i % 4 === 0 ? "var(--color-accent)" : i % 4 === 1 ? "#d4c8b0" : i % 4 === 2 ? "#554433" : "#887766"}
                        strokeWidth="0.3"
                        strokeOpacity={0.6}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                     />
                   );
                })}

                {/* Floating Particles (Dense near mouse) */}
                {[...Array(60)].map((_, i) => {
                   // Calculate distance-based clustering
                   const angle = Math.random() * Math.PI * 2;
                   const dist = Math.random() * (20 + (1 - progress) * 100);
                   const px = hoverPos.x + Math.cos(angle) * dist;
                   const py = hoverPos.y + Math.sin(angle) * dist;
                   
                   return (
                     <motion.circle 
                       key={`p-${i}`}
                       cx={px} cy={py} r={Math.random() * 1.5}
                       fill={i % 2 === 0 ? "var(--color-accent)" : "white"}
                       opacity={0.3}
                       animate={{ 
                         x: [0, (Math.random() - 0.5) * 20],
                         y: [0, (Math.random() - 0.5) * 20],
                         opacity: [0.3, 0.6, 0.3]
                       }}
                       transition={{ repeat: Infinity, duration: 2 + Math.random() * 2 }}
                     />
                   );
                })}
             </svg>
             
             <div className="absolute bottom-12 text-center z-20 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] font-serif tracking-[0.6em] text-paper/80 uppercase">乱针：自由造物，山林自现</p>
                  <div className="flex gap-4 justify-center">
                    {["乱而有序", "气韵生动", "浑厚苍茫"].map((txt, i) => (
                      <span key={i} className="text-[9px] font-serif text-accent tracking-widest opacity-50">{txt}</span>
                    ))}
                  </div>
                </motion.div>
             </div>

             {/* Landscape Tip */}
             <AnimatePresence>
                {progress > 0.8 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 right-12 p-4 border border-accent/20 bg-black/40 backdrop-blur-md text-paper/60 text-[9px] font-serif tracking-widest uppercase"
                  >
                    山林已现 · 至简则灵
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        );
      default:
        return (
          <div className="relative z-20 flex flex-wrap justify-center gap-12 max-w-lg">
            {hotspot.needleworkDetails?.map((nd, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.2 }}
                 className="flex flex-col items-center gap-6"
              >
                 <div className="w-32 h-32 rounded-full border border-ink/10 flex items-center justify-center bg-paper/20 backdrop-blur-md relative group">
                    <div className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none opacity-40">
                       {[...Array(12)].map((_, j) => (
                         <motion.div 
                           key={j}
                           className="absolute w-0.5 h-4 bg-accent/40 rounded-full"
                           animate={{ 
                             rotate: [j * 30, j * 30 + 360],
                             scale: [1, 1.5, 1],
                             opacity: [0.3, 0.6, 0.3]
                           }}
                           transition={{ repeat: Infinity, duration: 4, delay: j * 0.1 }}
                           style={{ originY: '40px' }}
                         />
                       ))}
                    </div>
                    <div className="text-accent font-calligraphy text-2xl group-hover:scale-110 transition-transform">绣</div>
                 </div>
                 <span className="font-serif text-[10px] tracking-widest text-ink/40 uppercase">{nd.name}</span>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full relative flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0 bg-ink/5 mix-blend-overlay opacity-30" />
       
       <AnimatePresence mode="wait">
          <motion.div
            key={hotspot.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            {renderInteraction()}
          </motion.div>
       </AnimatePresence>

       {/* Floating Interaction Prompt */}
       <motion.div 
         animate={{ y: [0, 5, 0] }}
         transition={{ repeat: Infinity, duration: 2 }}
         className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 bg-ink text-paper rounded-full shadow-lg z-30"
       >
          <MousePointer2 size={12} />
          <span className="text-[9px] font-serif tracking-[0.2em] uppercase">Interactive Mode Active</span>
       </motion.div>

       {/* Decorative Particles */}
       <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-px h-px bg-accent/20 rounded-full"
              animate={{ 
                x: [Math.random() * 1000, Math.random() * 1000],
                y: [Math.random() * 1000, Math.random() * 1000],
                opacity: [0, 0.4, 0]
              }}
              transition={{ repeat: Infinity, duration: 5 + Math.random() * 10, ease: "linear" }}
            />
          ))}
       </div>
    </div>
  );
}
