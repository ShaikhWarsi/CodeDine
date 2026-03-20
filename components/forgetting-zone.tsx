'use client'

import React from 'react'
import { useProgress } from '@/hooks/use-progress'
import { patterns } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight, Brain, Clock, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function ForgettingZone() {
  const { progress, isLoaded } = useProgress()

  if (!isLoaded) return null

  const forgettingProblems = patterns.flatMap(p => 
    p.problems.filter(prob => {
      const state = progress[prob.id]
      if (!state?.completed || !state.lastAttemptAt) return false
      const daysSince = (Date.now() - state.lastAttemptAt) / (1000 * 60 * 60 * 24)
      return daysSince > 7 // Consider forgetting after 7 days
    }).map(prob => ({ ...prob, patternName: p.name, patternId: p.id }))
  ).sort((a, b) => (progress[a.id]?.lastAttemptAt || 0) - (progress[b.id]?.lastAttemptAt || 0))

  if (forgettingProblems.length === 0) return null

  return (
    <section className="mt-40 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <Badge variant="outline" className="px-3 py-1 border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/5 uppercase tracking-widest text-[10px] font-black">
            Retention Engine
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white">
            The <span className="text-slate-400 dark:text-slate-500 italic">Forgetting</span> Zone
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium">
            Your intuition for these patterns is fading. Review them now to maintain 100% interview readiness.
          </p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Queue Status</div>
            <div className="text-sm font-bold text-black dark:text-white">{forgettingProblems.length} Problems At Risk</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forgettingProblems.slice(0, 3).map((prob, idx) => {
          const state = progress[prob.id]
          const daysSince = state?.lastAttemptAt ? Math.floor((Date.now() - state.lastAttemptAt) / (1000 * 60 * 60 * 24)) : 0

          return (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group bg-slate-50 dark:bg-slate-900/40 border-black/[0.05] dark:border-slate-800 overflow-hidden hover:border-red-500/30 transition-all rounded-3xl h-full flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">{prob.patternName}</span>
                      <h3 className="text-lg font-bold text-black dark:text-white tracking-tight line-clamp-1">{prob.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center text-slate-400">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-black/[0.05] dark:border-white/[0.05] space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Retention</span>
                      <span className="text-red-500">{Math.max(10, 100 - (daysSince * 5))}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 transition-all duration-1000"
                        style={{ width: `${Math.max(10, 100 - (daysSince * 5))}%` }}
                      />
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-tighter">
                      Last solved {daysSince} days ago
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-500 italic line-clamp-2 font-medium">
                      {prob.insight || "Focus on the core primitive logic to restore your intuition."}
                    </p>
                  </div>

                  <Link href={`/patterns/${prob.patternId}`} className="block">
                    <Button className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-4 text-[10px] uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all">
                      Review Pattern <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
