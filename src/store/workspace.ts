import { create } from 'zustand';
import { WorkspaceTab, PinupCard, Comment, Slide, Layer } from '@/types';
import { v4 as uuid } from 'uuid';

interface WorkspaceState {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  projectName: string;
  setProjectName: (name: string) => void;

  // Collaboration
  showComments: boolean;
  toggleComments: () => void;
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveComment: (id: string) => void;

  // Pinup Board
  pinupCards: PinupCard[];
  addPinupCard: (card: Omit<PinupCard, 'id' | 'zIndex'>) => void;
  updatePinupCard: (id: string, updates: Partial<PinupCard>) => void;
  removePinupCard: (id: string) => void;

  // Drawing
  drawingTool: string;
  setDrawingTool: (tool: string) => void;
  drawingColor: string;
  setDrawingColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  is3DMode: boolean;
  toggle3DMode: () => void;

  // Rendering
  renderStyle: string;
  setRenderStyle: (style: string) => void;
  renderQuality: 'draft' | 'medium' | 'high';
  setRenderQuality: (q: 'draft' | 'medium' | 'high') => void;

  // Post Processing
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  layers: Layer[];
  addLayer: (name: string) => void;
  toggleLayerVisibility: (id: string) => void;

  // Presentation
  slides: Slide[];
  activeSlideIndex: number;
  setActiveSlideIndex: (i: number) => void;
  addSlide: () => void;
  removeSlide: (id: string) => void;
  updateSlide: (id: string, updates: Partial<Slide>) => void;
  isPresentMode: boolean;
  togglePresentMode: () => void;

  // Share
  shareModalOpen: boolean;
  toggleShareModal: () => void;
}

export const useWorkspace = create<WorkspaceState>((set) => ({
  activeTab: 'pinup',
  setActiveTab: (tab) => set({ activeTab: tab }),
  projectName: 'Untitled Project',
  setProjectName: (name) => set({ projectName: name }),

  showComments: false,
  toggleComments: () => set((s) => ({ showComments: !s.showComments })),
  comments: [
    { id: '1', userId: 'u2', userName: 'Sarah Chen', text: 'Love the direction of this concept! Can we explore more organic forms?', timestamp: Date.now() - 3600000, resolved: false },
    { id: '2', userId: 'u3', userName: 'Alex Rivera', text: 'The material palette feels cohesive. Approved for next phase.', timestamp: Date.now() - 7200000, resolved: false },
  ],
  addComment: (comment) => set((s) => ({
    comments: [...s.comments, { ...comment, id: uuid(), timestamp: Date.now(), resolved: false }]
  })),
  resolveComment: (id) => set((s) => ({
    comments: s.comments.map(c => c.id === id ? { ...c, resolved: true } : c)
  })),

  pinupCards: [
    { id: '1', type: 'note', content: 'Explore biophilic design patterns\nfor the lobby area', x: 80, y: 80, width: 220, height: 160, color: '#6366f1', zIndex: 1 },
    { id: '2', type: 'note', content: 'Material research:\n- Corten steel\n- Reclaimed wood\n- Polished concrete', x: 340, y: 120, width: 220, height: 180, color: '#22c55e', zIndex: 2 },
    { id: '3', type: 'note', content: 'Client meeting notes:\nPrefers minimalist aesthetic\nBudget: $2.4M\nTimeline: 8 months', x: 600, y: 80, width: 240, height: 200, color: '#f59e0b', zIndex: 3 },
    { id: '4', type: 'text', content: 'INSPIRATION', x: 80, y: 300, width: 180, height: 50, color: '#ef4444', zIndex: 4 },
    { id: '5', type: 'note', content: 'Sustainability goals:\n- LEED Gold certification\n- Net-zero energy target\n- 40% recycled materials', x: 340, y: 350, width: 240, height: 180, color: '#8b5cf6', zIndex: 5 },
  ],
  addPinupCard: (card) => set((s) => ({
    pinupCards: [...s.pinupCards, { ...card, id: uuid(), zIndex: s.pinupCards.length + 1 }]
  })),
  updatePinupCard: (id, updates) => set((s) => ({
    pinupCards: s.pinupCards.map(c => c.id === id ? { ...c, ...updates } : c)
  })),
  removePinupCard: (id) => set((s) => ({
    pinupCards: s.pinupCards.filter(c => c.id !== id)
  })),

  drawingTool: 'select',
  setDrawingTool: (tool) => set({ drawingTool: tool }),
  drawingColor: '#6366f1',
  setDrawingColor: (color) => set({ drawingColor: color }),
  strokeWidth: 2,
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  is3DMode: false,
  toggle3DMode: () => set((s) => ({ is3DMode: !s.is3DMode })),

  renderStyle: 'realistic',
  setRenderStyle: (style) => set({ renderStyle: style }),
  renderQuality: 'high',
  setRenderQuality: (q) => set({ renderQuality: q }),

  activeFilter: 'none',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  layers: [
    { id: '1', name: 'Background', visible: true, locked: false, opacity: 100 },
    { id: '2', name: 'Render Layer', visible: true, locked: false, opacity: 100 },
    { id: '3', name: 'Annotations', visible: true, locked: false, opacity: 80 },
  ],
  addLayer: (name) => set((s) => ({
    layers: [...s.layers, { id: uuid(), name, visible: true, locked: false, opacity: 100 }]
  })),
  toggleLayerVisibility: (id) => set((s) => ({
    layers: s.layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l)
  })),

  slides: [
    { id: '1', title: 'Project Overview', elements: [], background: '#0f0f17', notes: 'Introduce the project scope and vision', order: 0 },
    { id: '2', title: 'Site Analysis', elements: [], background: '#0f0f17', notes: 'Present site conditions and constraints', order: 1 },
    { id: '3', title: 'Design Concept', elements: [], background: '#0f0f17', notes: 'Show the main design concept and parti', order: 2 },
    { id: '4', title: 'Floor Plans', elements: [], background: '#0f0f17', notes: 'Detailed floor plans for each level', order: 3 },
    { id: '5', title: 'Renderings', elements: [], background: '#0f0f17', notes: 'Key perspective views and renderings', order: 4 },
  ],
  activeSlideIndex: 0,
  setActiveSlideIndex: (i) => set({ activeSlideIndex: i }),
  addSlide: () => set((s) => ({
    slides: [...s.slides, {
      id: uuid(),
      title: `Slide ${s.slides.length + 1}`,
      elements: [],
      background: '#0f0f17',
      notes: '',
      order: s.slides.length,
    }]
  })),
  removeSlide: (id) => set((s) => ({
    slides: s.slides.filter(sl => sl.id !== id)
  })),
  updateSlide: (id, updates) => set((s) => ({
    slides: s.slides.map(sl => sl.id === id ? { ...sl, ...updates } : sl)
  })),
  isPresentMode: false,
  togglePresentMode: () => set((s) => ({ isPresentMode: !s.isPresentMode })),

  shareModalOpen: false,
  toggleShareModal: () => set((s) => ({ shareModalOpen: !s.shareModalOpen })),
}));
