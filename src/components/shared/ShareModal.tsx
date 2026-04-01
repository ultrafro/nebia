'use client';

import { useWorkspace } from '@/store/workspace';
import { X, Link, Mail, Copy, Check, Globe, Lock, Users } from 'lucide-react';
import { useState } from 'react';

export default function ShareModal() {
  const { shareModalOpen, toggleShareModal, projectName } = useWorkspace();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [access, setAccess] = useState<'viewer' | 'editor'>('viewer');

  if (!shareModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://nebia.app/project/share/abc123`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl w-[480px] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Share &quot;{projectName}&quot;</h2>
          <button
            onClick={toggleShareModal}
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Invite by Email */}
          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Invite collaborators</label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3">
                <Mail size={14} className="text-[var(--text-muted)]" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 bg-transparent py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                />
              </div>
              <select
                value={access}
                onChange={(e) => setAccess(e.target.value as 'viewer' | 'editor')}
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 text-xs text-[var(--text-secondary)] outline-none"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
              <button className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors">
                Invite
              </button>
            </div>
          </div>

          {/* Current Collaborators */}
          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">People with access</label>
            <div className="space-y-2">
              {[
                { name: 'You (Hisham)', email: 'hisham@email.com', role: 'Owner', color: '#6366f1' },
                { name: 'Sarah Chen', email: 'sarah@studio.com', role: 'Editor', color: '#22c55e' },
                { name: 'Alex Rivera', email: 'alex@design.co', role: 'Viewer', color: '#f59e0b' },
              ].map((user) => (
                <div key={user.email} className="flex items-center gap-3 py-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--text-primary)]">{user.name}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{user.email}</div>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--surface-hover)]">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Share Link */}
          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Share link</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2">
                <Link size={14} className="text-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-muted)] truncate">nebia.app/project/share/abc123</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                {copied ? <Check size={13} className="text-[var(--success)]" /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Access Control */}
          <div className="flex items-center gap-4 pt-2 border-t border-[var(--border)]">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors">
              <Globe size={13} />
              Anyone with link can view
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors">
              <Lock size={13} />
              Restricted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
