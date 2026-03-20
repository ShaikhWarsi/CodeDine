'use client';

import { useState, useEffect } from 'react';

export interface ProblemState {
  completed: boolean;
  notes: string;
  codeSnippet: string;
  lastAttemptAt?: number;
}

export type ProgressState = Record<string, ProblemState>;

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('codepath_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newState: ProgressState) => {
    setProgress(newState);
    localStorage.setItem('codepath_progress', JSON.stringify(newState));
  };

  const toggleComplete = (problemId: string) => {
    const newState = {
      ...progress,
      [problemId]: {
        ...progress[problemId],
        completed: !progress[problemId]?.completed,
        lastAttemptAt: Date.now(),
      }
    };
    saveProgress(newState);
  };

  const updateNotes = (problemId: string, notes: string) => {
    const newState = {
      ...progress,
      [problemId]: {
        ...progress[problemId],
        notes,
      }
    };
    saveProgress(newState);
  };

  const updateCodeSnippet = (problemId: string, codeSnippet: string) => {
    const newState = {
      ...progress,
      [problemId]: {
        ...progress[problemId],
        codeSnippet,
      }
    };
    saveProgress(newState);
  };

  const getProblemState = (problemId: string): ProblemState => {
    return progress[problemId] || { completed: false, notes: '', codeSnippet: '' };
  };

  const getPatternProgress = (patternId: string, problems: any[]) => {
    const patternProblems = problems.filter(p => p.primaryPatternId === patternId);
    const completed = patternProblems.filter(p => progress[p.id]?.completed).length;
    const total = patternProblems.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      completed,
      total,
      percentage
    };
  };

  return {
    progress,
    isLoaded,
    toggleComplete,
    updateNotes,
    updateCodeSnippet,
    getProblemState,
    getPatternProgress
  };
}
