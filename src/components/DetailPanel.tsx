import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import type { Hotspot } from '../data';

interface DetailPanelProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

export default function DetailPanel({ hotspot, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {hotspot && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-paper shadow-2xl z-50 overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 hover:bg-ink/5 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-12 h-full flex flex-col">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-px w-12 bg-accent" />
                  <span className="font-serif text-accent tracking-[0.3em] uppercase text-xs">Cultural Detail</span>
                </div>
                <h2 className="font-calligraphy text-6xl text-ink mb-2">{hotspot.title}</h2>
                <p className="font-serif text-lg text-ink/40 tracking-wider">Spotlight on Masterpiece</p>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="aspect-[4/3] overflow-hidden rounded-sm mb-8 shadow-xl"
              >
                <img 
                  src={hotspot.image} 
                  alt={hotspot.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex-grow"
              >
                <div className="font-serif text-ink/80 leading-loose text-lg tracking-wide space-y-6">
                  <p>{hotspot.description}</p>
                  
                  {hotspot.needlework && (
                    <div className="p-4 bg-accent/5 border-l-2 border-accent mt-8">
                      <p className="text-xs uppercase tracking-widest text-accent font-bold mb-2">苏绣针法细节</p>
                      <p className="text-sm italic">{hotspot.needlework}</p>
                    </div>
                  )}
                  
                  <p className="text-sm italic opacity-60">
                    "笔墨所到之处，皆是千年文明的回响。"
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-12"
              >
                <button className="flex items-center gap-3 text-accent font-serif tracking-widest text-sm group">
                  <span>了解更多文博详情</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Vertical Deco */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-5">
              <p className="text-vertical font-serif text-[4rem] font-bold tracking-[1em]">宋画·流光</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
