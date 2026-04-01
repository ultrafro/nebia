'use client';

import { useWorkspace } from '@/store/workspace';
import { WorkspaceTab } from '@/types';
import {
  Lightbulb,
  PenTool,
  Sun,
  Layers,
  Presentation,
  MessageCircle,
  Share2,
  Settings,
  Sparkles,
} from 'lucide-react';

const tabs: { id: WorkspaceTab; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'pinup', label: 'Pinup', icon: <Lightbulb size={20} />, description: 'Brainstorm & Research' },
  { id: 'drawing', label: 'Draw', icon: <PenTool size={20} />, description: '2D & 3D Modeling' },
  { id: 'rendering', label: 'Render', icon: <Sun size={20} />, description: 'AI Rendering' },
  { id: 'postprocessing', label: 'Post', icon: <Layers size={20} />, description: 'Edit & Enhance' },
  { id: 'presentation', label: 'Present', icon: <Presentation size={20} />, description: 'Presentations' },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, toggleComments, showComments, toggleShareModal } = useWorkspace();

  return (
    <div className="w-16 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col items-center py-3 gap-1 shrink-0">
      {/* Logo */}
      <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center mb-4">
        <Sparkles size={18} className="text-white" />
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col gap-1 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tooltip w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-muted)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
            data-tooltip={tab.label}
            title={tab.description}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-1">
        <button
          onClick={toggleComments}
          className={`tooltip w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            showComments ? 'text-[var(--accent)] bg-[var(--accent-muted)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
          }`}
          data-tooltip="Comments"
        >
          <MessageCircle size={18} />
        </button>
        <button
          onClick={toggleShareModal}
          className="tooltip w-10 h-10 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all"
          data-tooltip="Share"
        >
          <Share2 size={18} />
        </button>
        <button
          className="tooltip w-10 h-10 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all"
          data-tooltip="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}
