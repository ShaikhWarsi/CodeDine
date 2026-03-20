'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Link2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function PatternLinker() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!url) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/pattern-linker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError('Failed to analyze the problem. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex gap-2 p-2 glass-panel rounded-2xl border-black/[0.05] dark:border-white/[0.05] focus-within:border-blue-500/50 transition-colors">
          <div className="flex items-center pl-4 text-slate-400">
            <Link2 className="w-4 h-4" />
          </div>
          <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste LeetCode problem URL (e.g., https://leetcode.com/problems/two-sum/)"
            className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-6 h-auto"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !url}
            className="rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold px-8 h-auto py-4 hover:opacity-90 transition-opacity"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Identify Pattern'}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-8 border-blue-500/20 bg-blue-500/[0.02] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <Sparkles className="w-32 h-32 text-blue-500" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5">
                      {result.difficulty}
                    </Badge>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primitive Identified</span>
                  </div>
                  <h3 className="text-3xl font-black text-black dark:text-white tracking-tight flex items-center gap-3">
                    {result.patternName} <ArrowRight className="w-6 h-6 text-blue-500" />
                  </h3>
                </div>
                
                <Button variant="outline" className="rounded-xl border-black/[0.05] dark:border-white/[0.05] font-bold text-xs" asChild>
                  <a href={`/patterns/${result.patternId}`}>Study Module</a>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architect's Reasoning</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {result.explanation}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">The "Aha!" Moment</h4>
                  <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-black/[0.02] dark:border-white/[0.02] flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-black dark:text-slate-200 font-bold leading-relaxed italic">
                      "{result.keyInsight}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
