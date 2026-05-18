import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface StoryViewProps {
  onBack: () => void;
  userChoices: Record<string, string>;
}

const CHAPTERS = [
  {
    id: 'intro',
    title: '终章 · 盛世合卷',
    subtitle: 'THE FINALE',
    content: '乱针看似无序，实则藏着自然万物的规律。',
    bg: '/微信图片_20260513234838_1362_132.jpg'
  },
  {
    id: 'recap',
    title: '决策之印',
    subtitle: 'NARRATIVE RECAP',
    content: '每一次选择，都在数字世界中留下了一条带有温度的丝线。',
    bg: '/微信图片_20260513234840_1363_132.jpg'
  },
  {
    id: 'final_choice',
    title: '抉择与共生',
    subtitle: 'THE FINAL PATH',
    content: '长卷活化项目即将上线，你最终选择的传承方式是？',
    bg: '/微信图片_20260513234838_1362_132.jpg'
  },
  {
    id: 'final_reveal',
    title: '万象归一',
    subtitle: 'UNVEILING PERPETUITY',
    content: '这一针落下，便是永恒。',
    bg: '/微信图片_20260513234838_1362_132.jpg'
  }
];

export default function StoryView({ onBack, userChoices }: StoryViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEnding, setSelectedEnding] = useState<string | null>(null);
  
  const currentChapter = CHAPTERS[currentPage];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-hidden select-none"
    >
      <AnimatePresence mode="wait">
        <PageContent 
          key={currentPage}
          chapter={currentChapter}
          index={currentPage}
          userChoices={userChoices}
          selectedEnding={selectedEnding}
          onSetEnding={(id: string) => {
            setSelectedEnding(id);
            setCurrentPage(prev => Math.min(CHAPTERS.length - 1, prev + 1));
          }}
          onNext={() => setCurrentPage(prev => Math.min(CHAPTERS.length - 1, prev + 1))}
          onBack={onBack}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function PageContent({ chapter, userChoices, selectedEnding, onSetEnding, onNext, onBack }: any) {
  const [showFullPainting, setShowFullPainting] = useState(false);

  useEffect(() => {
    if (chapter.id === 'final_reveal') {
      const timer = setTimeout(() => setShowFullPainting(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [chapter.id]);

  if (chapter.id === 'intro') {
    return (
      <motion.div key="intro" className="h-full w-full flex flex-col items-center justify-center p-12 text-center relative">
        <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
        
        <div className="relative z-10 space-y-12 max-w-4xl">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 2 }}
             className="relative mb-12"
           >
              <div className="w-48 h-48 bg-accent/20 rounded-full blur-[80px] mx-auto animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="font-calligraphy text-9xl text-accent/10">终</span>
              </div>
           </motion.div>

           <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 p-10 backdrop-blur-md relative"
              >
                 <div className="absolute top-0 left-0 w-4 h-px bg-accent/40" />
                 <div className="absolute top-0 left-0 h-4 w-px bg-accent/40" />
                 
                 <div className="flex items-center gap-3 mb-6 justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                   <span className="text-[10px] font-serif tracking-[0.4em] text-accent uppercase font-bold">老绣娘</span>
                 </div>
                 <p className="font-calligraphy text-4xl text-paper tracking-[0.3em] leading-relaxed">
                   “{chapter.content}”
                 </p>
              </motion.div>
           </div>

           <motion.button 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2.5 }}
             onClick={onNext} 
             className="px-16 py-4 bg-accent text-paper font-serif text-xs tracking-widest rounded-sm hover:scale-105 transition-all flex items-center gap-4 mx-auto group"
           >
             阅览数字足迹 <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
           </motion.button>
        </div>
      </motion.div>
    );
  }

  if (chapter.id === 'recap') {
    return (
      <motion.div key="recap" className="h-full w-full grid grid-cols-1 md:grid-cols-2 p-12 lg:p-24 overflow-y-auto no-scrollbar bg-[#fdfcf5]">
         <div className="flex flex-col justify-center pr-12">
            <h3 className="font-calligraphy text-7xl text-ink mb-12">数字繁华志</h3>
            <div className="space-y-4">
               {Object.entries(userChoices).length > 0 ? Object.entries(userChoices).map(([id, val]: any) => (
                 <div key={id} className="p-6 bg-white border border-ink/5 rounded-sm flex justify-between items-center shadow-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-serif text-ink/30 uppercase tracking-[0.2em]">{id}</span>
                      <span className="font-serif text-sm text-ink/80 font-bold">
                        {id === 'changmen' ? '阊门核心复刻' : id === 'mudu' ? '木渎底色构建' : '画卷细节完善'}
                      </span>
                    </div>
                    <span className={`px-6 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase border ${val === 'AI' ? 'bg-blue-500/5 text-blue-500 border-blue-500/20' : 'bg-accent/5 text-accent border-accent/20'}`}>
                       {val === 'AI' ? 'AI 效率优先' : '手工匠心优先'}
                    </span>
                 </div>
               )) : (
                 <div className="p-10 border border-dashed border-ink/10 text-center">
                    <p className="font-serif text-sm text-ink/40 tracking-widest">你在漫游中保持了纯粹的观察者身份。</p>
                 </div>
               )}
            </div>
            <button onClick={onNext} className="mt-16 w-fit px-16 py-4 bg-ink text-paper font-serif text-xs tracking-widest rounded-sm flex items-center gap-4 hover:bg-accent transition-colors group">
               前往落笔之处 <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
         </div>
         <div className="flex items-center justify-center p-8 bg-paper">
            <div className="w-full aspect-[3/4] border border-ink/5 relative overflow-hidden shadow-2xl">
               <img src="/微信图片_20260513234840_1363_132.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent flex items-end p-8">
                  <div className="text-paper">
                    <p className="text-[10px] font-serif tracking-widest opacity-60 mb-2">FINAL PROJECT DATA</p>
                    <h4 className="font-calligraphy text-3xl">数字传承 vs 丝线温度</h4>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
    );
  }

  if (chapter.id === 'final_choice') {
    const options = [
      { id: 'AI', name: '纯 AI 复刻', desc: '追求极速传播，用算法替代所有手工。', icon: '⚡' },
      { id: 'MANUAL', name: '纯手工修复', desc: '不惜工本，回归一针一线的极致触感。', icon: '🧵' },
      { id: 'HYBRID', name: 'AI 辅助 + 手工补全', desc: '数字效率与艺术温度的终极共生。', icon: '✨' }
    ];

    return (
      <motion.div key="choice" className="h-full w-full flex flex-col items-center justify-center p-12 bg-[#0a0a0a]">
         <div className="max-w-4xl w-full space-y-12 text-center">
            <motion.div className="space-y-4">
              <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-serif font-bold">The Last Decision</span>
              <h2 className="font-calligraphy text-6xl text-paper tracking-widest">{chapter.content}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {options.map((opt) => (
                 <button 
                  key={opt.id}
                  onClick={() => onSetEnding(opt.id)}
                  className="p-8 border border-white/10 bg-white/5 hover:bg-accent/10 hover:border-accent transition-all group flex flex-col items-center gap-6"
                 >
                    <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>
                    <div className="space-y-4">
                       <h4 className="font-serif font-bold text-paper text-sm tracking-widest uppercase">{opt.name}</h4>
                       <p className="text-[10px] font-serif text-paper/40 leading-relaxed">{opt.desc}</p>
                    </div>
                 </button>
               ))}
            </div>
         </div>
      </motion.div>
    );
  }

  if (chapter.id === 'final_reveal') {
    const endings: any = {
      'MANUAL': {
        name: '绣韵永存',
        tag: '手工匠心',
        desc: '丝线的温度，终被传承。这卷 12 米的苏绣，成了姑苏繁华最鲜活的记忆。',
        visual: '手工修复长卷，点击任意部分都能触发针法互动。'
      },
      'AI': {
        name: '数字新生',
        tag: '数字效率',
        desc: '快速传播的代价，是丢失了最细腻的温度。',
        comment: '“这和普通数字画有什么区别？”',
        visual: 'AI 复刻的长卷，色彩鲜艳但没有针法细节。'
      },
      'HYBRID': {
        name: '绣影共生',
        tag: '理想平衡',
        desc: 'AI 让千万人看见姑苏繁华，手工守住了丝线里的温度，这才是最好的传承。',
        visual: '融合版长卷，AI 生成的背景与手工修复的细节并存。'
      },
      'DREAM': {
        name: '繁华遗梦',
        tag: '传承断裂',
        desc: '没有温度的传承，终究会被遗忘。',
        visual: '长卷停留在破损状态，项目取消。'
      }
    };

    // If they were very pro-AI in previous choices but chose AI here, maybe they get "数字新生"
    // If they were inconsistent, maybe "繁华遗梦" etc.
    // For now keep it simple based on final choice.
    const ending = endings[selectedEnding || 'HYBRID'];

    return (
      <motion.div key="final" className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
        {/* Full Painting Background Reveal */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: showFullPainting ? 1 : 0.2, scale: showFullPainting ? 1 : 1.1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-[#0a0a0a]"
        >
           <img 
            src="/微信图片_20260513234838_1362_132.jpg" 
            className={`w-full h-full object-cover opacity-60 contrast-125 ${selectedEnding === 'AI' ? 'grayscale-0' : 'grayscale-[0.5]'}`} 
            alt="" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
           
           {/* Visual filter for different endings */}
           {showFullPainting && selectedEnding === 'DREAM' && (
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
           )}
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl px-12 text-center flex flex-col items-center justify-center min-h-[60vh]">
           <AnimatePresence mode="wait">
             {!showFullPainting ? (
               <motion.div 
                 key="last-stitch"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="space-y-12"
               >
                 <div className="w-px h-24 bg-accent/40 mx-auto" />
                 <h2 className="font-calligraphy text-4xl text-accent tracking-[0.4em]">落针 · 见繁华</h2>
                 <p className="font-serif text-paper/60 text-sm tracking-widest uppercase italic">{ending.name} ...</p>
               </motion.div>
             ) : (
               <motion.div 
                 key="message"
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 2 }}
                 className="space-y-10"
               >
                 <div className="space-y-4">
                   <div className="px-6 py-1 bg-accent/10 rounded-full text-accent font-serif text-[10px] tracking-widest uppercase mb-6 mx-auto w-fit">
                    {ending.tag}
                   </div>
                   <h1 className="font-calligraphy text-7xl md:text-8xl text-paper tracking-[0.3em] drop-shadow-2xl">
                        {ending.name}
                   </h1>
                   <p className="font-serif text-paper/60 text-sm tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
                     {ending.desc}
                   </p>
                   {ending.comment && (
                     <p className="text-red-400 font-serif text-xs opacity-60 mt-4 tracking-widest">{ending.comment}</p>
                   )}
                 </div>

                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1 }}
                   className="bg-black/40 backdrop-blur-md p-10 border border-white/5 relative mb-12"
                 >
                    <div className="flex items-center gap-3 mb-6 justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-[10px] font-serif tracking-[0.4em] text-accent font-bold uppercase">老绣娘</span>
                    </div>
                    <p className="font-calligraphy text-4xl text-paper tracking-[0.3em] leading-relaxed">
                      “纹样会被时间磨损，但针法会继续流传。”
                    </p>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 3 }}
                   className="space-y-8"
                 >
                   <p className="font-serif text-paper/40 text-sm tracking-[0.3em]">此时你终于明白...</p>
                   <h2 className="font-calligraphy text-6xl md:text-7xl text-paper tracking-[0.5em] drop-shadow-2xl opacity-80">
                      一针一线形成文化
                   </h2>
                 </motion.div>

                 <motion.button 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 6 }}
                   onClick={onBack}
                   className="mt-12 px-16 py-5 border border-accent/40 bg-accent/5 hover:bg-accent hover:text-paper transition-all text-[10px] font-serif tracking-[0.4em] uppercase text-accent"
                 >
                   回首繁华 / RESTART JOURNEY
                 </motion.button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <div className="absolute top-12 left-12 w-32 h-32 border-t border-l border-white/10" />
        <div className="absolute bottom-12 right-12 w-32 h-32 border-b border-r border-white/10" />
      </motion.div>
    );
  }

  return null;
}
