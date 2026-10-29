import React from 'react';
import { RotateCcw, Clipboard, Check, FileCode, Play, Sparkles } from 'lucide-react';

interface HtmlEditorProps {
  htmlCode: string;
  setHtmlCode: (code: string) => void;
  onReset: () => void;
  onReparse: () => void;
}

export const HtmlEditor: React.FC<HtmlEditorProps> = ({
  htmlCode,
  setHtmlCode,
  onReset,
  onReparse,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = htmlCode.split('\n').length;
  const chars = htmlCode.length;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white tracking-wide">
                Source HTML Document
              </span>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Bootstrap 5 Portfolio
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lines} lines · {chars.toLocaleString()} characters · Live DOM Parser
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReparse}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition flex items-center gap-1.5 shadow-sm shadow-sky-500/20"
            title="Re-run HTML Parser"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Re-Parse to JSON</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={onReset}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5"
            title="Reset to Original Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Code</span>
          </button>
        </div>
      </div>

      {/* Editor text area */}
      <div className="flex-1 relative bg-[#0b0f19]">
        <textarea
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 font-mono text-[13px] leading-relaxed text-slate-200 bg-transparent resize-none focus:outline-none selection:bg-sky-500 selection:text-white border-none"
          placeholder="Paste any HTML code here to convert it into structured JSON..."
        />
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Edit or paste HTML — JSON updates automatically in real-time</span>
        <span>HTML5 / Bootstrap 5.3</span>
      </div>

    </div>
  );
};
