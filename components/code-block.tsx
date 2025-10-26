"use client";
import { useState } from 'react'

interface CodeBlockProps {
    code: string
    lang?: string
    showLineNumbers?: boolean
    initialCollapsedLines?: number
}

export default function CodeBlock({
    code,
    lang = 'text',
    showLineNumbers = true,
    initialCollapsedLines = 40
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const [wrap, setWrap] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            // ignore
        }
    }

    // For now, let's use a simpler approach with direct pattern matching per line
    const highlightLine = (line: string, language: string) => {
        if (!language || language === 'text') {
            return line
        }

        // Apply simple regex highlighting
        let highlighted = line

        if (language === 'java') {
            // Keywords
            highlighted = highlighted.replace(
                /\b(public|private|protected|static|final|class|interface|extends|implements|import|package|void|int|String|boolean|if|else|for|while|try|catch|finally|return|new|this|super|null|true|false|AppiumDriver|AndroidDriver|IOSDriver|DesiredCapabilities|URL|WebElement)\b/g,
                '<keyword>$1</keyword>'
            )
            // Strings
            highlighted = highlighted.replace(/"([^"]*)"/g, '<string>"$1"</string>')
            // Comments
            highlighted = highlighted.replace(/\/\/(.*)$/, '<comment>//$1</comment>')
            // Numbers
            highlighted = highlighted.replace(/\b(\d+)\b/g, '<number>$1</number>')
        } else if (language === 'bash') {
            // Comments
            highlighted = highlighted.replace(/^(#.*)$/, '<comment>$1</comment>')
            // Commands
            highlighted = highlighted.replace(
                /\b(npm|yarn|appium|cd|ls|mkdir|rm|cp|mv|grep|find|chmod|chown|sudo|git|docker|curl|wget|echo|cat|tail|head|ps|kill|which|where|export|source|install|driver|plugin)\b/g,
                '<command>$1</command>'
            )
            // Flags
            highlighted = highlighted.replace(/(-+[a-zA-Z-]+)/g, '<flag>$1</flag>')
            // Strings
            highlighted = highlighted.replace(/"([^"]*)"/g, '<string>"$1"</string>')
        } else if (language === 'json') {
            // Keys
            highlighted = highlighted.replace(/"([^"]*)":/g, '<key>"$1"</key>:')
            // String values
            highlighted = highlighted.replace(/:\s*"([^"]*)"/g, ': <string>"$1"</string>')
            // Booleans
            highlighted = highlighted.replace(/:\s*(true|false|null)/g, ': <boolean>$1</boolean>')
            // Numbers
            highlighted = highlighted.replace(/:\s*(\d+\.?\d*)/g, ': <number>$1</number>')
        }

        return highlighted
    }

    // Check if content contains ASCII art/diagrams
    const hasBoxDrawing = /[┌┐└┘│─┬┴┼├┤╔╗╚╝║═╦╩╬╠╣]/.test(code)
    const isAsciiArt = hasBoxDrawing || /[\+\-\|]{3,}/.test(code)

    const renderHighlightedLine = (line: string) => {
        // For ASCII art, return line as-is without highlighting
        if (isAsciiArt || lang === 'text') {
            return line
        }

        const colorClasses: Record<string, string> = {
            keyword: 'text-pink-400 font-semibold',
            string: 'text-green-400',
            comment: 'text-slate-400 italic',
            number: 'text-orange-400',
            method: 'text-cyan-400',
            command: 'text-cyan-400 font-semibold',
            flag: 'text-yellow-400',
            key: 'text-cyan-400 font-semibold',
            boolean: 'text-pink-400',
            text: 'text-purple-100'
        }

        const parts = []
        let remaining = line
        let key = 0

        // Split by our custom tags and render with appropriate styles
        const tagPattern = /<(keyword|string|comment|number|command|flag|key|boolean)>(.*?)<\/\1>/g
        let lastIndex = 0
        let match

        while ((match = tagPattern.exec(line)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(
                    <span key={key++}>
                        {line.slice(lastIndex, match.index)}
                    </span>
                )
            }

            // Add the styled content
            const [, type, content] = match
            parts.push(
                <span key={key++} className={colorClasses[type] || ''}>
                    {content}
                </span>
            )
            lastIndex = match.index + match[0].length
        }

        // Add remaining text
        if (lastIndex < line.length) {
            parts.push(
                <span key={key++}>
                    {line.slice(lastIndex)}
                </span>
            )
        }

        return parts.length > 0 ? parts : line
    }

    const lines = code.split('\n')
    const linesCount = lines.length
    const shouldCollapse = linesCount > initialCollapsedLines && !expanded
    const displayLines = shouldCollapse ? lines.slice(0, initialCollapsedLines) : lines

    return (
        <div className="group relative border border-purple-500/20 rounded-lg bg-gradient-to-br from-purple-950/60 via-slate-900/70 to-pink-950/60 backdrop-blur shadow-sm overflow-hidden">
            <div className="absolute right-2 top-2 flex items-center gap-1 z-10">
                {lang && lang !== 'text' && (
                    <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-md bg-slate-900/80 border border-purple-500/30 text-purple-200">
                        {lang}
                    </span>
                )}
                <button
                    onClick={() => setWrap((w: boolean) => !w)}
                    aria-label="Toggle line wrap"
                    className="text-[11px] font-medium px-2 py-1 rounded-md border border-purple-500/30 bg-slate-900/80 hover:bg-slate-800/90 text-purple-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                >
                    {wrap ? 'No-wrap' : 'Wrap'}
                </button>
                <button
                    onClick={onCopy}
                    aria-label="Copy code"
                    className="text-[11px] font-medium px-2 py-1 rounded-md border border-purple-500/30 bg-slate-900/80 hover:bg-slate-800/90 text-purple-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            
            <div className="relative">
                <pre
                    className={`text-[12.5px] sm:text-[13px] leading-relaxed font-mono p-4 pt-12 ${
                        wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
                    } scrollbar-thin overflow-auto bg-gradient-to-br from-purple-950/40 via-slate-900/50 to-pink-950/40 text-purple-100`}
                    style={{ maxHeight: shouldCollapse ? '320px' : undefined }}
                >
                    {isAsciiArt ? (
                        // ASCII art rendering with explicit character spacing
                        <div style={{ 
                            whiteSpace: 'pre', 
                            fontFamily: 'monospace', 
                            letterSpacing: '0px',
                            fontSize: '13px',
                            lineHeight: '1.2'
                        }}>
                            {displayLines.join('\n')}
                        </div>
                    ) : (
                        // Regular code rendering with line numbers
                        displayLines.map((line, i) => (
                            <div key={i} className="table w-full">
                                {showLineNumbers && (
                                    <span className="table-cell select-none pr-4 text-purple-300/60 opacity-70 text-right w-[2ch]">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="table-cell">
                                    {renderHighlightedLine(highlightLine(line, lang))}
                                </span>
                            </div>
                        ))
                    )}
                </pre>
                
                {shouldCollapse && (
                    <>
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                            <button
                                onClick={() => setExpanded(true)}
                                className="text-[11px] font-medium px-2 py-1 rounded-md border border-purple-500/30 bg-slate-900/90 hover:bg-slate-800 text-purple-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                                aria-label="Expand code block"
                            >
                                Expand
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-pink-500/10 to-purple-500/10" />
        </div>
    )
}
