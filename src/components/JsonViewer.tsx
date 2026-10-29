import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Download, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';

interface JsonViewerProps {
  jsonString: string;
  formatTitle: string;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: () => void;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  jsonString,
  formatTitle,
  onCopy,
  isCopied,
  onDownload,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate stats
  const stats = useMemo(() => {
    const bytes = new Blob([jsonString]).size;
    const sizeStr = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;
    const lines = jsonString.split('\n').length;
    let valid = true;
    try {
      JSON.parse(jsonString);
    } catch {
      valid = false;
    }
    return { sizeStr, lines, valid };
  }, [jsonString]);

  // Syntax highlighting helper for formatted JSON
  const highlightedLines = useMemo(() => {
    const lines = jsonString.split('\n');
    return lines.map((line, idx) => {
      // Highlight search match
      const isSearchMatch = searchTerm && line.toLowerCase().includes(searchTerm.toLowerCase());

      // Tokenize line
      const coloredLine = line.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        (match) => {
          let cls = 'text-amber-300'; // number
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-sky-300 font-semibold'; // key
            } else {
              cls = 'text-emerald-300'; // string
            }
          } else if (/true|false/.test(match)) {
            cls = 'text-purple-400 font-medium'; // boolean
          } else if (/null/.test(match)) {
            cls = 'text-rose-400 italic'; // null
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );

      return {
        number: idx + 1,
        content: coloredLine,
        isSearchMatch,
      };
    });
  }, [jsonString, searchTerm]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <FileJson className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white tracking-wide">
                {formatTitle}
              </span>
              {stats.valid ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Valid JSON
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  <AlertCircle className="w-3 h-3" /> Syntax Error
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {stats.lines} lines · {stats.sizeStr} · UTF-8
            </p>
          </div>
        </div>

        {/* Search in JSON */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter keys or values..."
              className="pl-8 pr-3 py-1 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-44 sm:w-56"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <button
            onClick={onCopy}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition flex items-center gap-1.5 ${
              isCopied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onDownload}
            className="p-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Download JSON File"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed bg-[#0b0f19]">
        <div className="min-w-full inline-block">
          {highlightedLines.map((line) => (
            <div
              key={line.number}
              className={`flex items-start hover:bg-slate-800/40 px-2 py-0.5 rounded transition ${
                line.isSearchMatch ? 'bg-sky-500/20 ring-1 ring-sky-500/50' : ''
              }`}
            >
              <span className="w-10 text-right pr-4 text-slate-600 select-none text-xs tabular-nums flex-shrink-0 pt-0.5">
                {line.number}
              </span>
              <span
                className="text-slate-200 whitespace-pre break-all flex-1"
                dangerouslySetInnerHTML={{ __html: line.content }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-1.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Ready for import in React, Next.js, Vue, Python or REST APIs</span>
        <span>JSON UTF-8</span>
      </div>

    </div>
  );
};
