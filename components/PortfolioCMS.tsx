import React, { useEffect, useState } from 'react';
import { AlertCircle, Check, Eye, EyeOff, Loader2, Plus, Save, Trash2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioContent, Project, Experience } from '../types';

const GITHUB_REPO = 'rehanhf/rehanhf.github.io';
const GITHUB_FILE = 'data/portfolio.json';
const TOKEN_KEY = 'portfolio-cms-github-token';

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

// Commit both language contents to portfolio.json via the GitHub Contents API.
async function commitToGitHub(
  token: string,
  data: Record<string, PortfolioContent>,
): Promise<void> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  const getRes = await fetch(url, { headers });
  if (!getRes.ok) {
    const err = await getRes.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `GitHub error ${getRes.status}`);
  }
  const { sha } = await getRes.json() as { sha: string };

  // btoa doesn't handle multibyte (Indonesian) chars — use this safe variant
  const jsonString = JSON.stringify(data, null, 2);
  const encoded = btoa(unescape(encodeURIComponent(jsonString)));

  const putRes = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'chore: update portfolio content via CMS',
      content: encoded,
      sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `GitHub error ${putRes.status}`);
  }
}

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export const PortfolioCMS: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { language, content, contentMap, setContent, resetContent } = useLanguage();
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  // Load draft + token from storage whenever the modal opens
  useEffect(() => {
    if (!open) return;

    setToken(localStorage.getItem(TOKEN_KEY) ?? '');
    setSaveStatus('idle');
    setSaveError('');

    const saved = localStorage.getItem(`portfolio-cms-${language}`);
    if (saved) {
      try {
        setDraft(JSON.parse(saved) as PortfolioContent);
        return;
      } catch { /* fall through */ }
    }
    setDraft(content);
  }, [open, content, language]);

  if (!open) return null;

  // ── Draft helpers ──────────────────────────────────────────────────────────

  const updateDraft = (updater: (current: PortfolioContent) => PortfolioContent) => {
    setDraft((current) => updater(current));
  };

  const updateProject = (index: number, next: Project) => {
    updateDraft((c) => {
      const updated = [...c.projects];
      updated[index] = next;
      return { ...c, projects: updated };
    });
  };

  const addProject = () => {
    updateDraft((c) => ({
      ...c,
      projects: [
        ...c.projects,
        { id: createId('project'), title: 'New Project', description: '', tags: [], link: '#' },
      ],
    }));
  };

  const removeProject = (index: number) => {
    updateDraft((c) => ({ ...c, projects: c.projects.filter((_, i) => i !== index) }));
  };

  const updateExperience = (index: number, next: Experience) => {
    updateDraft((c) => {
      const updated = [...c.experience];
      updated[index] = next;
      return { ...c, experience: updated };
    });
  };

  const addExperience = () => {
    updateDraft((c) => ({
      ...c,
      experience: [
        ...c.experience,
        {
          id: createId('exp'),
          role: 'New Role',
          company: 'Company Name',
          companyLogo: '',
          companyUrl: '#',
          period: '2025 - Present',
          achievements: ['Add achievement here'],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    updateDraft((c) => ({ ...c, experience: c.experience.filter((_, i) => i !== index) }));
  };

  // ── Save & deploy ──────────────────────────────────────────────────────────

  const saveDraft = async () => {
    setSaveStatus('saving');
    setSaveError('');

    // 1. Push to in-memory state so the page reflects changes immediately
    setContent(draft);

    // 2. Persist to localStorage (fast local fallback)
    try {
      localStorage.setItem(`portfolio-cms-${language}`, JSON.stringify(draft));
    } catch {
      // Storage quota exceeded (usually caused by large base64 images).
      // In-memory update still works for this session.
    }

    // 3. Persist token if it changed
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    // 4. Commit to GitHub if token is available
    if (!token.trim()) {
      // No token — saved locally only
      setSaveStatus('idle');
      onClose();
      return;
    }

    try {
      // Merge the draft for the current language with the stored other language
      const fullData: Record<string, PortfolioContent> = {
        ...contentMap,
        [language]: draft,
      };
      await commitToGitHub(token.trim(), fullData);
      setSaveStatus('success');
    } catch (err) {
      setSaveStatus('error');
      setSaveError((err as Error).message);
    }
  };

  const resetDraft = () => {
    resetContent();
    localStorage.removeItem(`portfolio-cms-${language}`);
    onClose();
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const isSaving = saveStatus === 'saving';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="h-[85vh] w-[min(1000px,90vw)] overflow-y-auto rounded-2xl border border-white/10 bg-[#111318] p-5 shadow-2xl shadow-black/50">

        {/* ── Header ── */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neon">Portfolio CMS</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Edit content</h2>
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

          {/* ── Summary ── */}
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="mb-3 text-lg font-semibold text-white">Summary</h3>
            <textarea
              value={draft.summary}
              onChange={(e) => updateDraft((c) => ({ ...c, summary: e.target.value }))}
              className="min-h-[110px] w-full resize-y rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
            />
          </section>

          {/* ── Projects ── */}
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
                      className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Title
                      <input
                        value={project.title}
                        onChange={(e) => updateProject(index, { ...project, title: e.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>
                    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Link
                      <input
                        value={project.link}
                        onChange={(e) => updateProject(index, { ...project, link: e.target.value })}
                        className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>
                  </div>

                  <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Description
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, { ...project, description: e.target.value })}
                      className="mt-1 min-h-[80px] w-full resize-y rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                    />
                  </label>

                  <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Tags (comma separated)
                    <input
                      value={project.tags.join(', ')}
                      onChange={(e) =>
                        updateProject(index, {
                          ...project,
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* ── Experience ── */}
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
              {draft.experience.map((exp, index) => {
                const logoIsImage = exp.companyLogo
                  ? exp.companyLogo.startsWith('http') || exp.companyLogo.startsWith('/') || exp.companyLogo.startsWith('data:')
                  : false;

                return (
                  <div key={exp.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Experience {index + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                        Role
                        <input
                          value={exp.role}
                          onChange={(e) => updateExperience(index, { ...exp, role: e.target.value })}
                          className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                        />
                      </label>
                      <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                        Company
                        <input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                          className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                        />
                      </label>
                      <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                        Period
                        <input
                          value={exp.period}
                          onChange={(e) => updateExperience(index, { ...exp, period: e.target.value })}
                          className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                        />
                      </label>
                      <label className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                        Company URL
                        <input
                          value={exp.companyUrl ?? ''}
                          onChange={(e) => updateExperience(index, { ...exp, companyUrl: e.target.value })}
                          className="mt-1 w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                        />
                      </label>
                    </div>

                    {/* Company logo */}
                    <div className="mt-4 space-y-2">
                      <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Company Logo</p>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-black/20">
                          {logoIsImage ? (
                            <img src={exp.companyLogo} alt={exp.company} className="h-full w-full object-contain p-1" />
                          ) : (
                            <span className="text-[10px] font-bold text-white">
                              {exp.companyLogo || exp.company.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                        <p className="text-[11px] text-zinc-500">Paste a URL below or leave blank for initials.</p>
                      </div>
                      <input
                        value={exp.companyLogo && !exp.companyLogo.startsWith('data:') ? exp.companyLogo : ''}
                        placeholder="https://example.com/logo.png"
                        onChange={(e) => updateExperience(index, { ...exp, companyLogo: e.target.value })}
                        className="w-full rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none placeholder:text-zinc-600"
                      />
                    </div>

                    <label className="mt-3 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                      Achievements (one per line)
                      <textarea
                        value={exp.achievements.join('\n')}
                        onChange={(e) =>
                          updateExperience(index, {
                            ...exp,
                            achievements: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean),
                          })
                        }
                        className="mt-1 min-h-[110px] w-full resize-y rounded-md border border-white/10 bg-black/20 p-2 text-sm text-white outline-none"
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── GitHub deployment settings ── */}
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="mb-1 text-lg font-semibold text-white">GitHub Deployment</h3>
            <p className="mb-4 text-xs text-zinc-500">
              Saving with a token commits <code className="text-neon">data/portfolio.json</code> directly to{' '}
              <span className="text-zinc-400">rehanhf/rehanhf.github.io</span> and triggers an auto-deploy (~2 min).
              Without a token, changes are saved locally only.
            </p>

            <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500">
              Personal Access Token
              <div className="relative mt-1">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="github_pat_..."
                  className="w-full rounded-md border border-white/10 bg-black/20 p-2 pr-10 text-sm text-white outline-none placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowToken((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>

            <p className="mt-2 text-[11px] text-zinc-600">
              Generate at <span className="text-zinc-400">github.com → Settings → Developer settings → Personal access tokens → Fine-grained</span>.
              Required permission: <span className="text-neon">Contents → Read and write</span> on this repo.
              The token is stored only in your browser's localStorage.
            </p>
          </section>

        </div>

        {/* ── Footer ── */}
        <div className="mt-8 space-y-3 border-t border-white/10 pt-4">

          {/* Status messages */}
          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 rounded-lg border border-neon/30 bg-neon/5 px-4 py-2 text-sm text-neon">
              <Check size={15} />
              Committed to GitHub. GitHub Actions is deploying — site updates in ~2 min.
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2 text-sm text-red-300">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>GitHub error: {saveError}. Changes saved locally.</span>
            </div>
          )}
          {!token && (
            <p className="text-center text-[11px] text-zinc-600">
              No GitHub token — Save will apply changes locally only.
            </p>
          )}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetDraft}
              disabled={isSaving}
              className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 transition hover:text-white disabled:opacity-40"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={saveDraft}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-md border border-neon/40 bg-neon/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-neon transition hover:bg-neon/20 disabled:opacity-40"
            >
              {isSaving ? (
                <><Loader2 size={14} className="animate-spin" /> Deploying...</>
              ) : saveStatus === 'success' ? (
                <><Check size={14} /> Deployed!</>
              ) : (
                <><Save size={14} /> {token ? 'Save & Deploy' : 'Save Locally'}</>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
