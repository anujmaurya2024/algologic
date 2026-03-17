// src/components/explanation/StreamingExplanation.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StreamingExplanationProps {
  text: string;
  onComplete?: () => void;
}

export function StreamingExplanation({ text, onComplete }: StreamingExplanationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsStreaming(true);
    
    let currentIdx = 0;
    const words = text.split(' ');
    
    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        const nextWord = words[currentIdx];
        if (nextWord !== undefined) {
          setDisplayedText(prev => prev + (prev ? ' ' : '') + nextWord);
        }
        currentIdx++;
      } else {

        setIsStreaming(false);
        clearInterval(interval);
        onComplete?.();
      }
    }, 40); // Fast enough to feel snappy, slow enough to see the stream

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div className="relative">
      <p className="text-sm text-slate-300 leading-relaxed font-medium min-h-[3rem]">
        {displayedText}
        {isStreaming && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1.5 h-4 bg-indigo-400 ml-1 translate-y-0.5"
          />
        )}
      </p>
    </div>
  );
}
