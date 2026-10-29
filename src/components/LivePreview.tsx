import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Send,
  CheckCircle,
  GraduationCap,
  Layers,
  Terminal,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface LivePreviewProps {
  data: PortfolioData;
  rawHtml: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ data, rawHtml }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [renderMode, setRenderMode] = useState<'modern' | 'bootstrap'>('modern');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactState, setContactState] = useState({ name: '', email: '', subject: '', message: '' });

  const getWidthClass = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setContactState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Bar with Device toggles & Render mode */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setRenderMode('modern')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                renderMode === 'modern' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              JSON Driven UI
            </button>
            <button
              onClick={() => setRenderMode('bootstrap')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                renderMode === 'bootstrap' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Original Bootstrap 5
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            {renderMode === 'modern' ? 'Live parsed schema rendered' : 'Direct HTML iframe execution'}
          </span>
        </div>

        {/* Viewport Width Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded transition ${device === 'desktop' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded transition ${device === 'tablet' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded transition ${device === 'mobile' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-auto bg-slate-950 p-3 sm:p-6 flex justify-center">
        <div
          className={`${getWidthClass()} transition-all duration-300 bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col min-h-full`}
        >
          {renderMode === 'bootstrap' ? (
            <iframe
              srcDoc={rawHtml}
              title="Portfolio Bootstrap HTML Preview"
              sandbox="allow-scripts"
              className="w-full flex-1 min-h-[750px] border-none bg-white"
            />
          ) : (
            <div className="flex-1 bg-slate-950 text-slate-100 font-sans selection:bg-sky-500">
              
              {/* Navbar */}
              <nav className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-sky-400" />
                  My Portfolio
                </span>
                <div className="hidden sm:flex items-center gap-5 text-sm font-medium">
                  {data.navigation.map((nav, i) => (
                    <a
                      key={i}
                      href={nav.href}
                      className="text-slate-400 hover:text-sky-400 transition"
                    >
                      {nav.label}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Hero Section */}
              <section id="home" className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
                <div className="max-w-3xl mx-auto text-center space-y-5">
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Hello, I'm <span className="text-sky-400">{data.profile.name}</span>
                  </h1>
                  <p className="text-lg font-medium text-sky-300/90">
                    {data.profile.headline}
                  </p>
                  <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                    {data.profile.bio}
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    {data.profile.ctaButtons.map((btn, i) => (
                      <a
                        key={i}
                        href={btn.href}
                        className={`px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm ${
                          btn.variant === 'primary'
                            ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20'
                            : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {btn.text}
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="py-16 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{data.about.title}</h2>
                  <p className="text-sm text-slate-400 mt-1">{data.about.subtitle}</p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.about.sections.map((part, idx) => (
                      <div key={idx} className="space-y-3">
                        <h3 className="text-base font-semibold text-sky-400">{part.title}</h3>
                        <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
                          {part.content.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="py-16 px-6 bg-slate-900/50 border-y border-slate-800/80">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">My Skills</h2>
                    <p className="text-sm text-slate-400 mt-1">Technologies I am learning</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:-translate-y-1 transition duration-200 space-y-2 text-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto text-lg font-bold">
                          {skill.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-white text-base">{skill.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Education Section */}
              <section id="education" className="py-16 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Education</h2>
                  <p className="text-sm text-slate-400 mt-1">My academic journey</p>
                </div>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-6 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 space-y-2"
                    >
                      <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-sky-400">{edu.institution}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{edu.period}</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="py-16 px-6 bg-slate-900/50 border-y border-slate-800/80">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">My Projects</h2>
                    <p className="text-sm text-slate-400 mt-1">Some of my academic and personal projects</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-200"
                      >
                        <div className="space-y-2.5">
                          <h4 className="text-base font-bold text-white">{proj.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-5">
                          {proj.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-sky-300 border border-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-16 px-6 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{data.contact.title}</h2>
                  <p className="text-sm text-slate-400 mt-1">{data.contact.subtitle}</p>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800">
                  {formSubmitted ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                      <CheckCircle className="w-8 h-8 mx-auto text-emerald-400" />
                      <p className="font-semibold text-sm">{data.contact.successMessage}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            value={contactState.name}
                            onChange={(e) => setContactState({ ...contactState, name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={contactState.email}
                            onChange={(e) => setContactState({ ...contactState, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                        <input
                          type="text"
                          required
                          value={contactState.subject}
                          onChange={(e) => setContactState({ ...contactState, subject: e.target.value })}
                          placeholder="Enter subject"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                        <textarea
                          rows={4}
                          required
                          value={contactState.message}
                          onChange={(e) => setContactState({ ...contactState, message: e.target.value })}
                          placeholder="Write your message"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 font-semibold text-white text-sm transition flex items-center justify-center gap-2 shadow-sm shadow-sky-500/25"
                      >
                        <Send className="w-4 h-4" />
                        <span>{data.contact.submitButtonText}</span>
                      </button>
                    </form>
                  )}
                </div>
              </section>

              {/* Footer */}
              <footer className="py-10 px-6 bg-slate-950 border-t border-slate-800 text-center space-y-4">
                <div>
                  <h5 className="font-bold text-white text-base">{data.footer.author}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">{data.footer.tagline}</p>
                </div>

                <div className="flex items-center justify-center gap-4 text-slate-400">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-rose-400 transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${data.profile.email}`} className="hover:text-sky-400 transition">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-xs text-slate-500 pt-2 border-t border-slate-900">
                  {data.footer.copyright}
                </p>
              </footer>

            </div>
          )}
        </div>
      </div>

    </div>
  );
};
