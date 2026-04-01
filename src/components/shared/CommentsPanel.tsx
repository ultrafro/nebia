'use client';

import { useWorkspace } from '@/store/workspace';
import { MessageCircle, X, Send, Check } from 'lucide-react';
import { useState } from 'react';

export default function CommentsPanel() {
  const { showComments, toggleComments, comments, addComment, resolveComment } = useWorkspace();
  const [newComment, setNewComment] = useState('');

  if (!showComments) return null;

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    addComment({ userId: 'u1', userName: 'You', text: newComment });
    setNewComment('');
  };

  return (
    <div className="w-72 bg-[var(--surface)] border-l border-[var(--border)] flex flex-col shrink-0">
      <div className="h-12 flex items-center justify-between px-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <MessageCircle size={16} className="text-[var(--accent)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">Comments</span>
          <span className="text-[10px] bg-[var(--accent-muted)] text-[var(--accent)] px-1.5 py-0.5 rounded-full font-medium">
            {comments.filter(c => !c.resolved).length}
          </span>
        </div>
        <button
          onClick={toggleComments}
          className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {comments.filter(c => !c.resolved).map((comment) => (
          <div key={comment.id} className="bg-[var(--background)] rounded-lg p-3 group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-[var(--text-primary)]">{comment.userName}</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[var(--text-muted)]">
                  {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => resolveComment(comment.id)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--text-muted)] hover:text-[var(--success)] transition-all"
                  title="Resolve"
                >
                  <Check size={12} />
                </button>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-[var(--border)]">
        <div className="flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Add a comment..."
            className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            onClick={handleSubmit}
            className="p-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
