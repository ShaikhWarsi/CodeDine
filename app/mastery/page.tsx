'use client'

import Link from 'next/link'
import { masteryLists } from '@/lib/data'
import { useProgress } from '@/hooks/use-progress'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { ChevronRight, GraduationCap, LayoutGrid, Sparkles, Zap } from 'lucide-react'

export default function MasteryPage() {
  const { getPatternProgress, isLoaded } = useProgress()

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

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Specialized Tracks
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">Mastery <span className="text-slate-400 dark:text-slate-500 italic">Lists</span></h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Deep-dive into specific domains with curated problem sets. Each track is designed to take you from foundation to professional intuition.</p>
        </div>
      </section>

      {/* Mastery Lists Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {masteryLists.map((list, idx) => {
            const progress = getPatternProgress(list.id, list.problems)
            return (
              <Link key={list.id} href={`/mastery/${list.id}`} className="group h-full">
                <div
                  className="p-10 glass-panel rounded-3xl h-full flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="space-y-10 flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                          {list.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">{list.description}</p>
                      </div>
                      <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] px-3 py-1.5 rounded-lg ml-6">
                        {isLoaded ? `${progress.completed}/${progress.total}` : '0/0'}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-[9px] uppercase tracking-widest font-black text-slate-500 dark:text-slate-600">
                        <span>Track Completion</span>
                        <span className="text-black dark:text-white">{isLoaded ? Math.round(progress.percentage) : 0}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.03] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black dark:bg-white transition-all duration-1000 ease-out"
                          style={{ width: isLoaded ? `${progress.percentage}%` : '0%' }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-12 py-8 border-t border-black/[0.05] dark:border-white/[0.05]">
                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase font-black tracking-widest">Problems</p>
                        <p className="text-2xl font-bold text-black dark:text-white tracking-tighter">{list.problemCount}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase font-black tracking-widest">Difficulty</p>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                          {list.estimatedDifficulty}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-10 flex items-center justify-between pt-8 border-t border-black/[0.05] dark:border-white/[0.05]">
                    <span className="text-[9px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors">Launch Track</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="p-16 glass-panel rounded-[2.5rem] relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-blue-500 dark:text-white" />
              The Mastery Framework
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              <MasteryStep 
                num="01"
                title="Select Domain"
                desc="Choose a track that aligns with your current target. From Data Structures to Advanced Algorithms."
              />
              <MasteryStep 
                num="02"
                title="Solve Depth-First"
                desc="Problems are arranged to build layers of intuition. Don't skip—every problem is a building block."
              />
              <MasteryStep 
                num="03"
                title="Retain Mastery"
                desc="Once completed, your insights are saved forever. Review them 24 hours before your big interview."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-slate-600 dark:text-slate-500 font-medium">
            © 2024 CodePath. Master the primitives, win the interview.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 dark:text-slate-700 uppercase tracking-[0.2em]">
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

function MasteryStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="text-xs font-black text-blue-500 font-mono tracking-widest">{num}</div>
      <h3 className="text-lg font-black text-black dark:text-white">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
  )
}
