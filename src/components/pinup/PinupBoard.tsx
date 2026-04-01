'use client';

import { useWorkspace } from '@/store/workspace';
import { useState, useRef, useCallback } from 'react';
import {
  Plus,
  StickyNote,
  Type,
  Image as ImageIcon,
  Link,
  Search,
  Trash2,
  GripVertical,
  Sparkles,
} from 'lucide-react';

const cardColors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export default function PinupBoard() {
  const { pinupCards, addPinupCard, updatePinupCard, removePinupCard } = useWorkspace();
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const boardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, cardId: string) => {
    if (editingCard === cardId) return;
    const card = pinupCards.find(c => c.id === cardId);
    if (!card) return;
    setDragging(cardId);
    setDragOffset({ x: e.clientX - card.x, y: e.clientY - card.y });
  }, [pinupCards, editingCard]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    updatePinupCard(dragging, {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  }, [dragging, dragOffset, updatePinupCard]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  const addNote = (color: string) => {
    addPinupCard({
      type: 'note',
      content: 'New note...',
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      width: 220,
      height: 160,
      color,
    });
    setShowAddMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="h-11 bg-[var(--surface)] border-b border-[var(--border)] flex items-center px-4 gap-3 shrink-0">
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            <Plus size={14} />
            Add
          </button>
          {showAddMenu && (
            <div className="absolute top-full left-0 mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-2 shadow-xl z-50 min-w-[180px]">
              <button
                onClick={() => addNote('#6366f1')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <StickyNote size={14} /> Sticky Note
              </button>
              <button
                onClick={() => addNote('#22c55e')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <Type size={14} /> Text Block
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors">
                <ImageIcon size={14} /> Image
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors">
                <Link size={14} /> Link
              </button>
              <div className="border-t border-[var(--border)] mt-1 pt-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-[var(--accent)] hover:bg-[var(--accent-muted)] transition-colors">
                  <Sparkles size={14} /> AI Generate Ideas
                </button>
              </div>
              <div className="border-t border-[var(--border)] mt-1 pt-2 px-3">
                <div className="text-[10px] text-[var(--text-muted)] mb-1.5">Note Color</div>
                <div className="flex gap-1">
                  {cardColors.map(color => (
                    <button
                      key={color}
                      onClick={() => addNote(color)}
                      className="w-5 h-5 rounded-full hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-[var(--border)]" />

        <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] rounded-lg px-2.5 py-1.5">
          <Search size={13} className="text-[var(--text-muted)]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search board..."
            className="bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-40"
          />
        </div>

        <div className="flex-1" />

        <span className="text-[11px] text-[var(--text-muted)]">
          {pinupCards.length} items on board
        </span>
      </div>

      {/* Board Canvas */}
      <div
        ref={boardRef}
        className="flex-1 dot-pattern cursor-crosshair overflow-auto relative"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => { setShowAddMenu(false); setEditingCard(null); }}
      >
        {pinupCards
          .filter(card => !searchQuery || card.content.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((card) => (
          <div
            key={card.id}
            className={`absolute group select-none ${dragging === card.id ? 'cursor-grabbing scale-105 shadow-2xl' : 'cursor-grab hover:shadow-lg'} transition-shadow`}
            style={{
              left: card.x,
              top: card.y,
              width: card.width,
              zIndex: card.zIndex,
            }}
            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, card.id); }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-lg overflow-hidden shadow-md border border-white/5"
              style={{ backgroundColor: card.color + '15', borderTop: `3px solid ${card.color}` }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={12} className="text-[var(--text-muted)]" />
                <button
                  onClick={(e) => { e.stopPropagation(); removePinupCard(card.id); }}
                  className="p-0.5 rounded text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Card content */}
              <div className="px-3 pb-3">
                {editingCard === card.id ? (
                  <textarea
                    className="w-full bg-transparent text-xs text-[var(--text-primary)] outline-none resize-none leading-relaxed"
                    value={card.content}
                    onChange={(e) => updatePinupCard(card.id, { content: e.target.value })}
                    onBlur={() => setEditingCard(null)}
                    rows={5}
                    autoFocus
                  />
                ) : (
                  <div
                    className="text-xs text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap cursor-text min-h-[60px]"
                    onDoubleClick={() => setEditingCard(card.id)}
                  >
                    {card.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty state hint */}
        {pinupCards.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Sparkles size={40} className="text-[var(--text-muted)] mx-auto mb-3 opacity-30" />
              <p className="text-sm text-[var(--text-muted)]">Click &quot;Add&quot; to start brainstorming</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
