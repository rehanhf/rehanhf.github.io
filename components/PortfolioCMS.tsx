import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioContent, Project, Experience } from '../types';

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const handleImageUpload = (
  file: File | null,
  onSuccess: (dataUrl: string) => void,
) => {
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      onSuccess(reader.result);
    }
  };
  reader.readAsDataURL(file);
};

export const PortfolioCMS: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { content, setContent, resetContent, language } = useLanguage();
  const [draft, setDraft] = useState<PortfolioContent>(content);

  useEffect(() => {
    if (!open) return;

    const saved = localStorage.getItem(`portfolio-cms-${language}`);
    if (saved) {
      try {
        setDraft(JSON.parse(saved) as PortfolioContent);
        return;
      } catch {
        // fallback below
      }
    }

    setDraft(content);
  }, [content, language, open]);

  if (!open) return null;

  const updateDraft = (updater: (current: PortfolioContent) => PortfolioContent) => {
    setDraft((current) => updater(current));
  };

  const updateProject = (index: number, next: Project) => {
    updateDraft((current) => {
      const updatedProjects = [...current.projects];
      updatedProjects[index] = next;
      return { ...current, projects: updatedProjects };
    });
  };

  const addProject = () => {
    updateDraft((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: createId('project'),
          title: 'New Project',
          description: 'Add a short project description.',
          tags: ['Tag 1'],
          link: '#',
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    updateDraft((current) => ({
      ...current,
      projects: current.projects.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index: number, next: Experience) => {
    updateDraft((current) => {
      const updatedExperience = [...current.experience];
      updatedExperience[index] = next;
      return { ...current, experience: updatedExperience };
    });
  };

  const addExperience = () => {
    updateDraft((current) => ({
      ...current,
      experience: [
        ...current.experience,
        {
          id: createId('experience'),
          role: 'New Role',
          company: 'Company Name',
          companyLogo: 'CN',
          companyUrl: '#',
          period: '2025 - Present',
          achievements: ['Add achievement here'],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    updateDraft((current) => ({
      ...current,
      experience: current.experience.filter((_, i) => i !== index),
    }));
  };

  const saveDraft = () => {
    setContent(draft);
    localStorage.setItem(`portfolio-cms-${language}`, JSON.stringify(draft));
    onClose();
  };

  const resetDraft = () => {
    resetContent();
    localStorage.removeItem(`portfolio-cms-${language}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="h-[85vh] w-[min(1000px,90vw)] overflow-y-auto rounded-2xl border border-white/10 bg-[#111318] p-5 shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neon">Portfolio CMS</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Edit content quickly</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-zinc-300 transition hover:text-white"
            aria-label="Close CMS"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-8">
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Brand Logo</h3>
            </div>

            <div className="flex items-center gap-5">
              {draft.hero.brandLogo ? (
                <img src={draft.hero.brandLogo} alt="Brand logo preview" className="h-16 w-16 object-contain rounded-lg border border-white/10 bg-black/20 p-2" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-lg font-black text-white">RH</div>
              )}

              <label className="inline-flex cursor-pointer items-center rounded-md border border-neon/40 bg-neon/10 px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] text-neon transition hover:bg-neon/20">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImageUpload(event.target.files?.[0] ?? null, (dataUrl) => {
                    updateDraft((current) => ({
                      ...current,
                      hero: { ...current.hero, brandLogo: dataUrl },
                    }));
                  })}
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Summary</h3>
            </div>
            <textarea
              value={draft.summary}
              onChange={(event) => updateDraft((current) => ({ ...current, summary: event.target.value }))}
              className="min-h-[110px] w-full resize-y rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-200 outline-none ring-0 placeholder:text-zinc-500"
            />
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Projects</h3>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-2 rounded-md border border-neon/40 bg-neon/10 px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] text-neon transition hover:bg-neon/20"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="space-y-4">
              {draft.projects.map((project, index) => (
                <div key={project.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Project {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="inline-flex items-center gap-2 text-xs text-red-300 hover:text-red-200"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Title
                      <input
                        value={project.title}
                        onChange={(event) => updateProject(index, { ...project, title: event.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>

                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Link
                      <input
                        value={project.link}
                        onChange={(event) => updateProject(index, { ...project, link: event.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>
                  </div>

                  <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Description
                    <textarea
                      value={project.description}
                      onChange={(event) => updateProject(index, { ...project, description: event.target.value })}
                      className="mt-1 min-h-[90px] w-full resize-y rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                    />
                  </label>

                  <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Tags (comma separated)
                    <input
                      value={project.tags.join(', ')}
                      onChange={(event) =>
                        updateProject(index, {
                          ...project,
                          tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean),
                        })
                      }
                      className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Experience</h3>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-2 rounded-md border border-neon/40 bg-neon/10 px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] text-neon transition hover:bg-neon/20"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="space-y-4">
              {draft.experience.map((exp, index) => (
                <div key={exp.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Experience {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="inline-flex items-center gap-2 text-xs text-red-300 hover:text-red-200"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Role
                      <input
                        value={exp.role}
                        onChange={(event) => updateExperience(index, { ...exp, role: event.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>

                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Company
                      <input
                        value={exp.company}
                        onChange={(event) => updateExperience(index, { ...exp, company: event.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>

                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Company URL
                      <input
                        value={exp.companyUrl ?? ''}
                        onChange={(event) => updateExperience(index, { ...exp, companyUrl: event.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-5">
                      {exp.companyLogo && (exp.companyLogo.startsWith('http') || exp.companyLogo.startsWith('/') || exp.companyLogo.startsWith('data:')) ? (
                        <img src={exp.companyLogo} alt="Company logo preview" className="h-10 w-10 rounded-md border border-white/10 bg-black/20 object-contain p-1" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/20 text-[10px] font-bold text-white">
                          {exp.companyLogo || 'LOGO'}
                        </div>
                      )}
                      <label className="inline-flex cursor-pointer items-center rounded-md border border-neon/40 bg-neon/10 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neon transition hover:bg-neon/20">
                        Upload image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => handleImageUpload(event.target.files?.[0] ?? null, (dataUrl) => {
                            updateExperience(index, { ...exp, companyLogo: dataUrl });
                          })}
                        />
                      </label>
                    </div>

                    <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Or paste image URL
                      <input
                        value={exp.companyLogo && !exp.companyLogo.startsWith('data:') ? exp.companyLogo : ''}
                        placeholder="https://example.com/logo.png"
                        onChange={(event) => updateExperience(index, { ...exp, companyLogo: event.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none placeholder:text-zinc-600"
                      />
                    </label>
                  </div>

                  <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Period
                    <input
                      value={exp.period}
                      onChange={(event) => updateExperience(index, { ...exp, period: event.target.value })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                    />
                  </label>

                  <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Achievements (one per line)
                    <textarea
                      value={exp.achievements.join('\n')}
                      onChange={(event) =>
                        updateExperience(index, {
                          ...exp,
                          achievements: event.target.value.split('\n').map((line) => line.trim()).filter(Boolean),
                        })
                      }
                      className="mt-1 min-h-[110px] w-full resize-y rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={resetDraft}
            className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 transition hover:text-white"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="inline-flex items-center gap-2 rounded-md border border-neon/40 bg-neon/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-neon transition hover:bg-neon/20"
          >
            <Save size={14} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};
