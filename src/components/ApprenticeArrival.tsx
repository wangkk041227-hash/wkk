import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ApprenticeArrivalProps {
  onContinue: () => void;
}

const SectionHeader = ({ title, enTitle, pageNo, align = "center" }: { title: string; enTitle: string; pageNo: string; align?: "center" | "left" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`space-y-4 mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
  >
    <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
      <span className="text-[10px] tracking-[0.5em] text-accent/40 font-light">{pageNo}</span>
      <div className="w-12 h-px bg-accent/20" />
      <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-light">{enTitle}</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-calligraphy text-accent tracking-widest">{title}</h2>
  </motion.div>
);

const DialogBox = ({ speaker, text }: { speaker: string; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="border border-accent/20 bg-paper/40 backdrop-blur-md p-6 max-w-lg mx-auto shadow-xl"
  >
     <p className="text-[10px] tracking-[0.3em] text-accent/50 uppercase mb-3 border-b border-accent/10 pb-2">{speaker}</p>
     <p className="text-lg font-calligraphy text-ink tracking-widest leading-relaxed">
       {text}
     </p>
  </motion.div>
);

const SilkParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1], 
          opacity: [0, 0.6, 0],
          x: [0, 150 * (i % 2 === 0 ? 1 : -1)],
          y: [-40, 40]
        }}
        transition={{ 
          duration: 15 + i * 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 2
        }}
        className="absolute"
        style={{
          top: `${10 + i * 12}%`,
          left: i % 2 === 0 ? '-15%' : '115%',
        }}
      >
        <svg width="600" height="300" viewBox="0 0 600 300">
          <path 
            d={`M 0 150 Q 150 ${60 + i*30}, 300 150 T 600 150`} 
            fill="none" 
            stroke="var(--color-accent)" 
            strokeWidth="0.3" 
          />
        </svg>
      </motion.div>
    ))}
  </div>
);

const PATTERNS = [
  { title: "云纹", desc: "连续曲线，流动神秘", content: "战国时期纹样 云纹：连续曲线、流动感、神秘气质" },
  { title: "雷纹", desc: "几何循环，礼制象征", content: "雷纹：几何循环、秩序结构、礼制象征" },
  { title: "龙凤纹", desc: "装饰权力的化身", content: "龙凤纹：装饰性强、权力象征" },
  { title: "漩涡纹", desc: "生命回旋的律动", content: "漩涡纹：回旋结构、生命循环感" }
];

export default function ApprenticeArrival({ onContinue }: ApprenticeArrivalProps) {
  const mainSceneImg = "/微信图片_20260513234838_1362_132.jpg";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-[#fdfcf5] overflow-y-auto no-scrollbar py-24 px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="匠心初识" enTitle="APPRENTICE ARRIVAL" pageNo="02" />
        
        {/* Main Display Area */}
        <div className="relative aspect-[21/9] border border-accent/10 group overflow-hidden bg-ink/5 shadow-2xl rounded-sm">
          <img 
            src={mainSceneImg} 
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[10s] ease-linear grayscale" 
            alt="Embroidery Workshop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/40" />
          
          {/* Silk Particles Effect */}
          <SilkParticles />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-8 z-10">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               className="space-y-6"
             >
                <p className="font-serif text-lg text-ink/80 tracking-widest max-w-xl mx-auto leading-relaxed">
                  你作为新进入绣坊的学徒，被带入一间摆满绣架、丝线与古卷的房间。
                </p>
             </motion.div>
             
             <DialogBox 
                speaker="绣坊引导员" 
                text="“这里便是你的修业之地。云纹流动，雷纹循环，这些古老的智慧都藏在丝线中。”" 
             />
          </div>
        </div>
        
        {/* Pattern Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {PATTERNS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-accent/10 bg-white/50 backdrop-blur-sm group hover:border-accent/30 transition-all cursor-help relative rounded-sm shadow-sm"
            >
              <h4 className="text-accent font-calligraphy text-2xl mb-3">{item.title}</h4>
              <p className="text-[10px] text-ink/40 leading-relaxed tracking-[0.2em] font-serif uppercase">{item.desc}</p>
              
              {/* Tooltip on hover */}
              <div className="absolute left-0 bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-ink/90 backdrop-blur-md p-5 text-[11px] text-paper border border-accent/20 pointer-events-none z-20 w-56 font-serif leading-loose">
                 <Sparkles size={12} className="text-accent mb-2" />
                 {item.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex justify-center"
        >
          <button
            onClick={onContinue}
            className="group flex items-center gap-6 px-16 py-5 bg-accent text-paper hover:bg-ink transition-all duration-500 rounded-sm shadow-xl"
          >
            <div className="text-right">
              <p className="text-[9px] font-serif tracking-widest opacity-60 uppercase mb-1">Pattern Knowledge Mastery / 领悟纹样</p>
              <p className="font-serif text-sm tracking-[0.2em]">进入针法实验室 LEARN STITCHES</p>
            </div>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Decorative vertical text */}
      <div className="fixed right-6 top-0 bottom-0 pointer-events-none p-4 opacity-[0.02] flex items-center">
        <p className="text-vertical font-serif text-[18vh] font-bold tracking-widest">初识匠心</p>
      </div>
    </motion.div>
  );
}
