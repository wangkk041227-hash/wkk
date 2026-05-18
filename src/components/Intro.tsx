import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, ChevronRight, ArrowRight } from 'lucide-react';

interface IntroProps {
  onEnter: () => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
}

export default function Intro({ onEnter, isAudioEnabled, toggleAudio }: IntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-paper overflow-hidden"
    >
      {/* Background Decorative Element */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1542223175-7582dd4ee4fb?q=80&w=2600&auto=format&fit=crop" 
          alt="Traditional Background" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Silk Thread Particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
         {[...Array(5)].map((_, i) => (
           <svg key={i} className="absolute inset-0 w-full h-full opacity-20">
              <motion.path
                d={`M ${-100 + i * 200},${300 + i * 100} Q ${400 + i * 100},${100 - i * 50} ${1200 + i * 100},${600 + i * 20}`}
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear", delay: i * 2 }}
              />
           </svg>
         ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="font-serif text-xs tracking-[0.5em] text-accent/60 uppercase mb-4 block">Prologue · 引子</span>
          <h1 className="font-calligraphy text-8xl md:text-9xl text-accent mb-6 tracking-wider">
            苏绣·姑苏繁华
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink/80 tracking-[0.2em] mb-12 uppercase">
            The Silk Narrative
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="max-w-md mb-12">
            <p className="font-serif text-ink/70 leading-loose tracking-wider text-base indent-8 text-left">
              “十二米长卷，藏着 18 世纪姑苏的烟火，也藏着 8 种苏绣针法的温度。你将以活化项目参与者的身份，开启一场丝线与数字的对话。”
            </p>
          </div>
          
          <button
            onClick={onEnter}
            className="group relative"
          >
            <motion.div 
              className="absolute -inset-8 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <div className="relative px-16 py-4 bg-accent text-paper overflow-hidden transition-all rounded-sm flex items-center gap-4">
               <span className="font-serif text-lg tracking-widest">开启丝卷之旅 / START</span>
               <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               
               {/* Thread Line animation under the button text */}
               <motion.div 
                 className="absolute bottom-0 left-0 h-[1px] bg-white opacity-40"
                 animate={{ x: ['-100%', '200%'] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 style={{ width: '40%' }}
               />
            </div>
            
            {/* Visualizing thread汇聚 effect */}
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-px h-12 bg-accent/30" />
          </button>

          <div className="flex items-center gap-4 text-ink/40">
            <span className="h-px w-8 bg-current" />
            <button 
              onClick={toggleAudio}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span className="text-xs uppercase tracking-widest font-medium">Ambient Audio</span>
            </button>
            <span className="h-px w-8 bg-current" />
          </div>
        </motion.div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-vertical font-serif text-xs text-ink/30 tracking-[0.5em] leading-loose">
          汴京繁华 · 千年梦回 · 笔墨精微 · 气象万千
        </p>
      </div>
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-vertical font-serif text-xs text-ink/30 tracking-[0.5em] leading-loose uppercase">
          Digital Recreation of Song Dynasty Masterpieces
        </p>
      </div>
    </motion.div>
  );
}
