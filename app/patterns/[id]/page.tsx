'use client'

import React from 'react'
import Link from 'next/link'
import { patterns } from '@/lib/data'
import { notFound } from 'next/navigation'
import { useProgress } from '@/hooks/use-progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BenchmarkTimer } from '@/components/benchmark-timer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, ExternalLink, HelpCircle, Lightbulb, StickyNote, Trophy, Zap } from 'lucide-react'

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Foundation':
      return 'text-black dark:text-white border-black/[0.1] dark:border-white/[0.1] bg-slate-100 dark:bg-white/[0.03]'
    case 'Pattern Unlocker':
      return 'text-black dark:text-white border-black/[0.1] dark:border-white/[0.1] bg-slate-100 dark:bg-white/[0.03]'
    case 'Brain Burner':
      return 'text-black dark:text-white border-black/[0.1] dark:border-white/[0.1] bg-slate-100 dark:bg-white/[0.03]'
    default:
      return 'text-slate-500 border-black/[0.05] dark:border-white/[0.05] bg-transparent'
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'leetcode':
      return 'text-slate-500'
    case 'codeforces':
      return 'text-slate-500'
    case 'codechef':
      return 'text-slate-500'
    case 'gfg':
      return 'text-slate-500'
    default:
      return 'text-slate-500'
  }
}

export default function PatternDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const pattern = patterns.find((p) => p.id === id)
  const { toggleComplete, updateNotes, getProblemState, getPatternProgress, isLoaded } = useProgress()

  if (!pattern) {
    notFound()
  }

  const progress = getPatternProgress(pattern.id, pattern.problems)

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/10">
      {/* Navigation */}
      <nav className="border-b border-black/[0.05] dark:border-white/[0.05] bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-black dark:bg-white rounded flex items-center justify-center transition-transform duration-300">
              <Zap className="w-4 h-4 text-white dark:text-black fill-current" />
            </div>
            <span className="text-lg font-bold tracking-tight text-black dark:text-white">
              CodePath
            </span>
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/patterns" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
              Patterns
            </Link>
            <Link href="/mastery" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
              Mastery
            </Link>
            <Link href="/interview-questions">
              <Button size="sm" variant="ghost" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white">
                Practice Kit
              </Button>
            </Link>
            <div className="border-l border-black/[0.05] dark:border-white/[0.05] pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Header & Progress */}
      <div className="border-b border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <Link href="/patterns" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em]">
                <ArrowLeft className="w-3 h-3" /> Back to modules
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white">{pattern.name}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">{pattern.description}</p>
            </div>
            
            <div className="flex flex-col gap-6 p-8 glass-panel rounded-3xl min-w-[300px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">Module Progress</span>
                <Trophy className="w-4 h-4 text-slate-400 dark:text-slate-800" />
              </div>
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-black dark:text-white tracking-tighter">{isLoaded ? progress.completed : 0}<span className="text-slate-400 dark:text-slate-800">/{progress.total}</span></span>
                  <span className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest">{isLoaded ? progress.percentage : 0}%</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.03] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black dark:bg-white transition-all duration-1000 ease-out"
                    style={{ width: isLoaded ? `${progress.percentage}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main List */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-slate-600" />
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">Problem Set</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {pattern.problems.map((problem, idx) => {
                const problemState = getProblemState(problem.id);
                const isCompleted = isLoaded && problemState.completed;

                return (
                  <AccordionItem 
                    key={problem.id} 
                    value={problem.id}
                    className={`border border-black/[0.05] dark:border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 ${isCompleted ? 'bg-blue-500/[0.02] border-blue-500/20' : 'glass-panel hover:bg-slate-50 dark:hover:bg-slate-900/60'}`}
                  >
                    <div className="flex items-center gap-4 px-6 py-5">
                      <Checkbox 
                        checked={isCompleted}
                        onCheckedChange={() => toggleComplete(problem.id)}
                        className="w-5 h-5 border-slate-300 dark:border-slate-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-300"
                      />
                      
                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-slate-400 dark:text-slate-600 font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                            <h3 className={`text-lg font-bold tracking-tight transition-all duration-300 ${isCompleted ? 'text-slate-400 dark:text-slate-500 line-through decoration-blue-500/50' : 'text-black dark:text-slate-100'}`}>
                              {problem.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${getPlatformColor(problem.platform)}`}>
                              {problem.platform}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            {problem.benchmarkTime && (
                              <>
                                <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                  <Zap className="w-3 h-3 fill-blue-600 dark:fill-blue-400" /> {problem.benchmarkTime}m Benchmark
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <AccordionTrigger className="hover:no-underline p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-black/[0.05] dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 group/trigger">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover/trigger:text-blue-600 dark:group-hover/trigger:text-blue-400 px-2 flex items-center gap-2">
                              Details <ChevronRight className="w-3 h-3 group-data-[state=open]:rotate-90 transition-transform" />
                            </span>
                          </AccordionTrigger>
                          <Link href={problem.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 px-4 rounded-xl shadow-lg shadow-blue-500/10">
                              Solve <ExternalLink className="ml-2 w-3 h-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <AccordionContent className="px-6 pb-8 border-t border-black/[0.05] dark:border-slate-800/50 pt-8">
                      <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" /> The "Aha!" Moment
                            </h4>
                            <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-black/[0.05] dark:border-slate-800 rounded-2xl relative overflow-hidden group/card">
                              <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity">
                                <Zap className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10">
                                {problem.insight || `This problem is a quintessential example of ${pattern.name}. Focus on identifying the boundary conditions and optimizing the state transitions.`}
                              </p>
                            </div>
                          </div>

                          {problem.checklist && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Mastery Checklist</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {problem.checklist.map((item, i) => (
                                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-black/[0.05] dark:border-slate-800/50">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                      <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-500" />
                                    </div>
                                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {problem.benchmarkTime && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Focus Mode</h4>
                              <BenchmarkTimer benchmarkMinutes={problem.benchmarkTime} />
                            </div>
                          )}
                        </div>

                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                              <StickyNote className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Personal Insights Bible
                            </h4>
                            <div className="glass-panel rounded-2xl p-6 focus-within:border-blue-500/50 transition-colors">
                              <Textarea 
                                value={problemState.notes}
                                onChange={(e) => updateNotes(problem.id, e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm text-slate-600 dark:text-slate-300 focus-visible:ring-0 min-h-[200px] resize-none leading-relaxed"
                                placeholder="What was your key realization? What tripped you up? Write for your future self..."
                              />
                              <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/[0.05] dark:border-slate-800/50">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Autosaved to cloud-local</span>
                                {problemState.lastAttemptAt && (
                                  <span className="text-[10px] font-bold text-slate-500">Attempted: {new Date(problemState.lastAttemptAt).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            {problem.solutionUrl && (
                              <Link href={problem.solutionUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="outline" className="w-full border-black/[0.05] dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold h-11 rounded-xl text-black dark:text-white">
                                  Official Guide
                                </Button>
                              </Link>
                            )}
                            {problem.discussionUrl && (
                              <Link href={problem.discussionUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="outline" className="w-full border-black/[0.05] dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold h-11 rounded-xl text-black dark:text-white">
                                  Community
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-10">
            {pattern.antipatterns && (
              <div className="p-10 glass-panel rounded-3xl border-black/[0.05] dark:border-white/[0.03] bg-slate-50 dark:bg-white/[0.01]">
                <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-800" /> Antipatterns
                </h4>
                <ul className="space-y-6">
                  {pattern.antipatterns.map((antipattern, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed flex gap-4 font-medium">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                      {antipattern}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-8 glass-panel rounded-3xl">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Module Stats</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Problems</span>
                  <span className="text-xs font-black text-black dark:text-white">{pattern.problems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Est. Mastery Time</span>
                  <span className="text-xs font-black text-black dark:text-white">{pattern.problems.length * 25}m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Skill Level</span>
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">Intermediate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950/50 backdrop-blur-sm py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-slate-600 dark:text-slate-500 font-medium text-center md:text-left">
            Built for developers who value deep intuition over mindless memorization.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 dark:text-slate-700 uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <Link href="/patterns" className="hover:text-black dark:hover:text-white transition-colors">Patterns</Link>
            <Link href="/mastery" className="hover:text-black dark:hover:text-white transition-colors">Mastery</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
