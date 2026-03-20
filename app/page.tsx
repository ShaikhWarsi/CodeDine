import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MatrixText } from '@/components/ui/matrix-text'
import { Testimonials } from '@/components/ui/unique-testimonial'
import { ThemeToggle } from '@/components/theme-toggle'
import { ForgettingZone } from '@/components/forgetting-zone'
import { ArrowRight, Code2, Layers, LineChart, ShieldCheck, Sparkles, Zap, Brain, Target, Clock, GraduationCap, CheckCircle2, XCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/10 overflow-x-hidden">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] blur-[120px] rounded-full" />
      </div>

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

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-40">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] animate-fade-in-up">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>The Minimalist Roadmap for 2024</span>
          </div>
          
          <div className="space-y-4 animate-fade-in-up [animation-delay:100ms]">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-black dark:text-white">
              Pass the interview by solving
            </h1>
            <MatrixText 
              text="80% FEWER PROBLEMS" 
              className="text-gradient min-h-0 py-2 h-auto"
              initialDelay={800}
            />
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms]">
            Stop the mindless grind. Master the 16 core primitives that unlock algorithmic intuition. Your roadmap from "Stuck" to "Senior".
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up [animation-delay:300ms]">
            <Link href="/patterns">
              <Button size="lg" className="btn-primary px-10 h-14 rounded-full shadow-lg shadow-black/5 dark:shadow-none">
                Start Masterclass <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/mastery">
              <Button size="lg" variant="ghost" className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white px-10 h-14 rounded-full text-sm font-bold transition-all duration-300">
                View Mastery Tracks
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-40">
          <FeatureCard 
            icon={<Code2 className="w-5 h-5 text-black dark:text-white" />}
            title="16 Core Primitives"
            description="Comprehensive coverage of sliding window, DP, graphs, and advanced data structures. Master the foundation, not the problem."
            delay="400ms"
          />
          <FeatureCard 
            icon={<Layers className="w-5 h-5 text-black dark:text-white" />}
            title="Pattern Mastery"
            description="Follow curated tracks designed to build expertise in specific domains. Track your progress and save your 'Aha!' moments."
            delay="500ms"
          />
          <FeatureCard 
            icon={<LineChart className="w-5 h-5 text-black dark:text-white" />}
            title="Benchmark Testing"
            description="Integrated timers and senior-level benchmarks ensure you aren't just correct—you're ready for the pressure."
            delay="600ms"
          />
        </div>

        {/* Spaced Repetition Forgetting Zone */}
        <ForgettingZone />

        {/* The Problem Section */}
        <section className="mt-60 max-w-5xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">The "LeetCode" <span className="text-slate-400 dark:text-slate-500 italic">Paradox</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Why do developers solve 300+ problems and still fail the interview? Because memorization is not mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 glass-panel rounded-3xl space-y-8">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <XCircle className="w-5 h-5 opacity-70" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Traditional Way</h3>
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 text-sm text-slate-700 dark:text-slate-400 font-medium">
                  <span className="text-slate-400 dark:text-slate-600">01</span>
                  "Grinding" random problems without a system.
                </li>
                <li className="flex gap-4 text-sm text-slate-700 dark:text-slate-400 font-medium">
                  <span className="text-slate-400 dark:text-slate-600">02</span>
                  Focusing on the code, not the intuition.
                </li>
                <li className="flex gap-4 text-sm text-slate-700 dark:text-slate-400 font-medium">
                  <span className="text-slate-400 dark:text-slate-600">03</span>
                  Forget everything 48 hours later.
                </li>
                <li className="flex gap-4 text-sm text-slate-700 dark:text-slate-400 font-medium">
                  <span className="text-slate-400 dark:text-slate-600">04</span>
                  Panicking when a slightly different variant appears.
                </li>
              </ul>
            </div>

            <div className="p-10 glass-panel rounded-3xl border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.01] space-y-8">
              <div className="flex items-center gap-3 text-black dark:text-white">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">The CodePath Way</h3>
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <span className="text-blue-600 dark:text-blue-400/70">01</span>
                  Mastering 16 patterns that solve 90% of problems.
                </li>
                <li className="flex gap-4 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <span className="text-blue-600 dark:text-blue-400/70">02</span>
                  Internalizing the "Aha!" moment for every primitive.
                </li>
                <li className="flex gap-4 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <span className="text-blue-600 dark:text-blue-400/70">03</span>
                  Persistent progress tracking and review cycles.
                </li>
                <li className="flex gap-4 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <span className="text-blue-600 dark:text-blue-400/70">04</span>
                  Benchmark timers to simulate real interview pressure.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="mt-60 max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">The 3-Step <span className="text-slate-400 dark:text-slate-500">Mastery Loop</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard 
              num="01"
              icon={<Brain className="w-6 h-6 text-black dark:text-white" />}
              title="Primitive Selection"
              desc="We've distilled 5,000+ problems into 16 core patterns. Start with the Foundation and move to Brain Burners."
            />
            <ProcessCard 
              num="02"
              icon={<Target className="w-6 h-6 text-black dark:text-white" />}
              title="Intuition Building"
              desc="Solve curated problems while tracking your 'Aha!' moments. Don't just find the answer—find the reason."
            />
            <ProcessCard 
              num="03"
              icon={<Clock className="w-6 h-6 text-black dark:text-white" />}
              title="Benchmark Testing"
              desc="Run against senior-level benchmarks. If you can't solve it in 20 mins, you don't know the pattern yet."
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <div className="mt-60 animate-fade-in-up [animation-delay:700ms]">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-xs font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.3em]">Success Stories</h2>
          </div>
          <Testimonials />
        </div>

        {/* Student Section */}
        <section className="mt-60 max-w-7xl mx-auto px-6">
          <div className="p-16 md:p-24 glass-panel rounded-[2rem] border-black/[0.05] dark:border-white/[0.05] relative overflow-hidden group">
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] text-slate-600 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  For College Students
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-black dark:text-white">
                  Stop the placement <br />
                  <span className="text-slate-400 dark:text-slate-500 italic">Panic.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                  We built this for the student who has 4 weeks before their first big interview and doesn't know where to start. 
                </p>
                <div className="grid grid-cols-2 gap-10 pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
                  <div className="space-y-3">
                    <h4 className="text-black dark:text-white font-bold text-sm uppercase tracking-widest">Foundation</h4>
                    <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed">We teach the 'Why' before the 'How'. Perfect for clearing OA rounds.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-black dark:text-white font-bold text-sm uppercase tracking-widest">Zero Fluff</h4>
                    <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed">Every problem in our 16 patterns is a high-frequency favorite.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-10 bg-slate-50/50 dark:bg-white/[0.01] border border-black/[0.05] dark:border-white/[0.05] rounded-[2rem] space-y-8">
                <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">The Savings</h3>
                <div className="space-y-6">
                  <SavingItem label="Prep Time Saved" value="120+ Hours" />
                  <SavingItem label="Brain Fog Reduced" value="85%" />
                  <SavingItem label="Interview Confidence" value="X2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-60 pb-40 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white">Ready to master the <span className="text-slate-400 dark:text-slate-500 italic">primitives?</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Join 10,000+ developers who stopped grinding and started understanding.
            </p>
          </div>
          <Link href="/patterns">
            <Button size="lg" className="btn-primary px-16 h-16 text-lg rounded-full shadow-xl shadow-black/10 dark:shadow-none">
              Get Started Now <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </section>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 py-20 border-t border-black/[0.05] dark:border-white/[0.05]">
          <StatItem label="Patterns" value="16" />
          <StatItem label="Problems" value="150+" />
          <StatItem label="Success Rate" value="94%" />
          <StatItem label="Tracks" value="4" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 max-w-xs text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Zap className="w-4 h-4 text-black dark:text-white fill-current" />
              <span className="font-bold text-black dark:text-white text-lg tracking-tight">CodePath</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-medium">
              Built for developers who value deep intuition over mindless memorization. Master the patterns, win the interview.
            </p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em]">
            <Link href="/patterns" className="hover:text-black dark:hover:text-white transition-colors">Patterns</Link>
            <Link href="/mastery" className="hover:text-black dark:hover:text-white transition-colors">Mastery</Link>
            <Link href="/ninety-patterns" className="hover:text-black dark:hover:text-white transition-colors">90 Patterns</Link>
            <Link href="/interview-questions" className="hover:text-black dark:hover:text-white transition-colors">Practice</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <div className={`group p-10 glass-panel rounded-3xl animate-fade-in-up`} style={{ animationDelay: delay }}>
      <div className="w-10 h-10 bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] rounded-xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-slate-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-4 text-black dark:text-white tracking-tight">{title}</h3>
      <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed font-medium">{description}</p>
    </div>
  )
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center space-y-2">
      <div className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tighter">{value}</div>
      <p className="text-slate-500 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
    </div>
  )
}

function ProcessCard({ num, icon, title, desc }: { num: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 glass-panel rounded-3xl space-y-8 relative group transition-all duration-500 hover:scale-[1.01]">
      <div className="text-[10px] font-black text-slate-400 dark:text-slate-700 font-mono tracking-widest uppercase">
        Step {num}
      </div>
      <div className="w-12 h-12 bg-slate-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] rounded-xl flex items-center justify-center group-hover:bg-slate-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-black dark:text-white tracking-tight">{title}</h3>
        <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}

function SavingItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white dark:bg-white/[0.01] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl transition-colors hover:border-black/[0.1] dark:hover:border-white/[0.1]">
      <span className="text-slate-500 dark:text-slate-600 font-bold text-[10px] uppercase tracking-widest">{label}</span>
      <span className="text-lg font-bold text-black dark:text-white tracking-tight">{value}</span>
    </div>
  )
}
