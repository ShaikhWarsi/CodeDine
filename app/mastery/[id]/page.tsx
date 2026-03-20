'use client'

import React from 'react'
import Link from 'next/link'
import { masteryLists } from '@/lib/data'
import { notFound } from 'next/navigation'
import { useProgress } from '@/hooks/use-progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { validateSubmissionUrl } from '@/lib/utils/validation'
import { ThemeToggle } from '@/components/theme-toggle'
import { CheckCircle2, AlertCircle, Zap, ArrowLeft, Trophy } from 'lucide-react'

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Foundation':
      return 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10'
    case 'Pattern Unlocker':
      return 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/10'
    case 'Brain Burner':
      return 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10'
    default:
      return 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'leetcode':
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10'
    case 'codeforces':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
    case 'codechef':
      return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
    case 'gfg':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10'
    default:
      return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50'
  }
}

export default function MasteryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const list = masteryLists.find((l) => l.id === id)
  const { toggleProblem, isCompleted, getPatternProgress, needsReview, markReviewed, updateProblemProgress, progressMap, isLoaded } = useProgress()

  if (!list) {
    notFound()
  }

  const progress = getPatternProgress(list.id, list.problems)

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
            <Link href="/mastery" className="text-xs font-medium text-black dark:text-white uppercase tracking-widest">
              Mastery
            </Link>
            <Link href="/ninety-patterns" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
              90 Patterns
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
              <Link href="/mastery" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em]">
                <ArrowLeft className="w-3 h-3" /> Back to mastery
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white">{list.title}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">{list.description}</p>
            </div>
            
            <div className="flex flex-col gap-6 p-8 glass-panel rounded-3xl min-w-[300px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">Track Progress</span>
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

      {/* Problems List */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-32">
        <div className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4 border-none">
            {list.problems.map((problem, idx) => (
              <AccordionItem 
                key={problem.id} 
                value={problem.id}
                className={`border border-black/[0.05] dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all duration-200 px-6 ${isCompleted(problem.id) ? 'border-blue-500/30 dark:border-blue-500/50 opacity-80' : ''}`}
              >
                <div className="flex items-center gap-4 py-6">
                  <Checkbox 
                    checked={isCompleted(problem.id)}
                    onCheckedChange={() => toggleProblem(problem.id)}
                    className="w-5 h-5 border-slate-300 dark:border-slate-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-mono">{String(idx + 1).padStart(2, '0')}</span>
                        <h3 className={`text-lg font-bold tracking-tight ${isCompleted(problem.id) ? 'line-through text-slate-400 dark:text-slate-500' : 'text-black dark:text-slate-200'}`}>
                          {problem.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${getPlatformColor(problem.platform)}`}>
                          {problem.platform}
                        </span>
                        <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        {problem.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AccordionTrigger className="hover:no-underline h-9 px-4 rounded-xl bg-slate-200 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-slate-200 transition-colors border border-black/[0.05] dark:border-white/[0.05]">
                        <span className="text-xs font-bold mr-2">Insights</span>
                      </AccordionTrigger>
                      <Link href={problem.url} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 px-6 rounded-xl shadow-lg shadow-blue-500/10">
                          Solve <ArrowLeft className="ml-2 w-3 h-3 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <AccordionContent className="pb-8 border-t border-black/[0.05] dark:border-slate-800/50 pt-8">
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="p-8 bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-2xl h-full relative overflow-hidden group/insight">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover/insight:opacity-[0.08] transition-opacity">
                          <Zap className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> Pattern Insight
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10 font-medium italic">
                          "{problem.insight || "This problem is selected to reinforce your mastery of the domain. Focus on identifying the core pattern and optimizing your solution."}"
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Verify & Track</h4>
                          <div className="p-6 border border-black/[0.05] dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950/50 space-y-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] text-slate-500 dark:text-slate-600 uppercase font-black tracking-widest">Submission URL</label>
                                {progressMap[problem.id]?.submissionUrl && (
                                  validateSubmissionUrl(progressMap[problem.id].submissionUrl!, problem.platform) ? (
                                    <span className="flex items-center gap-1 text-[9px] text-green-600 dark:text-green-400 font-black uppercase tracking-widest bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded border border-green-100 dark:border-green-500/20">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-[9px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-500/20">
                                      <AlertCircle className="w-2.5 h-2.5" /> Invalid Link
                                    </span>
                                  )
                                )}
                              </div>
                              <input 
                                type="text"
                                value={progressMap[problem.id]?.submissionUrl || ''}
                                onChange={(e) => updateProblemProgress(problem.id, { submissionUrl: e.target.value })}
                                className={`w-full bg-slate-50 dark:bg-slate-900 border border-black/[0.05] dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-300 focus:border-blue-500 outline-none transition-all ${
                                  progressMap[problem.id]?.submissionUrl ? (
                                    validateSubmissionUrl(progressMap[problem.id].submissionUrl!, problem.platform) ? 'border-green-500/30' : 'border-amber-500/30'
                                  ) : ''
                                }`}
                                placeholder="e.g. leetcode.com/submissions/detail/..."
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[10px] text-slate-500 dark:text-slate-600 uppercase font-black tracking-widest">Time Spent (Minutes)</label>
                              <input 
                                type="number"
                                value={progressMap[problem.id]?.timeSpent || ''}
                                onChange={(e) => updateProblemProgress(problem.id, { timeSpent: parseInt(e.target.value) })}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-black/[0.05] dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-300 focus:border-blue-500 outline-none transition-all"
                                placeholder="e.g. 25"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 max-w-xs text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Zap className="w-4 h-4 text-black dark:text-white fill-current" />
              <span className="font-bold text-black dark:text-white text-lg tracking-tight">CodePath</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-medium">
              Master the patterns, win the interview. Professional tracks for high-growth engineers.
            </p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <Link href="/patterns" className="hover:text-black dark:hover:text-white transition-colors">Patterns</Link>
            <Link href="/mastery" className="hover:text-black dark:hover:text-white transition-colors">Mastery</Link>
            <Link href="/ninety-patterns" className="hover:text-black dark:hover:text-white transition-colors">90 Patterns</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
