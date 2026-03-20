'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useChat } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Building2, 
  Briefcase, 
  Trophy, 
  Loader2, 
  Sparkles, 
  Target, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  Zap,
  Send,
  User,
  Bot,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = ['Frontend Engineer', 'Backend Engineer', 'Fullstack Engineer', 'Data Scientist', 'DevOps', 'Product Manager'];
const SENIORITIES = ['Junior', 'Mid-Level', 'Senior', 'Staff/Lead'];

export default function InterviewQuestionsPage() {
  const [role, setRole] = useState(ROLES[0]);
  const [seniority, setSeniority] = useState(SENIORITIES[1]);
  const [difficulty, setDifficulty] = useState(3);
  const [company, setCompany] = useState('');
  const [isStressTest, setIsStressTest] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append } = useChat({
    api: '/api/chat',
    body: {
      role,
      seniority,
      difficulty,
      company,
      isStressTest
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStart = async () => {
    setIsStarted(true);
    setMessages([]);
    append({
      role: 'user',
      content: `I'm ready for my ${seniority} ${role} interview${company ? ` at ${company}` : ''}. Let's begin.`
    });
  };

  const handleReset = () => {
    setIsStarted(false);
    setMessages([]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/10 overflow-x-hidden flex flex-col">
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
            <Link href="/ninety-patterns" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
              90 Patterns
            </Link>
            <Link href="/interview-questions" className="text-xs font-medium text-black dark:text-white uppercase tracking-widest">
              Practice Kit
            </Link>
            <div className="border-l border-black/[0.05] dark:border-white/[0.05] pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {!isStarted ? (
        <div className="flex-1 max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center space-y-12">
          <header className="text-center space-y-6">
            <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 uppercase tracking-widest text-[10px] font-black">
              Multi-Turn AI Interviewer
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.1]">
              Simulate the <span className="text-slate-400 dark:text-slate-500 italic">Pressure</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Don't just read questions. Chat with our calibrated AI interviewer to build real-world communication skills and algorithmic depth.
            </p>
          </header>

          <Card className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/40 border-black/[0.05] dark:border-slate-800 p-8 text-left rounded-3xl glass-panel">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Select Role
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <Button
                      key={r}
                      variant={role === r ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRole(r)}
                      className={cn(
                        "text-xs font-bold rounded-xl h-10 px-4 transition-all duration-300",
                        role === r 
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-none' 
                          : 'border-black/[0.05] dark:border-slate-800 text-slate-500 hover:text-black dark:hover:text-white'
                      )}
                    >
                      {r}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-4 h-4" /> Seniority Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {SENIORITIES.map((s) => (
                    <Button
                      key={s}
                      variant={seniority === s ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSeniority(s)}
                      className={cn(
                        "text-xs font-bold rounded-xl h-10 px-4 transition-all duration-300",
                        seniority === s 
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-none' 
                          : 'border-black/[0.05] dark:border-slate-800 text-slate-500 hover:text-black dark:hover:text-white'
                      )}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Difficulty ({difficulty}/5)
                </label>
                <Slider
                  value={[difficulty]}
                  onValueChange={(val) => setDifficulty(val[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Target Company (Optional)
                </label>
                <Input
                  placeholder="e.g. Google, Meta, Amazon..."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-white dark:bg-slate-950/50 border-black/[0.05] dark:border-slate-800 rounded-xl h-12 px-4 focus:ring-black dark:focus:ring-white transition-all"
                />
              </div>

              <div className="md:col-span-2 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest">
                    <AlertTriangle className="w-3 h-3" /> Senior-Level Stress Test
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">The AI will introduce unexpected constraints and scale challenges.</p>
                </div>
                <Switch 
                  checked={isStressTest}
                  onCheckedChange={setIsStressTest}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
            </div>

            <Button 
              className="w-full mt-8 bg-black dark:bg-white text-white dark:text-black font-black py-6 text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-black/10 dark:shadow-none hover:scale-[1.01] transition-all"
              onClick={handleStart}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Begin Simulation
            </Button>
          </Card>
        </div>
      ) : (
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 py-8 overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-black/[0.05] dark:border-white/[0.05]">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-xl hover:bg-slate-100 dark:hover:bg-white/5">
                <RefreshCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
              <div className="h-4 w-px bg-black/[0.05] dark:bg-white/[0.05]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Session</span>
                <span className="text-xs font-bold text-black dark:text-white">{seniority} {role} {isStressTest && '• Stress Test'}</span>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5">
              Difficulty: {difficulty}/5
            </Badge>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-8 pr-4 scrollbar-hide"
          >
            <AnimatePresence initial={false}>
              {messages.filter(m => m.role !== 'system').map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4",
                    m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    m.role === 'user' ? 'bg-blue-500/10' : 'bg-slate-100 dark:bg-white/5'
                  )}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-blue-500" /> : <Bot className="w-4 h-4 text-slate-500" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-6 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none font-medium' 
                      : 'bg-slate-50 dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-tl-none text-slate-700 dark:text-slate-300'
                  )}>
                    <div className="whitespace-pre-wrap prose prose-invert max-w-none">
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <form 
            onSubmit={handleSubmit}
            className="mt-8 relative group"
          >
            <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex gap-2 p-2 glass-panel rounded-3xl border-black/[0.05] dark:border-white/[0.05] focus-within:border-blue-500/50 transition-all bg-white dark:bg-slate-950">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your response or ask for a hint..."
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-8 h-auto px-6"
                disabled={isLoading}
              />
              <Button 
                type="submit"
                disabled={isLoading || !input}
                className="rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black px-8 h-auto py-4 hover:scale-95 transition-transform"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="mt-3 text-[9px] text-center font-black text-slate-400 uppercase tracking-widest">
              AI Interviewer is currently calibrating for {seniority} level standards.
            </p>
          </form>
        </div>
      )}

      {/* Footer (Simplified for Chat) */}
      {!isStarted && (
        <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              © 2024 CodePath. Professional Interview Calibration.
            </p>
            <div className="flex gap-8 text-[10px] font-black text-slate-500 dark:text-slate-700 uppercase tracking-[0.2em]">
              <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
              <Link href="/patterns" className="hover:text-black dark:hover:text-white transition-colors">Patterns</Link>
            </div>
          </div>
        </footer>
      )}
    </main>
  )
}
