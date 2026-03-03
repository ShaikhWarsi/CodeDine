'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BenchmarkTimerProps {
  benchmarkMinutes: number;
  onComplete?: (timeSpent: number) => void;
}

export function BenchmarkTimer({ benchmarkMinutes, onComplete }: BenchmarkTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const benchmarkSeconds = benchmarkMinutes * 60;
  const isOvertime = seconds > benchmarkSeconds;

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(Math.abs(totalSeconds) / 60);
    const secs = Math.abs(totalSeconds) % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <div className={cn(
      "flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-500",
      isActive ? "bg-white/[0.03] border-white/[0.1]" : "bg-white/[0.01] border-white/[0.05]",
      isOvertime && isActive && "border-rose-500/30 bg-rose-500/[0.02]"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TimerIcon className={cn("w-3 h-3", isOvertime ? "text-rose-500" : "text-slate-500")} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            {isOvertime ? "Overtime" : "Focus Mode"}
          </span>
        </div>
        <div className="text-[9px] text-slate-700 font-mono font-bold uppercase tracking-widest">
          Target: {benchmarkMinutes}m
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className={cn(
          "text-4xl font-bold tracking-tighter font-mono",
          isOvertime ? "text-rose-500" : "text-white"
        )}>
          {formatTime(seconds)}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTimer}
            className={cn(
              "h-10 w-10 rounded-xl transition-all duration-300",
              isActive ? "text-white bg-white/[0.05]" : "text-slate-500 hover:text-white"
            )}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={resetTimer}
            className="h-10 w-10 rounded-xl text-slate-700 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isOvertime && (
        <div className="flex items-center gap-2 text-[9px] text-rose-500/80 font-black uppercase tracking-widest pt-2 border-t border-rose-500/10">
          <AlertTriangle className="w-3 h-3" />
          Exceeded by {formatTime(seconds - benchmarkSeconds)}
        </div>
      )}
    </div>
  );
}
