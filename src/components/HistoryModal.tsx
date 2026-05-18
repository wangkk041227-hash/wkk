import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Map } from 'lucide-react';
import { HISTORY_TIMELINE } from '../data';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-paper shadow-2xl rounded-sm max-h-full overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 hover:bg-ink/5 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-12 md:p-20">
              <header className="mb-16 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="h-px w-12 bg-accent/30" />
                  <Calendar className="text-accent" size={20} />
                  <span className="h-px w-12 bg-accent/30" />
                </div>
                <h2 className="font-calligraphy text-6xl text-ink mb-4">姑苏繁华·千年史</h2>
                <p className="font-serif text-ink/40 tracking-[0.3em] uppercase text-xs">A Millennial History of Embroidery</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-ink/5 hidden md:block" />

                {HISTORY_TIMELINE.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'md:text-right md:flex-row-reverse' : ''}`}
                  >
                    <div className="flex-shrink-0 w-24">
                      <span className="font-serif text-accent text-xl font-bold">{item.year}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                      <p className="font-serif text-sm text-ink/60 leading-relaxed">{item.description}</p>
                    </div>
                    {/* Dot on line */}
                    <div className="absolute left-1/2 -ml-[4px] top-2 w-2 h-2 rounded-full bg-accent hidden md:block" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 p-8 bg-paper border border-accent/10 rounded-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="font-calligraphy text-4xl text-accent/20 whitespace-nowrap">极简史</div>
                  <p className="font-serif text-sm text-ink/80 leading-loose">
                    姑苏图苏绣始于宋、定名于明、母本成于清乾隆，现代成型于顾文霞，当代由姚惠芬、张玉英、周海云推向巅峰，成为苏绣城市长卷最高代表。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
