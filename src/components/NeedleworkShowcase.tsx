import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, ArrowDown, Award, Eye, History, Layers, 
  Sparkles, Wind, ChevronRight, Info 
} from 'lucide-react';

interface StitchType {
  id: string;
  name: string;
  enName: string;
  story: string;
  quote: string;
  feature: string;
  use: string;
  icon: React.ReactNode;
}

interface NeedleworkShowcaseProps {
  onContinue: () => void;
}

const STITCHES: StitchType[] = [
  { id: 'ping', name: '平针', enName: 'Ping Stitch', story: '平针是刺绣基本技法之一，是各种针法的基础。平针讲究均匀与秩序，不能重叠，不能露底。', quote: '平针讲究均匀与秩序，是所有针法的根基。', feature: '线条排列均匀齐整，不可重叠。', use: '大面积铺底，形成丝绸般平滑光泽。', icon: <Menu size={18} /> },
  { id: 'rao', name: '绕针', enName: 'Rao Stitch', story: '又叫缠针，是用斜行的短线条缠绕着形体绣作。针迹要匀密，边口要齐整，不宜色调深浅。', quote: '绕针重在方向一致，针迹若乱，纹样便失去灵气。', feature: '方向一致，针迹匀密。', use: '绣小型花叶、枝干及字迹。', icon: <ArrowDown size={18} /> },
  { id: 'panjin', name: '盘金', enName: 'Panjin Stitch', story: '将金线回旋加于图案边缘。盘金作品光亮，具有富丽辉煌的装饰效果。', quote: '金线回旋，复刻古礼器的庄重与华美。', feature: '金线绕转，富丽闪耀。', use: '礼制图腾、龙凤纹饰。', icon: <Award size={18} /> },
  { id: 'xushi', name: '虚实针', enName: 'Xushi Stitch', story: '虚、实并用，以实形虚。密针深色，虚针淡色，形成呼吸感。', quote: '针愈稀，线愈淡，虚与实之间，才有东方山水的呼吸。', feature: '疏密渐变，形成空间感。', use: '山水墨迹、云气远近。', icon: <Eye size={18} /> },
  { id: 'luan', name: '乱针', enName: 'Luan Stitch', story: '又名正则绣。一改传统规律，运用长短交叉线条分层施色，表现画面形象饱满。', quote: '乱针看似无序，实则藏着自然万物的规律。', feature: '长短交叉，分层施色。', use: '写意山水、人物肖像。', icon: <History size={18} /> },
  { id: 'liantiao', name: '链条针', enName: 'Chain Stitch', story: '形状像辫子，等长线条针针扣套而成。比较结实均匀。', quote: '环环相扣，如辫状蔓延，形成流动的秩序。', feature: '辫子形状，闭合连接。', use: '边缘装饰、动态线条。', icon: <Layers size={18} /> },
  { id: 'dazi', name: '打子绣', enName: 'Knot Stitch', story: '线条绕成粒状小圈。绣一针见一粒子，常用于装饰性强的图案。', quote: '打子绣一针一粒，如同万物生长。', feature: '颗粒状，立体感强。', use: '花蕊、装饰性圆点。', icon: <Sparkles size={18} /> },
  { id: 'gun', name: '滚针', enName: 'Gun Stitch', story: '两线紧逼，连成条纹。转折灵活，无论直线、曲线都恰当。', quote: '滚针重在线条的流动，它让静止的绣面拥有生命。', feature: '波形条纹，动态感强。', use: '须发、衣褶、流动纹理。', icon: <Wind size={18} /> }
];

const StitchVisualizer = ({ stitchId, density, amplitude, hue }: { stitchId: string, density: number, amplitude: number, hue: number }) => {
  const color = `hsla(${hue}, 40%, 75%, 0.9)`;
  const lines = [];
  const count = Math.floor(density * 1.2);

  switch(stitchId) {
    case 'ping':
      for(let i=0; i<count; i++) {
        const y = 15 + (i * 70) / count;
        lines.push(
          <motion.line 
            key={i} 
            x1="15" y1={y} x2="85" y2={y} 
            stroke={color} strokeWidth="0.4" 
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={{ pathLength: 1, opacity: 0.8 }} 
            transition={{ duration: 1.5, delay: i * 0.02 }} 
          />
        );
      }
      break;
    case 'rao':
      for(let i=0; i<count; i++) {
        const x = 20 + (i * 60) / count;
        lines.push(
          <motion.path 
            key={i} 
            d={`M ${x} 20 Q ${x + 8} 50, ${x} 80`} 
            fill="none" stroke={color} strokeWidth="0.6" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 1, delay: i * 0.03 }} 
          />
        );
      }
      break;
    case 'panjin':
      for(let i=0; i<8; i++) {
        const r = 10 + i * 8;
        lines.push(
          <motion.circle 
            key={i} 
            cx="50" cy="50" r={r} 
            fill="none" stroke={color} strokeWidth="1.5" 
            strokeDasharray="2 2"
            initial={{ pathLength: 0, rotate: 0 }} 
            animate={{ pathLength: 1, rotate: 360 }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
          />
        );
      }
      break;
    case 'xushi':
      for(let i=0; i<count * 2; i++) {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        const opacity = (x / 100);
        lines.push(
          <motion.circle 
            key={i} 
            cx={x} cy={y} r="0.5" 
            fill={color} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: opacity }} 
            transition={{ duration: 1, delay: Math.random() }} 
          />
        );
      }
      break;
    case 'luan':
      for(let i=0; i<count; i++) {
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = x1 + (Math.random() - 0.5) * 30;
        const y2 = y1 + (Math.random() - 0.5) * 30;
        lines.push(
          <motion.line 
            key={i} 
            x1={x1} y1={y1} x2={x2} y2={y2} 
            stroke={color} strokeWidth="0.3" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 0.5, delay: i * 0.01 }} 
          />
        );
      }
      break;
    case 'liantiao':
      for(let i=0; i<count / 2; i++) {
        const y = 20 + (i * 60) / (count / 2);
        lines.push(
          <motion.ellipse 
            key={i} 
            cx="50" cy={y} rx="5" ry="8" 
            fill="none" stroke={color} strokeWidth="0.8" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 1, delay: i * 0.05 }} 
          />
        );
      }
      break;
    case 'dazi':
      for(let i=0; i<count; i++) {
        const x = Math.random() * 60 + 20;
        const y = Math.random() * 60 + 20;
        lines.push(
          <motion.circle 
            key={i} 
            cx={x} cy={y} r="1.5" 
            fill={color} 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, delay: i * 0.02 }} 
          />
        );
      }
      break;
    case 'gun':
      const points = [];
      for(let i=0; i<=count; i++) {
        const x = 10 + (i * 80) / count;
        const y = 50 + Math.sin(i / 5) * amplitude;
        points.push(`${x},${y}`);
      }
      lines.push(
        <motion.polyline 
          key="gun-line" 
          points={points.join(' ')} 
          fill="none" stroke={color} strokeWidth="1" 
          strokeDasharray="1 1"
          initial={{ pathLength: 0 }} 
          animate={{ pathLength: 1 }} 
          transition={{ duration: 2 }} 
        />
      );
      break;
  }

  return <svg viewBox="0 0 100 100" className="w-full h-full">{lines}</svg>;
};

const SectionHeader = ({ title, enTitle, pageNo, align = 'left' }: { title: string, enTitle: string, pageNo: string, align?: 'left' | 'center' }) => (
  <div className={`space-y-2 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-serif tracking-[0.5em] text-gold uppercase">{pageNo}</span>
      <div className="h-px w-8 bg-gold/30" />
    </div>
    <h2 className="font-calligraphy text-5xl text-ink tracking-widest">{title}</h2>
    <p className="font-serif text-[10px] tracking-[0.4em] text-ink/40 uppercase">{enTitle}</p>
  </div>
);

const DialogBox = ({ speaker, text }: { speaker: string, text: string }) => (
  <div className="p-6 bg-accent/5 border-l-2 border-accent/40 rounded-sm italic">
    <div className="flex items-center gap-2 mb-2">
      <Info size={12} className="text-accent" />
      <span className="text-[9px] font-serif tracking-widest text-accent uppercase font-bold">{speaker}</span>
    </div>
    <p className="text-xs font-serif text-ink/70 leading-loose">“{text}”</p>
  </div>
);

export default function NeedleworkShowcase({ onContinue }: NeedleworkShowcaseProps) {
  const [selectedStitch, setSelectedStitch] = useState(0);
  const [stitchDensity, setStitchDensity] = useState(40);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-paper overflow-y-auto no-scrollbar"
    >
      <section id="lab" className="min-h-screen relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Stitch Selector */}
            <div className="w-full lg:w-1/4 space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.5em] text-gold/60 uppercase">Module 05-12 / 档案</p>
                <h3 className="text-6xl font-calligraphy text-accent tracking-tighter">针法修习</h3>
              </div>
              
              <div className="space-y-3">
                {STITCHES.map((s, i) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedStitch(i)}
                    className={`w-full text-left p-6 border-l-2 transition-all flex items-center justify-between group rounded-r-sm ${selectedStitch === i ? 'border-accent bg-accent/5 shadow-sm' : 'border-ink/5 hover:border-gold/40'}`}
                  >
                    <div>
                      <p className={`text-[10px] font-serif tracking-widest uppercase mb-1 transition-opacity ${selectedStitch === i ? 'opacity-100 font-bold' : 'opacity-40'}`}>0{i + 5} · {s.enName}</p>
                      <p className={`text-xl font-serif tracking-wider ${selectedStitch === i ? 'text-accent' : 'text-ink/60'}`}>{s.name}</p>
                    </div>
                    <div className={`transition-all duration-500 ${selectedStitch === i ? 'text-accent scale-125' : 'text-ink/20 opacity-30 group-hover:opacity-100'}`}>
                      {s.icon}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right: Interaction Lab */}
            <div className="w-full lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedStitch}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* Content Section */}
                    <div className="space-y-10">
                      <SectionHeader 
                        title={STITCHES[selectedStitch].name} 
                        enTitle={STITCHES[selectedStitch].enName} 
                        pageNo={`0${selectedStitch + 5}`} 
                      />
                      
                      <p className="font-serif text-base text-ink/70 tracking-widest leading-relaxed">
                        {STITCHES[selectedStitch].story}
                      </p>
                      
                      <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                          <span className="text-[9px] font-serif tracking-widest text-gold font-bold uppercase">Feature / 核心特点</span>
                          <p className="font-serif text-sm text-ink/80 border-b border-ink/5 pb-2">{STITCHES[selectedStitch].feature}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-serif tracking-widest text-gold font-bold uppercase">Application / 应用场景</span>
                          <p className="font-serif text-sm text-ink/80 border-b border-ink/5 pb-2">{STITCHES[selectedStitch].use}</p>
                        </div>
                      </div>
                      
                      <DialogBox speaker="教习声" text={STITCHES[selectedStitch].quote} />
                    </div>

                    {/* Visualization Section */}
                    <div className="relative aspect-square border border-ink/10 flex items-center justify-center bg-[#1a1a1a]/5 rounded-sm overflow-hidden shadow-inner group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,44,44,0.05)_0%,transparent_70%)]" />
                      
                      <div className="w-full h-full p-12">
                        <StitchVisualizer 
                          stitchId={STITCHES[selectedStitch].id} 
                          density={stitchDensity} 
                          amplitude={10} 
                          hue={35} 
                        />
                      </div>
                      
                      {/* Density Control */}
                      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3 bg-paper/80 backdrop-blur-md p-4 rounded-sm border border-ink/5">
                        <label className="text-[9px] font-serif tracking-[0.4em] text-ink/40 uppercase font-bold">Intensity / 针脚密度</label>
                        <input 
                          type="range" 
                          min="20" max="100" 
                          value={stitchDensity}
                          onChange={(e) => setStitchDensity(parseInt(e.target.value))}
                          className="w-32 h-[1px] appearance-none bg-ink/10 accent-accent cursor-pointer"
                        />
                      </div>

                      {/* Micro-Interaction Indicator */}
                      <div className="absolute top-6 left-6 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                         <span className="text-[8px] font-serif tracking-[0.3em] text-ink/30 uppercase">Microscopic Simulation ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Continue Exploration Button */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 flex justify-end"
              >
                <button
                  onClick={onContinue}
                  className="group flex items-center gap-6 px-16 py-5 bg-ink text-paper hover:bg-accent transition-all duration-500 rounded-sm shadow-xl"
                >
                  <div className="text-right">
                    <p className="text-[9px] font-serif tracking-widest opacity-60 uppercase mb-1">Chapter Over / 完成修习</p>
                    <p className="font-serif text-sm tracking-[0.2em]">进入长卷世界 EXPLORE SCROLL</p>
                  </div>
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vertical Decorative Background Text */}
        <div className="fixed left-6 top-0 bottom-0 pointer-events-none p-4 opacity-[0.03] flex items-center">
          <p className="text-vertical font-serif text-[18vh] font-bold tracking-widest">指尖繁华</p>
        </div>
      </section>
    </motion.div>
  );
}

