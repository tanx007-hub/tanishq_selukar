/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  PortfolioData,
  ExportFormat,
} from './types/portfolio';
import { DEFAULT_HTML } from './utils/initialCode';
import {
  parseHtmlToPortfolioData,
  portfolioDataToJsonResume,
  portfolioDataToBlocks,
  parseHtmlToDomAst,
} from './utils/parser';
import { Header } from './components/Header';
import { JsonViewer } from './components/JsonViewer';
import { HtmlEditor } from './components/HtmlEditor';
import { VisualEditor } from './components/VisualEditor';
import { LivePreview } from './components/LivePreview';
import { ExportModal } from './components/ExportModal';
import {
  CheckCircle2,
  Sparkles,
  FileCode,
  Download,
  Copy,
  ArrowRight,
  Info,
  Layers,
} from 'lucide-react';

export default function App() {
  const [htmlCode, setHtmlCode] = useState<string>(DEFAULT_HTML);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() =>
    parseHtmlToPortfolioData(DEFAULT_HTML)
  );
  const [format, setFormat] = useState<ExportFormat>('portfolio-schema');
  const [viewMode, setViewMode] = useState<'split' | 'json' | 'preview' | 'html' | 'editor'>('split');
  const [isMinified, setIsMinified] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);

  // When user edits the HTML string, re-parse
  const handleHtmlChange = (newHtml: string) => {
    setHtmlCode(newHtml);
    try {
      const parsed = parseHtmlToPortfolioData(newHtml);
      setPortfolioData(parsed);
    } catch (err) {
      console.error('Parsing error', err);
    }
  };

  const handleReset = () => {
    setHtmlCode(DEFAULT_HTML);
    setPortfolioData(parseHtmlToPortfolioData(DEFAULT_HTML));
  };

  const handleReparse = () => {
    setPortfolioData(parseHtmlToPortfolioData(htmlCode));
  };

  // Compute active JSON string
  const activeJsonString = useMemo(() => {
    let dataObj: unknown;
    switch (format) {
      case 'portfolio-schema':
        dataObj = portfolioData;
        break;
      case 'json-resume':
        dataObj = portfolioDataToJsonResume(portfolioData);
        break;
      case 'headless-blocks':
        dataObj = portfolioDataToBlocks(portfolioData);
        break;
      case 'dom-ast':
        dataObj = parseHtmlToDomAst(htmlCode);
        break;
      default:
        dataObj = portfolioData;
    }

    return isMinified ? JSON.stringify(dataObj) : JSON.stringify(dataObj, null, 2);
  }, [format, portfolioData, htmlCode, isMinified]);

  // Copy handler
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(activeJsonString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [activeJsonString]);

  // Download handler
  const handleDownload = useCallback(() => {
    const filename = `tanishq_portfolio_${format}.json`;
    const blob = new Blob([activeJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeJsonString, format]);

  // Format title for JsonViewer header
  const formatTitle = useMemo(() => {
    switch (format) {
      case 'portfolio-schema':
        return 'Portfolio Data (Semantic Schema)';
      case 'json-resume':
        return 'Standard JSON Resume (schema.json)';
      case 'headless-blocks':
        return 'Modular CMS Block Components';
      case 'dom-ast':
        return 'HTML DOM Abstract Syntax Tree (AST)';
    }
  }, [format]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        format={format}
        setFormat={setFormat}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCopy={handleCopy}
        isCopied={isCopied}
        onDownload={handleDownload}
        isMinified={isMinified}
        setIsMinified={setIsMinified}
        onOpenExport={() => setExportModalOpen(true)}
      />

      {/* Hero Notification / Extracted Summary Banner */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border-b border-slate-800/80 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              <strong className="text-white">{portfolioData.profile.name}</strong>'s portfolio successfully converted:
            </span>
            <span className="hidden md:inline text-slate-400">
              {portfolioData.skills.length} skills · {portfolioData.projects.length} projects · {portfolioData.education[0]?.institution || 'University'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden lg:inline">Need other formats?</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFormat('portfolio-schema')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  format === 'portfolio-schema' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semantic
              </button>
              <button
                onClick={() => setFormat('json-resume')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  format === 'json-resume' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                JSON Resume
              </button>
              <button
                onClick={() => setFormat('headless-blocks')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  format === 'headless-blocks' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                CMS Blocks
              </button>
              <button
                onClick={() => setFormat('dom-ast')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  format === 'dom-ast' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                DOM AST
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 p-3 sm:p-5 max-w-7xl w-full mx-auto flex flex-col">
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[720px]">
            {/* Left Pane: JSON Output */}
            <div className="h-[750px] lg:h-full">
              <JsonViewer
                jsonString={activeJsonString}
                formatTitle={formatTitle}
                onCopy={handleCopy}
                isCopied={isCopied}
                onDownload={handleDownload}
              />
            </div>

            {/* Right Pane: Live Preview */}
            <div className="h-[750px] lg:h-full">
              <LivePreview data={portfolioData} rawHtml={htmlCode} />
            </div>
          </div>
        )}

        {viewMode === 'json' && (
          <div className="flex-1 min-h-[720px]">
            <JsonViewer
              jsonString={activeJsonString}
              formatTitle={formatTitle}
              onCopy={handleCopy}
              isCopied={isCopied}
              onDownload={handleDownload}
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="flex-1 min-h-[720px]">
            <LivePreview data={portfolioData} rawHtml={htmlCode} />
          </div>
        )}

        {viewMode === 'html' && (
          <div className="flex-1 min-h-[720px]">
            <HtmlEditor
              htmlCode={htmlCode}
              setHtmlCode={handleHtmlChange}
              onReset={handleReset}
              onReparse={handleReparse}
            />
          </div>
        )}

        {viewMode === 'editor' && (
          <div className="flex-1 min-h-[720px]">
            <VisualEditor
              data={portfolioData}
              onChange={(updated) => setPortfolioData(updated)}
            />
          </div>
        )}
      </main>

      {/* Developer Export / Snippet Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        data={portfolioData}
        jsonString={activeJsonString}
      />

    </div>
  );
}
