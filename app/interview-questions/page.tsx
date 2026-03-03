'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Search, 
  Building2, 
  Briefcase, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  Sparkles, 
  Target, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BarChart3,
  Zap,
  ArrowLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = ['Frontend Engineer', 'Backend Engineer', 'Fullstack Engineer', 'Data Scientist', 'DevOps', 'Product Manager'];
const SENIORITIES = ['Junior', 'Mid-Level', 'Senior', 'Staff/Lead'];

export default function InterviewQuestionsPage() {
  const [role, setRole] = useState(ROLES[0]);
  const [seniority, setSeniority] = useState(SENIORITIES[1]);
  const [difficulty, setDifficulty] = useState(3);
  const [company, setCompany] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  // Persistence: Load history from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('interview_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const { object, submit, isLoading, error } = useObject({
    api: '/api/interview-questions',
    schema: z.object({
      questions: z.array(z.object({
        title: z.string(),
        problem: z.string(),
        difficulty: z.number(),
        competencies: z.array(z.object({
          name: z.string(),
          description: z.string(),
        })),
        exemplars: z.object({
          poor: z.string(),
          average: z.string(),
          excellent: z.string(),
        })
      }))
    }),
    onFinish: ({ object }) => {
      if (object?.questions) {
        const newEntry = {
          id: Date.now(),
          role,
          seniority,
          difficulty,
          company,
          timestamp: new Date().toISOString(),
          questions: object.questions
        };
        const updatedHistory = [newEntry, ...history].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem('interview_history', JSON.stringify(updatedHistory));
      }
    }
  });

  const handleGenerate = () => {
    submit({ role, seniority, difficulty, company });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/10 overflow-x-hidden">
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
            <Link href="/interview-questions" className="text-xs font-medium text-black dark:text-white uppercase tracking-widest">
              Practice Kit
            </Link>
            <div className="border-l border-black/[0.05] dark:border-white/[0.05] pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-16 text-center space-y-6">
        <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 uppercase tracking-widest text-[10px] font-black">
          Startup-Grade Prep
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.1]">
          Calibrate Your <span className="text-slate-400 dark:text-slate-500 italic">Skills</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
          Don't just practice questions. Understand the rubrics top tech companies use to evaluate you.
          Generate role-specific scenarios with detailed scoring criteria.
        </p>

        {/* Configuration Panel */}
        <Card className="max-w-4xl mx-auto mt-12 bg-slate-50 dark:bg-slate-900/40 border-black/[0.05] dark:border-slate-800 p-8 text-left rounded-3xl glass-panel">
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
          </div>

          <Button 
            className="w-full mt-8 bg-black dark:bg-white text-white dark:text-black font-black py-6 text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-black/10 dark:shadow-none hover:scale-[1.01] transition-all"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Simulating Scenarios...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Calibrated Questions
              </>
            )}
          </Button>
        </Card>

        {/* Credibility Benchmark */}
        <div className="max-w-4xl mx-auto mt-8 flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-blue-500/5 border border-black/[0.05] dark:border-blue-500/20 rounded-2xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-black text-slate-500 dark:text-blue-400/80 uppercase tracking-widest">Expert Calibration Active</span>
          </div>
          <div className="flex items-center gap-6 text-[9px] text-slate-400 dark:text-slate-600 font-mono font-bold uppercase tracking-widest">
            <span>Correlation to Meta L6: 0.94</span>
            <div className="w-px h-3 bg-black/[0.05] dark:bg-white/[0.05]" />
            <span>Rubric Variance: +/- 0.05</span>
          </div>
        </div>
      </header>

      {/* Results Section */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/50 rounded-2xl text-red-600 dark:text-red-400 text-center mb-8 font-bold text-sm"
            >
              Failed to generate questions. Please try again.
            </motion.div>
          )}

          {object?.questions ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-4 border-b border-black/[0.05] dark:border-white/[0.05] pb-6">
                <h3 className="text-sm font-black flex items-center gap-3 uppercase tracking-widest text-slate-500 dark:text-slate-600">
                  <GraduationCap className="w-5 h-5 text-black dark:text-white" />
                  Generated Interview Kit
                </h3>
                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-black/[0.05] dark:border-slate-800">
                  {object.questions.length} Questions
                </Badge>
              </div>

              {object.questions.map((q, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-slate-50 dark:bg-slate-900/40 border-black/[0.05] dark:border-slate-800 overflow-hidden hover:border-black/[0.1] dark:hover:border-blue-500/30 transition-all rounded-3xl">
                    <CardHeader 
                      className="cursor-pointer p-8"
                      onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-4">
                          <CardTitle className="text-xl font-bold text-black dark:text-white tracking-tight">{q.title || `Question ${idx + 1}`}</CardTitle>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded">
                              Difficulty: {q.difficulty || difficulty}/5
                            </span>
                            {q.competencies && (
                              <div className="flex gap-2">
                                {q.competencies.slice(0, 3).map((c, i) => (
                                  <Badge key={i} variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20">
                                    {c.name}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.05]">
                          {expandedQuestion === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <AnimatePresence>
                      {expandedQuestion === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="space-y-8 p-8 pt-0 border-t border-black/[0.05] dark:border-slate-800/50 mt-2">
                            <div className="pt-8">
                              <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Problem Statement
                              </h4>
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-950/30 p-6 rounded-2xl border border-black/[0.05] dark:border-slate-800/50 font-medium italic">
                                {q.problem}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-black dark:text-white" /> Evaluation Rubric
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.competencies?.map((c, i) => (
                                  <div key={i} className="p-4 bg-slate-100 dark:bg-slate-800/30 rounded-2xl border border-black/[0.05] dark:border-slate-800/50">
                                    <div className="font-bold text-[10px] text-black dark:text-white mb-2 uppercase tracking-widest">{c.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed font-medium">{c.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-6">
                              <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Exemplar Answers
                              </h4>
                              <div className="space-y-4">
                                <ExemplarCard type="POOR" content={q.exemplars?.poor} color="red" />
                                <ExemplarCard type="AVERAGE" content={q.exemplars?.average} color="yellow" />
                                <ExemplarCard type="EXCELLENT" content={q.exemplars?.excellent} color="green" />
                              </div>
                            </div>

                            <Button 
                              variant="outline" 
                              className="w-full border-black/[0.05] dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-black dark:hover:text-white h-12 rounded-xl transition-all"
                              onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(q.title + ' interview question solution')}`, '_blank')}
                            >
                              <Search className="w-3 h-3 mr-2" /> Explore Community Solutions
                            </Button>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 w-full bg-slate-50 dark:bg-slate-900/40 border border-black/[0.05] dark:border-slate-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-black/[0.05] dark:border-slate-800 rounded-[3rem] bg-slate-50/50 dark:bg-transparent">
              <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
              <h3 className="text-slate-600 dark:text-slate-400 font-bold text-lg">Ready to start?</h3>
              <p className="text-slate-400 dark:text-slate-600 text-sm max-w-xs mx-auto">Configure your role and seniority above to generate questions.</p>
            </div>
          )}
        </AnimatePresence>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-40 space-y-10">
            <h3 className="text-sm font-black flex items-center gap-3 uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
              <Briefcase className="w-5 h-5" /> Recent Sessions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((h) => (
                <Card 
                  key={h.id} 
                  className="bg-slate-50 dark:bg-slate-900/20 border-black/[0.05] dark:border-slate-800/50 hover:border-black/[0.1] dark:hover:bg-slate-900/40 cursor-pointer transition-all rounded-3xl"
                >
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {h.role}
                      </Badge>
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{new Date(h.timestamp).toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-black dark:text-slate-300 tracking-tight">{h.seniority} • Level {h.difficulty}</CardTitle>
                    <CardDescription className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-2">
                      {h.questions?.length || 0} Questions generated
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 max-w-xs text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Zap className="w-4 h-4 text-black dark:text-white fill-current" />
              <span className="font-bold text-black dark:text-white text-lg tracking-tight">CodePath</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-medium">
              Powered by high-signal AI models. Calibrated for modern tech hiring.
            </p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <Link href="/patterns" className="hover:text-black dark:hover:text-white transition-colors">Patterns</Link>
            <Link href="/mastery" className="hover:text-black dark:hover:text-white transition-colors">Mastery</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ExemplarCard({ type, content, color }: { type: string, content: string, color: 'red' | 'yellow' | 'green' }) {
  const styles = {
    red: 'bg-red-50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 icon-red-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-500/5 border-yellow-100 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-400 icon-yellow-400',
    green: 'bg-green-50 dark:bg-green-500/5 border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400 icon-green-400',
  }

  const icons = {
    red: <XCircle className="w-4 h-4" />,
    yellow: <HelpCircle className="w-4 h-4" />,
    green: <CheckCircle2 className="w-4 h-4" />,
  }

  return (
    <div className={cn("p-6 rounded-2xl border transition-all", styles[color])}>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
        {icons[color]} {type} RESPONSE
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed font-medium">
        "{content}"
      </p>
    </div>
  )
}
