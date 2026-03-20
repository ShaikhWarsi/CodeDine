'use client'

import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css' // Or any other theme

interface AhaCodeEditorProps {
  code: string
  onChange: (code: string) => void
  placeholder?: string
}

export function AhaCodeEditor({ code, onChange, placeholder }: AhaCodeEditorProps) {
  return (
    <div className="relative rounded-xl border border-black/[0.05] dark:border-white/[0.05] bg-slate-950 overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05] bg-white/[0.02]">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Aha! Logic</span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/20" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
          <div className="w-2 h-2 rounded-full bg-green-500/20" />
        </div>
      </div>
      <Editor
        value={code}
        onValueChange={onChange}
        highlight={(code) => highlight(code, languages.typescript, 'typescript')}
        padding={20}
        placeholder={placeholder || "// Paste the core logic here..."}
        className="min-h-[150px] focus:outline-none"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 13,
          backgroundColor: 'transparent',
        }}
      />
    </div>
  )
}
