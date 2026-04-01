'use client';

import { useWorkspace } from '@/store/workspace';
import { useState } from 'react';
import {
  Plus,
  Play,
  ChevronLeft,
  ChevronRight,
  Type,
  Image as ImageIcon,
  Square,
  Trash2,
  Copy,
  Maximize2,
  X,
  Layout,
  Sparkles,
  Share2,
  Download,
  GripVertical,
} from 'lucide-react';

const slideTemplates = [
  { id: 'blank', label: 'Blank', color: '#1a1a24' },
  { id: 'title', label: 'Title Slide', color: '#1a1a30' },
  { id: 'content', label: 'Content', color: '#1a2020' },
  { id: 'image', label: 'Image Focus', color: '#201a20' },
];

export default function PresentationView() {
  const {
    slides,
    activeSlideIndex,
    setActiveSlideIndex,
    addSlide,
    removeSlide,
    updateSlide,
    isPresentMode,
    togglePresentMode,
    toggleShareModal,
  } = useWorkspace();

  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const currentSlide = slides[activeSlideIndex];

  if (isPresentMode) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="w-full max-w-5xl aspect-video bg-[#0f0f17] rounded-lg overflow-hidden relative">
          {/* Slide content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
            <h1 className="text-4xl font-bold text-white mb-4">{currentSlide?.title}</h1>
            <p className="text-lg text-[var(--text-secondary)]">{currentSlide?.notes}</p>
          </div>

          {/* Slide number */}
          <div className="absolute bottom-4 right-6 text-xs text-[var(--text-muted)]">
            {activeSlideIndex + 1} / {slides.length}
          </div>
        </div>

        {/* Present mode controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[var(--surface)]/90 border border-[var(--border)] rounded-lg px-3 py-2 backdrop-blur-sm">
          <button
            onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
            disabled={activeSlideIndex === 0}
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-[var(--text-secondary)] px-2">
            {activeSlideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={() => setActiveSlideIndex(Math.min(slides.length - 1, activeSlideIndex + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <div className="w-px h-5 bg-[var(--border)]" />
          <button
            onClick={togglePresentMode}
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Slide list sidebar */}
      <div className="w-52 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col shrink-0">
        <div className="h-11 flex items-center justify-between px-3 border-b border-[var(--border)]">
          <span className="text-xs font-medium text-[var(--text-primary)]">Slides</span>
          <button
            onClick={addSlide}
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlideIndex(i)}
              className={`group cursor-pointer rounded-lg overflow-hidden border transition-all ${
                i === activeSlideIndex
                  ? 'border-[var(--accent)] shadow-lg shadow-[var(--accent-muted)]'
                  : 'border-[var(--border)] hover:border-[var(--border-light)]'
              }`}
            >
              {/* Slide thumbnail */}
              <div
                className="aspect-video relative flex items-center justify-center p-3"
                style={{ backgroundColor: slide.background }}
              >
                <span className="text-[10px] text-[var(--text-secondary)] text-center leading-tight">
                  {slide.title}
                </span>
                <span className="absolute top-1 left-2 text-[9px] text-[var(--text-muted)]">{i + 1}</span>

                {/* Hover actions */}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity">
                  <button className="p-0.5 rounded bg-[var(--surface)]/80 text-[var(--text-muted)] hover:text-white">
                    <Copy size={10} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSlide(slide.id); }}
                    className="p-0.5 rounded bg-[var(--surface)]/80 text-[var(--text-muted)] hover:text-[var(--danger)]"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add slide */}
          <button
            onClick={addSlide}
            className="w-full aspect-video rounded-lg border border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-1 text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <Plus size={16} />
            <span className="text-[10px]">Add Slide</span>
          </button>
        </div>
      </div>

      {/* Main slide editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-11 bg-[var(--surface)] border-b border-[var(--border)] flex items-center px-4 gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
            <Type size={14} />
            Text
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
            <ImageIcon size={14} />
            Image
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
            <Square size={14} />
            Shape
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
            <Layout size={14} />
            Layout
          </button>

          <div className="w-px h-5 bg-[var(--border)]" />

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent)] hover:text-white transition-all">
            <Sparkles size={13} />
            AI: Generate Slide
          </button>

          <div className="flex-1" />

          <button
            onClick={toggleShareModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all"
          >
            <Share2 size={14} />
            Share
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={togglePresentMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-medium hover:bg-[var(--accent-hover)] transition-all"
          >
            <Play size={13} />
            Present
          </button>
        </div>

        {/* Slide Canvas */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[var(--background)]">
          {currentSlide && (
            <div
              className="w-full max-w-4xl aspect-video rounded-lg border border-[var(--border)] shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: currentSlide.background }}
            >
              {/* Slide content area */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
                {editingTitle === currentSlide.id ? (
                  <input
                    className="text-3xl font-bold text-white bg-transparent text-center outline-none border-b-2 border-[var(--accent)] pb-1"
                    value={currentSlide.title}
                    onChange={(e) => updateSlide(currentSlide.id, { title: e.target.value })}
                    onBlur={() => setEditingTitle(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(null)}
                    autoFocus
                  />
                ) : (
                  <h2
                    className="text-3xl font-bold text-white cursor-text hover:text-[var(--accent)] transition-colors"
                    onClick={() => setEditingTitle(currentSlide.id)}
                  >
                    {currentSlide.title}
                  </h2>
                )}
                <p className="text-sm text-[var(--text-muted)] mt-4 italic">Click to add content</p>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-purple-500 to-pink-500" />
                <div className="absolute top-6 right-8 text-[10px] text-[var(--text-muted)]">
                  nebia
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Speaker Notes */}
        <div className="h-28 bg-[var(--surface)] border-t border-[var(--border)] px-4 py-2 shrink-0">
          <div className="text-[10px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">Speaker Notes</div>
          {currentSlide && (
            <textarea
              className="w-full h-16 bg-transparent text-xs text-[var(--text-secondary)] outline-none resize-none leading-relaxed"
              value={currentSlide.notes}
              onChange={(e) => updateSlide(currentSlide.id, { notes: e.target.value })}
              placeholder="Add speaker notes..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
