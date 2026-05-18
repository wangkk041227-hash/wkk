/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Intro from './components/Intro';
import ApprenticeArrival from './components/ApprenticeArrival';
import EmbroideryReveal from './components/EmbroideryReveal';
import NeedleworkShowcase from './components/NeedleworkShowcase';
import InteractivePainting from './components/InteractivePainting';
import ChapterView from './components/ChapterView';
import HistoryModal from './components/HistoryModal';
import StoryView from './components/StoryView';
import type { Hotspot } from './data';

export default function App() {
  const [view, setView] = useState<'intro' | 'apprentice' | 'reveal' | 'needlework' | 'gallery' | 'story'>('intro');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const toggleAudio = () => setIsAudioEnabled(!isAudioEnabled);

  const handleChoice = useCallback((hotspotId: string, choiceId: string) => {
    setUserChoices(prev => {
      const next = { ...prev, [hotspotId]: choiceId };
      // Logic for triggering ending if core choices made?
      // For now, allow manual trigger to story ending via navigation.
      return next;
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans selection:bg-accent/20">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <div key="intro">
            <Intro 
              onEnter={() => setView('apprentice')} 
              isAudioEnabled={isAudioEnabled}
              toggleAudio={toggleAudio}
            />
          </div>
        )}

        {view === 'apprentice' && (
          <div key="apprentice">
            <ApprenticeArrival 
              onContinue={() => setView('reveal')}
            />
          </div>
        )}

        {view === 'reveal' && (
          <div key="reveal">
            <EmbroideryReveal 
              onContinue={() => setView('needlework')}
            />
          </div>
        )}

        {view === 'needlework' && (
          <div key="needlework" className="relative w-full h-screen">
            <NeedleworkShowcase 
              onContinue={() => setView('gallery')}
            />
          </div>
        )}

        {view === 'gallery' && (
          <div key="gallery" className="relative w-full h-screen">
            <InteractivePainting 
              onHotspotClick={(h) => {
                setActiveHotspot(h);
              }} 
            />
            
            <ChapterView 
              hotspot={activeHotspot} 
              onClose={() => setActiveHotspot(null)}
              onChoice={(c) => handleChoice(activeHotspot?.id || 'unknown', c)}
              userChoices={userChoices}
            />

            {/* Ending Trigger button when some progress is made or purely by navigation */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setView('story')}
              className="fixed bottom-12 right-12 z-50 px-8 py-3 bg-accent text-paper rounded-full shadow-2xl font-serif text-[10px] tracking-widest uppercase flex items-center gap-3 group"
            >
               <span className="w-1 h-1 rounded-full bg-paper animate-ping" />
               最终项目汇总 / PROJECT REVIEW
            </motion.button>
          </div>
        )}

        {view === 'story' && (
          <div key="story">
            <StoryView 
              onBack={() => setView('gallery')} 
              userChoices={userChoices}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Global Navigation - Fixed across all views except intro */}
      <AnimatePresence>
        {view !== 'intro' && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-8 left-8 z-[60] flex items-center gap-6"
          >
            <button 
              onClick={() => {
                setView('intro');
                setActiveHotspot(null);
              }}
              className="font-calligraphy text-2xl text-accent hover:scale-110 transition-transform flex items-center gap-2 group"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-serif tracking-tighter mr-1">返回首页</span>
              苏绣·姑苏繁华
            </button>
            <div className="h-4 w-px bg-ink/20" />
            
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="text-[10px] uppercase tracking-[0.2em] font-serif text-ink/60 hover:text-accent transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              传承 · 史脉
            </button>

            <div className="h-4 w-px bg-ink/20" />
            
            <button 
              onClick={toggleAudio}
              className="text-[10px] uppercase tracking-[0.2em] font-serif text-ink/40 hover:text-accent transition-colors"
            >
              {isAudioEnabled ? 'Audio On' : 'Audio Off'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

      {view !== 'intro' && (
        <div className="fixed bottom-8 right-8 z-30">
          <p className="font-serif text-[10px] text-ink/20 tracking-[0.5em] uppercase">
            Suzhou Embroidery Cultural Digital Archive
          </p>
        </div>
      )}
    </div>
  );
}
