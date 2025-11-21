'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  preview?: boolean
}

export default function MarkdownEditor({
  value,
  onChange,
  preview = false,
}: MarkdownEditorProps) {
  if (preview) {
    return (
      <div className="border border-gray-300 rounded-lg p-6 min-h-[400px] bg-white">
        <div className="markdown-content prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-100 text-orange-600 px-1 rounded" {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {value || '*Start writing your post...*'}
          </ReactMarkdown>
        </div>
      </div>
    )
  }

  return (
    <div className="border-0">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing..."
        className="w-full px-4 py-3 min-h-[500px] bg-white text-gray-900 border-0 focus:outline-none resize-none placeholder-gray-400 text-lg"
        style={{ fontFamily: 'inherit' }}
      />
    </div>
  )
}

