export type WorkspaceTab = 'pinup' | 'drawing' | 'rendering' | 'postprocessing' | 'presentation';

export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
  position?: { x: number; y: number };
  resolved: boolean;
}

export interface PinupCard {
  id: string;
  type: 'note' | 'image' | 'link' | 'text';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  zIndex: number;
}

export interface DrawingElement {
  id: string;
  type: 'line' | 'rect' | 'circle' | 'polygon' | 'freehand' | 'text';
  points: { x: number; y: number }[];
  stroke: string;
  strokeWidth: number;
  fill: string;
  is3D: boolean;
  depth?: number;
}

export interface Slide {
  id: string;
  title: string;
  elements: SlideElement[];
  background: string;
  notes: string;
  order: number;
}

export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'render';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: Record<string, string>;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
}

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  collaborators: User[];
}
