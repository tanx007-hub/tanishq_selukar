import React, { useState } from 'react';
import { X, Copy, Check, Code2, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  jsonString: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
  jsonString,
}) => {
  const [activeTab, setActiveTab] = useState<'react' | 'ts' | 'python' | 'curl'>('react');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reactSnippet = `// Example: Render your portfolio in Next.js / React with Tailwind CSS
import React from 'react';
import portfolioData from './portfolio.json';

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-4xl font-bold text-white">{portfolioData.profile.name}</h1>
        <p className="text-sky-400 mt-2">{portfolioData.profile.headline}</p>
        <p className="text-slate-400 mt-4">{portfolioData.profile.bio}</p>
      </header>

      <section className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData.projects.map((proj) => (
            <div key={proj.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
              <h3 className="font-semibold text-lg text-white">{proj.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{proj.description}</p>
              <div className="flex gap-2 mt-3">
                {proj.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-slate-800 text-sky-300 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}`;

  const tsInterfaceSnippet = `export interface PortfolioSchema {
  meta: {
    title: string;
    version: string;
    language: string;
    lastUpdated?: string;
  };
  navigation: Array<{ label: string; href: string }>;
  profile: {
    name: string;
    headline: string;
    bio: string;
    email?: string;
    location?: string;
    ctaButtons: Array<{ text: string; href: string; variant: string }>;
  };
  about: {
    title: string;
    subtitle: string;
    sections: Array<{ title: string; content: string[] }>;
  };
  skills: Array<{
    id: string;
    name: string;
    icon: string;
    category: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
  }>;
  contact: {
    title: string;
    subtitle: string;
    formFields: Array<{ id: string; label: string; type: string; placeholder: string; required: boolean }>;
    submitButtonText: string;
    successMessage: string;
  };
  footer: {
    author: string;
    tagline: string;
    socialLinks: Array<{ platform: string; icon: string; url: string }>;
    copyright: string;
  };
}`;

  const pythonSnippet = `import json

# Load the converted portfolio JSON
with open('portfolio.json', 'r', encoding='utf-8') as f:
    portfolio = json.load(f)

print(f"Loaded portfolio for: {portfolio['profile']['name']}")
print(f"Role: {portfolio['profile']['headline']}")
print(f"Education: {portfolio['education'][0]['institution']}")
print(f"Projects count: {len(portfolio['projects'])}")

for proj in portfolio['projects']:
    print(f"- {proj['title']} (Tags: {', '.join(proj['tags'])})")
`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'react':
        return reactSnippet;
      case 'ts':
        return tsInterfaceSnippet;
      case 'python':
        return pythonSnippet;
      default:
        return reactSnippet;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Developer Integrations & Snippets</h3>
              <p className="text-xs text-slate-400">How to consume this JSON in your apps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab options */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-900 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('react')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'react' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            React / Next.js
          </button>
          <button
            onClick={() => setActiveTab('ts')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'ts' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            TypeScript Types
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'python' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Python Loader
          </button>

          <div className="ml-auto">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
        </div>

        {/* Code display */}
        <div className="p-6 overflow-auto font-mono text-xs text-slate-200 bg-[#0b0f19] flex-1 leading-relaxed">
          <pre className="whitespace-pre overflow-x-auto">{getActiveCode()}</pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Formatted for immediate plug-and-play in any codebase</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
