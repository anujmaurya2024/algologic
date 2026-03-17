// src/components/controls/PlaybackControls.tsx
import { useEffect, useRef } from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export function PlaybackControls() {
  const {
    isPlaying,
    setPlaying,
    nextStep,
    prevStep,
    reset,
    playbackSpeed,
    setSpeed,
    steps,
    currentStepIndex,
    goToStep,
    isAtEnd,
    isAtStart,
  } = useVisualizerStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const { isAtEnd, nextStep, setPlaying } = useVisualizerStore.getState();
        if (isAtEnd()) {
          setPlaying(false);
        } else {
          nextStep();
        }
      }, playbackSpeed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const atStart = isAtStart();
  const atEnd = isAtEnd();
  const progress = steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

  const speedLabels: Record<number, string> = {
    1200: '0.5×',
    800: '0.75×',
    600: '1×',
    400: '1.5×',
    200: '2×',
    100: '3×',
  };

  return (
    <div className="px-6 pb-6 space-y-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Step {currentStepIndex + 1} / {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            const targetStep = Math.round(pct * (steps.length - 1));
            goToStep(targetStep);
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        {/* Left: step controls */}
        <div className="flex items-center gap-2">
          {/* Reset */}
          <button
            onClick={reset}
            className="btn-control"
            title="Reset"
            disabled={atStart}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </button>
          {/* Prev Step */}
          <button
            onClick={prevStep}
            className="btn-control"
            title="Previous Step"
            disabled={atStart}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setPlaying(!isPlaying)}
            className="btn-primary"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={nextStep}
            className="btn-control"
            title="Next Step"
            disabled={atEnd}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right: speed control */}
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-xs">Speed</span>
          <div className="flex gap-1">
            {([1200, 800, 600, 400, 200, 100] as number[]).map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeed(spd)}
                className={`px-2 py-1 rounded-lg text-xs font-mono transition-all duration-150 ${
                  playbackSpeed === spd
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                {speedLabels[spd]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
