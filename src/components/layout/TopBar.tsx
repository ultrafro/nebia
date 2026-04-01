'use client';

import { useWorkspace } from '@/store/workspace';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Users,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

const collaborators = [
  { id: 'u1', name: 'You', color: '#6366f1', initials: 'H' },
  { id: 'u2', name: 'Sarah Chen', color: '#22c55e', initials: 'SC' },
  { id: 'u3', name: 'Alex Rivera', color: '#f59e0b', initials: 'AR' },
];

const tabTitles: Record<string, string> = {
  pinup: 'Pinup Board',
  drawing: 'Drawing Board',
  rendering: 'AI Rendering',
  postprocessing: 'Post Processing',
  presentation: 'Presentation',
};

export default function TopBar() {
  const { activeTab, projectName, setProjectName } = useWorkspace();
  const [editing, setEditing] = useState(false);

  return (
    <div className="h-12 bg-[var(--surface)] border-b border-[var(--border)] flex items-center px-4 gap-4 shrink-0">
      {/* Project Name */}
      <div className="flex items-center gap-2 min-w-[200px]">
        {editing ? (
          <input
            className="bg-transparent border border-[var(--accent)] rounded px-2 py-0.5 text-sm text-[var(--text-primary)] outline-none"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
            autoFocus
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
          >
            {projectName}
            <ChevronDown size={12} className="text-[var(--text-muted)]" />
          </button>
        )}
        <span className="text-xs text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--surface-hover)]">
          {tabTitles[activeTab]}
        </span>
      </div>

      {/* Center Actions */}
      <div className="flex items-center gap-1 flex-1 justify-center">
        <button className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
          <Undo2 size={16} />
        </button>
        <button className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
          <Redo2 size={16} />
        </button>
        <div className="w-px h-5 bg-[var(--border)] mx-2" />
        <button className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
          <ZoomOut size={16} />
        </button>
        <span className="text-xs text-[var(--text-muted)] w-10 text-center">100%</span>
        <button className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
          <ZoomIn size={16} />
        </button>
        <div className="w-px h-5 bg-[var(--border)] mx-2" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent)] hover:text-white transition-all">
          <Sparkles size={13} />
          AI Assist
        </button>
      </div>

      {/* Collaborators */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {collaborators.map((user) => (
            <div
              key={user.id}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface)] cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: user.color }}
              title={user.name}
            >
              {user.initials}
            </div>
          ))}
        </div>
        <button className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
          <Users size={16} />
        </button>
      </div>
    </div>
  );
}
