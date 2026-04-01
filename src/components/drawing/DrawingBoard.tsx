'use client';

import { useWorkspace } from '@/store/workspace';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  MousePointer2,
  Pencil,
  Square,
  Circle,
  Minus,
  Type,
  Pentagon,
  Move,
  Box,
  Eraser,
  Ruler,
  Grid3X3,
  Sparkles,
} from 'lucide-react';

const tools = [
  { id: 'select', icon: <MousePointer2 size={16} />, label: 'Select' },
  { id: 'pen', icon: <Pencil size={16} />, label: 'Pen' },
  { id: 'line', icon: <Minus size={16} />, label: 'Line' },
  { id: 'rect', icon: <Square size={16} />, label: 'Rectangle' },
  { id: 'circle', icon: <Circle size={16} />, label: 'Circle' },
  { id: 'polygon', icon: <Pentagon size={16} />, label: 'Polygon' },
  { id: 'text', icon: <Type size={16} />, label: 'Text' },
  { id: 'move', icon: <Move size={16} />, label: 'Pan' },
  { id: 'eraser', icon: <Eraser size={16} />, label: 'Eraser' },
];

const colors = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#06b6d4', '#ffffff', '#a1a1aa'];
const strokeWidths = [1, 2, 3, 5, 8];

export default function DrawingBoard() {
  const { drawingTool, setDrawingTool, drawingColor, setDrawingColor, strokeWidth, setStrokeWidth, is3DMode, toggle3DMode } = useWorkspace();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<{points: {x: number; y: number}[]; color: string; width: number}[]>([]);
  const [currentPath, setCurrentPath] = useState<{x: number; y: number}[]>([]);
  const [showGrid, setShowGrid] = useState(true);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.stroke();
    }

    // Draw saved paths
    paths.forEach(path => {
      if (path.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      ctx.stroke();
    });

    // Draw current path
    if (currentPath.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = drawingColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }
      ctx.stroke();
    }

    // 3D mode indicator
    if (is3DMode) {
      ctx.save();
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // X axis (red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + 80, cy);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = '11px sans-serif';
      ctx.fillText('X', cx + 85, cy + 4);

      // Y axis (green)
      ctx.strokeStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy - 80);
      ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.fillText('Y', cx - 4, cy - 85);

      // Z axis (blue)
      ctx.strokeStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - 56, cy + 56);
      ctx.stroke();
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('Z', cx - 68, cy + 68);

      ctx.restore();
    }
  }, [paths, currentPath, drawingColor, strokeWidth, showGrid, is3DMode]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (drawingTool === 'select' || drawingTool === 'move') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDrawing(true);
    setCurrentPath([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCurrentPath(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPath.length > 1) {
      setPaths(prev => [...prev, { points: currentPath, color: drawingColor, width: strokeWidth }]);
    }
    setCurrentPath([]);
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Tool Panel */}
      <div className="w-12 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col items-center py-2 gap-0.5 shrink-0">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setDrawingTool(tool.id)}
            className={`tooltip w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              drawingTool === tool.id
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
            data-tooltip={tool.label}
          >
            {tool.icon}
          </button>
        ))}

        <div className="w-6 h-px bg-[var(--border)] my-1" />

        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`tooltip w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
            showGrid ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
          } hover:bg-[var(--surface-hover)]`}
          data-tooltip="Grid"
        >
          <Grid3X3 size={16} />
        </button>

        <button
          className="tooltip w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all"
          data-tooltip="Measure"
        >
          <Ruler size={16} />
        </button>

        <div className="flex-1" />

        <button
          onClick={toggle3DMode}
          className={`tooltip w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
            is3DMode
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
          }`}
          data-tooltip="3D Mode"
        >
          <Box size={16} />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        {/* Properties Panel */}
        <div className="absolute top-3 right-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3 space-y-3 w-48 shadow-lg">
          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">Stroke</div>
            <div className="flex gap-1">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setDrawingColor(color)}
                  className={`w-5 h-5 rounded-full transition-transform ${drawingColor === color ? 'scale-125 ring-2 ring-white/30' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">Width</div>
            <div className="flex gap-1">
              {strokeWidths.map(w => (
                <button
                  key={w}
                  onClick={() => setStrokeWidth(w)}
                  className={`flex-1 h-7 rounded flex items-center justify-center text-[10px] transition-all ${
                    strokeWidth === w ? 'bg-[var(--accent)] text-white' : 'bg-[var(--background)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  {w}px
                </button>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent)] hover:text-white transition-all">
            <Sparkles size={13} />
            AI: Sketch to 3D
          </button>
        </div>

        {/* Mode indicator */}
        {is3DMode && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-medium">
            <Box size={13} />
            3D Mode Active
          </div>
        )}
      </div>
    </div>
  );
}
