"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "I finally stopped memorizing and started understanding. This roadmap is a cheat code.",
    author: "Alex Rivera",
    role: "SDE at Google",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1480&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "The pattern intuition I built here helped me clear the Meta L6 interview in 3 weeks.",
    author: "Sarah Chen",
    role: "Senior Engineer at Meta",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1480&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "The best ROI for interview prep. Mastered the 16 primitives and felt unstoppable.",
    author: "Elena Rodriguez",
    role: "Lead Dev at Airbnb",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-12 py-20">
      {/* Quote Container */}
      <div className="relative px-12">
        <span className="absolute -left-4 -top-8 text-8xl font-serif text-black/[0.03] dark:text-white/[0.03] select-none pointer-events-none">
          "
        </span>

        <p
          className={cn(
            "text-2xl md:text-4xl font-bold text-black dark:text-white text-center max-w-3xl leading-tight transition-all duration-400 ease-out tracking-tight",
            isAnimating ? "opacity-0 blur-md scale-[0.98]" : "opacity-100 blur-0 scale-100",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute -right-4 -bottom-10 text-8xl font-serif text-black/[0.03] dark:text-white/[0.03] select-none pointer-events-none">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-8 mt-4">
        {/* Role text */}
        <p
          className={cn(
            "text-[10px] text-slate-500 dark:text-slate-600 font-black tracking-[0.3em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-3">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer transition-all duration-500",
                  isActive ? "bg-black dark:bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "bg-transparent hover:bg-black/[0.05] dark:hover:bg-white/[0.05]",
                  showName ? "pr-5 pl-2 py-2" : "p-1",
                )}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-8 h-8 rounded-full object-cover transition-all duration-500",
                      isActive ? "ring-2 ring-white/10 dark:ring-black/10" : "ring-0",
                      !isActive && "grayscale opacity-50 hover:grayscale-0 hover:opacity-100",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500",
                    showName ? "grid-cols-[1fr] opacity-100 ml-3" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest whitespace-nowrap block transition-colors duration-300",
                        isActive ? "text-white dark:text-black" : "text-black dark:text-white",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
