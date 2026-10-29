import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Code,
  Mail,
  Plus,
  Trash2,
  FileText,
  Save,
} from 'lucide-react';
import { PortfolioData, SkillItem, ProjectItem, EducationItem } from '../types/portfolio';

interface VisualEditorProps {
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'about' | 'skills' | 'education' | 'projects' | 'contact'>('profile');

  // Helpers to update data
  const updateProfile = (field: keyof PortfolioData['profile'], value: unknown) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    const updated = data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu));
    onChange({ ...data, education: updated });
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Degree Title',
      institution: 'University / College Name',
      period: '2026 - Present',
      description: 'Program description and coursework focus.',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };

  const updateSkill = (id: string, field: keyof SkillItem, value: string) => {
    const updated = data.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    onChange({ ...data, skills: updated });
  };

  const addSkill = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      icon: 'bi-code-slash',
      category: 'Technical',
      description: 'Description of proficiency and hands-on experience.',
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter((s) => s.id !== id) });
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: unknown) => {
    const updated = data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p));
    onChange({ ...data, projects: updated });
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: `project-${Date.now()}`,
      title: 'New Project Title',
      description: 'Comprehensive description of problem solved, architecture, and tools used.',
      tags: ['TypeScript', 'React'],
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Visual Editor Nav Tabs */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === 'profile' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === 'about' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>About</span>
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === 'skills' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Skills ({data.skills.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === 'education' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education ({data.education.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === 'projects' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Projects ({data.projects.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === 'contact' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact & Socials</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={data.profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Headline / Student Role
              </label>
              <input
                type="text"
                value={data.profile.headline}
                onChange={(e) => updateProfile('headline', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={data.profile.email || ''}
                onChange={(e) => updateProfile('email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Hero Bio Description
              </label>
              <textarea
                rows={3}
                value={data.profile.bio}
                onChange={(e) => updateProfile('bio', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
              />
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-5 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={data.about.title}
                  onChange={(e) => onChange({ ...data, about: { ...data.about, title: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={data.about.subtitle}
                  onChange={(e) => onChange({ ...data, about: { ...data.about, subtitle: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
                />
              </div>
            </div>

            {data.about.sections.map((sec, secIdx) => (
              <div key={secIdx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => {
                    const updated = [...data.about.sections];
                    updated[secIdx].title = e.target.value;
                    onChange({ ...data, about: { ...data.about, sections: updated } });
                  }}
                  className="w-full font-semibold text-sky-400 bg-transparent border-b border-slate-800 pb-1 focus:outline-none focus:border-sky-500 text-sm"
                  placeholder="Block Title (e.g., Who Am I?)"
                />
                <textarea
                  rows={4}
                  value={sec.content.join('\n\n')}
                  onChange={(e) => {
                    const updated = [...data.about.sections];
                    updated[secIdx].content = e.target.value.split('\n\n').filter(Boolean);
                    onChange({ ...data, about: { ...data.about, sections: updated } });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                  placeholder="Separate paragraphs with a blank line"
                />
              </div>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Skills extracted from your portfolio cards
              </span>
              <button
                onClick={addSkill}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-500 hover:bg-sky-400 text-white flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5 relative group">
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2 pr-6">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="Skill Name"
                      className="font-bold text-white bg-transparent border-b border-slate-800 focus:border-sky-500 focus:outline-none text-sm w-36"
                    />
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      placeholder="Category"
                      className="text-xs text-sky-400 bg-transparent border-b border-slate-800 focus:border-sky-500 focus:outline-none flex-1"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={skill.description}
                    onChange={(e) => updateSkill(skill.id, 'description', e.target.value)}
                    placeholder="Brief description of skill use"
                    className="w-full text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-2 focus:outline-none focus:border-sky-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Academic milestones & degrees
              </span>
              <button
                onClick={addEducation}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-500 hover:bg-sky-400 text-white flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            </div>

            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 relative">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="pr-6 space-y-2">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Degree Title"
                    className="w-full font-semibold text-white bg-transparent border-b border-slate-800 focus:border-sky-500 focus:outline-none text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="University / College"
                      className="text-xs text-sky-400 bg-transparent border-b border-slate-800 focus:border-sky-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                      placeholder="e.g. 2025 - Present"
                      className="text-xs text-slate-400 bg-transparent border-b border-slate-800 focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Academic details..."
                  className="w-full text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-2 focus:outline-none focus:border-sky-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Showcased projects and tech tags
              </span>
              <button
                onClick={addProject}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-500 hover:bg-sky-400 text-white flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 relative">
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="pr-6">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                      placeholder="Project Title"
                      className="font-bold text-white bg-transparent border-b border-slate-800 focus:border-sky-500 focus:outline-none text-sm w-full"
                    />
                  </div>

                  <textarea
                    rows={3}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Project details..."
                    className="w-full text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-2 focus:outline-none focus:border-sky-500"
                  />

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Tags (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={proj.tags.join(', ')}
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean);
                        updateProject(proj.id, 'tags', tags);
                      }}
                      className="w-full text-xs text-sky-300 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Socials Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Contact Form Title
                </label>
                <input
                  type="text"
                  value={data.contact.title}
                  onChange={(e) => onChange({ ...data, contact: { ...data.contact, title: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Submit Button Label
                </label>
                <input
                  type="text"
                  value={data.contact.submitButtonText}
                  onChange={(e) => onChange({ ...data, contact: { ...data.contact, submitButtonText: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={data.footer.copyright}
                onChange={(e) => onChange({ ...data, footer: { ...data.footer, copyright: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 text-sm"
              />
            </div>
          </div>
        )}

      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Save className="w-3.5 h-3.5" /> Edits sync to JSON and Preview immediately
        </span>
      </div>

    </div>
  );
};
