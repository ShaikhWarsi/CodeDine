'use client'

import Link from 'next/link'
import { patterns } from '@/lib/data'
import { useProgress } from '@/hooks/use-progress'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { PatternLinker } from '@/components/pattern-linker'
import { ArrowRight, BarChart3, ChevronRight, GraduationCap, LayoutGrid, Sparkles, Zap, Link2 } from 'lucide-react'

export default function PatternsPage() {
  const { getPatternProgress, progress, isLoaded } = useProgress()

  const getCoachRecommendation = () => {
    if (!isLoaded) {
      return {
        title: "Loading Mastery",
        message: "Synchronizing your progress with local storage...",
        nextMilestone: "---",
        icon: <Zap className="w-4 h-4 text-slate-600 animate-pulse" />
      }
    }

    const completedCount = Object.keys(progress || {}).length
    const reviewRequired = Object.keys(progress || {}).filter(id => {
      const state = progress[id];
      if (!state?.completed || !state.lastAttemptAt) return false;
      const daysSince = (Date.now() - state.lastAttemptAt) / (1000 * 60 * 60 * 24);
      return daysSince > 7;
    })
    
    if (completedCount === 0) {
      return {
        title: "Initial Strategy",
        message: "We recommend starting with 'Sliding Window'. It builds the core mental models for 90% of array problems.",
        nextMilestone: "3 Problems",
        icon: <Zap className="w-4 h-4 text-black dark:text-white" />
      }
    }

    if (reviewRequired.length > 0) {
      return {
        title: "Retention Warning",
        message: `You have ${reviewRequired.length} problems entering the 'forgetting zone'. Review them now to lock in the intuition.`,
        nextMilestone: "Clear Queue",
        icon: <BarChart3 className="w-4 h-4 text-black dark:text-white" />
      }
    }

    const lowProgressPattern = patterns.find(p => {
      const prog = getPatternProgress(p.id, p.problems)
      return prog.percentage < 100
    })

    if (lowProgressPattern) {
      return {
        title: "Next Module",
        message: `Your retention is solid. Dive into '${lowProgressPattern.name}' to expand your toolkit.`,
        nextMilestone: "Unlock Pattern",
        icon: <Sparkles className="w-4 h-4 text-black dark:text-white" />
      }
    }

    return {
      title: "Mastery Reached",
      message: "You've covered the core patterns! Maintain your edge by checking the review queue weekly.",
      nextMilestone: "Maintain 100%",
      icon: <GraduationCap className="w-4 h-4 text-black dark:text-white" />
    }
  }

  const coach = getCoachRecommendation()

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
            <Link href="/patterns" className="text-xs font-medium text-black dark:text-white uppercase tracking-widest">
              Patterns
            </Link>
            <Link href="/mastery" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
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

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] text-slate-600 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Curriculum
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">DSA <span className="text-slate-400 dark:text-slate-500 italic">Patterns</span></h1>
              <p className="text-lg text-slate-600 dark:text-slate-500 max-w-xl leading-relaxed font-medium">Master the 16 essential primitives that unlock algorithmic intuition. Your progress is synced to local storage.</p>
            </div>

            {/* Mastery Analytics Recommendation */}
            <div className="p-10 glass-panel rounded-3xl relative overflow-hidden group border-black/[0.05] dark:border-white/[0.05]">
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] rounded-xl flex items-center justify-center">
                      {coach.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">{coach.title}</h3>
                      <p className="text-sm font-bold text-black dark:text-white uppercase tracking-tighter">Next Milestone: {coach.nextMilestone}</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-400 text-lg leading-relaxed max-w-2xl font-medium italic">
                  "{coach.message}"
                </p>
              </div>
            </div>
          </div>
          
          {/* Mastery Heatmap / Summary */}
          <div className="w-full lg:w-96 p-10 glass-panel rounded-3xl border-black/[0.05] dark:border-white/[0.05]">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">Mastery Heatmap</h3>
              <BarChart3 className="w-4 h-4 text-slate-300 dark:text-slate-800" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {patterns.map((pattern) => {
                const progress = getPatternProgress(pattern.id, pattern.problems)
                const intensity = !isLoaded || progress.percentage === 0 ? 'bg-slate-100 dark:bg-white/[0.02] border-black/[0.05] dark:border-white/[0.05]' : 
                                 progress.percentage < 30 ? 'bg-blue-500/20 border-blue-500/30' :
                                 progress.percentage < 70 ? 'bg-blue-500/40 border-blue-500/50' :
                                 'bg-slate-900 dark:bg-white border-black dark:border-white shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                
                return (
                  <div key={pattern.id} className="group relative">
                    <div className={`aspect-square rounded-md border ${intensity} transition-all duration-500`} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl">
                      {pattern.name}: {Math.round(progress.percentage)}%
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-10 flex items-center justify-between text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-widest">
              <span>Foundation</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-sm bg-slate-100 dark:bg-white/[0.02]" />
                <div className="w-2 h-2 rounded-sm bg-blue-500/20" />
                <div className="w-2 h-2 rounded-sm bg-blue-500/40" />
                <div className="w-2 h-2 rounded-sm bg-slate-900 dark:bg-white" />
              </div>
              <span>Mastery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Linker Tool */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <Link2 className="w-4 h-4 text-slate-300 dark:text-slate-700" />
          <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.3em]">Pattern Linker (Alpha)</h2>
        </div>
        <PatternLinker />
      </section>

      {/* Patterns Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-3 mb-12 border-b border-black/[0.05] dark:border-white/[0.05] pb-6">
          <LayoutGrid className="w-4 h-4 text-slate-300 dark:text-slate-700" />
          <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.3em]">Mastery Modules</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {patterns.map((pattern, idx) => {
            const progress = getPatternProgress(pattern.id, pattern.problems)
            return (
              <Link key={pattern.id} href={`/patterns/${pattern.id}`}>
                <div 
                  className="group p-10 glass-panel rounded-3xl cursor-pointer h-full animate-fade-in-up border-black/[0.05] dark:border-white/[0.05]"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="space-y-8">
                    {/* Pattern Icon & Progress */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] group-hover:bg-slate-950 dark:group-hover:bg-white transition-all duration-500 flex items-center justify-center">
                        <span className="text-xl group-hover:scale-110 transition-transform group-hover:text-white dark:group-hover:text-black grayscale group-hover:grayscale-0">
                          {pattern.id === 'sliding-window' && '→'}
                          {pattern.id === 'two-pointers' && '⇄'}
                          {pattern.id === 'hashing' && '#'}
                          {pattern.id === 'binary-search' && '⬇'}
                          {pattern.id === 'recursion-backtracking' && '↻'}
                          {pattern.id === 'dynamic-programming' && '◇'}
                          {pattern.id === 'graphs' && '◯'}
                          {pattern.id === 'greedy' && '✓'}
                          {pattern.id === 'linked-lists' && '🔗'}
                          {pattern.id === 'stacks-queues' && '🥞'}
                          {pattern.id === 'trees-heaps' && '🌲'}
                          {pattern.id === 'sorting' && '📶'}
                          {pattern.id === 'matrices' && '▦'}
                          {pattern.id === 'array-techniques' && '🔢'}
                          {pattern.id === 'string-algorithms' && '🔤'}
                          {pattern.id === 'bit-manipulation' && '01'}
                        </span>
                      </div>
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-700 font-mono tracking-widest">
                        {isLoaded ? `${progress.completed}/${progress.total}` : '0/0'}
                      </div>
                    </div>

                    {/* Pattern Name */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-black dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {pattern.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">{pattern.description}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.03] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 dark:bg-white transition-all duration-1000 ease-out"
                          style={{ width: isLoaded ? `${progress.percentage}%` : '0%' }}
                        />
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-8 border-t border-black/[0.05] dark:border-white/[0.05]">
                      <span className="text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors">Launch Module</span>
                      <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-800 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-xs text-slate-500 dark:text-slate-700 font-bold uppercase tracking-widest">
            © 2024 CodePath. Master the primitives.
          </p>
          <div className="flex gap-12 text-[10px] font-bold text-slate-500 dark:text-slate-700 uppercase tracking-[0.2em]">
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
