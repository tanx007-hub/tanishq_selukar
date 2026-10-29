import React from 'react';
import {
  Code2,
  FileJson,
  Download,
  Copy,
  Check,
  Eye,
  Edit3,
  Columns,
  Minimize2,
  Maximize2,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { ExportFormat } from '../types/portfolio';

interface HeaderProps {
  format: ExportFormat;
  setFormat: (fmt: ExportFormat) => void;
  viewMode: 'split' | 'json' | 'preview' | 'html' | 'editor';
  setViewMode: (mode: 'split' | 'json' | 'preview' | 'html' | 'editor') => void;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: () => void;
  isMinified: boolean;
  setIsMinified: (val: boolean) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  format,
  setFormat,
  viewMode,
  setViewMode,
  onCopy,
  isCopied,
  onDownload,
  isMinified,
  setIsMinified,
  onOpenExport,
}) => {
  const formats: { id: ExportFormat; label: string; desc: string }[] = [
    { id: 'portfolio-schema', label: 'Portfolio Data', desc: 'Semantic JSON for web apps' },
    { id: 'json-resume', label: 'JSON Resume', desc: 'Standard schema.json' },
    { id: 'headless-blocks', label: 'CMS Blocks', desc: 'Component sections' },
    { id: 'dom-ast', label: 'DOM AST Tree', desc: 'Full structural node tree' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">
                  HTML to JSON Studio
                </h1>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Tanishq Portfolio
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Converted HTML project into clean, structured JSON schemas
              </p>
            </div>
          </div>

          {/* Center Format Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  format === f.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={f.desc}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Actions & Layout */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded ${viewMode === 'split' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="Split View (Editor / JSON & Preview)"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`p-1.5 rounded ${viewMode === 'json' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="JSON Output View"
              >
                <FileJson className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`p-1.5 rounded ${viewMode === 'preview' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="Live Portfolio Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('html')}
                className={`p-1.5 rounded ${viewMode === 'html' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="HTML Source"
              >
                <FileCode className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('editor')}
                className={`p-1.5 rounded ${viewMode === 'editor' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="Visual Content Editor"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Minify Toggle */}
            <button
              onClick={() => setIsMinified(!isMinified)}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
              title={isMinified ? 'Beautify JSON (Formatted)' : 'Minify JSON (Compact)'}
            >
              {isMinified ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isMinified ? 'Beautify' : 'Minify'}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={onCopy}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition flex items-center gap-1.5 ${
                isCopied
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied!' : 'Copy JSON'}</span>
            </button>

            {/* Download Button */}
            <button
              onClick={onDownload}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition flex items-center gap-1.5 shadow-sm shadow-sky-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            {/* Export Code Snippets */}
            <button
              onClick={onOpenExport}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
              title="Export Code Integration"
            >
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Integrations</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
