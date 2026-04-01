'use client';

import { useWorkspace } from '@/store/workspace';
import { useRef, useEffect, useState } from 'react';
import {
  MousePointer2,
  Paintbrush,
  Eraser,
  Type,
  Pipette,
  Crop,
  Move,
  Wand2,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Plus,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

const ppTools = [
  { id: 'select', icon: <MousePointer2 size={16} />, label: 'Select' },
  { id: 'move', icon: <Move size={16} />, label: 'Move' },
  { id: 'brush', icon: <Paintbrush size={16} />, label: 'Brush' },
  { id: 'eraser', icon: <Eraser size={16} />, label: 'Eraser' },
  { id: 'text', icon: <Type size={16} />, label: 'Text' },
  { id: 'crop', icon: <Crop size={16} />, label: 'Crop' },
  { id: 'eyedropper', icon: <Pipette size={16} />, label: 'Eyedropper' },
  { id: 'magic', icon: <Wand2 size={16} />, label: 'Magic Select' },
];

const filters = [
  { id: 'none', label: 'Original' },
  { id: 'vivid', label: 'Vivid' },
  { id: 'moody', label: 'Moody' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
  { id: 'bw', label: 'B&W' },
  { id: 'blueprint', label: 'Blueprint' },
];

const adjustments = [
  { id: 'brightness', label: 'Brightness', value: 50 },
  { id: 'contrast', label: 'Contrast', value: 55 },
  { id: 'saturation', label: 'Saturation', value: 45 },
  { id: 'exposure', label: 'Exposure', value: 50 },
  { id: 'highlights', label: 'Highlights', value: 60 },
  { id: 'shadows', label: 'Shadows', value: 40 },
  { id: 'sharpness', label: 'Sharpness', value: 30 },
];

export default function PostProcessingView() {
  const { activeFilter, setActiveFilter, layers, addLayer, toggleLayerVisibility } = useWorkspace();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState('select');
  const [adjValues, setAdjValues] = useState(adjustments.map(a => a.value));
  const [showAdjustments, setShowAdjustments] = useState(true);
  const [showLayers, setShowLayers] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const w = canvas.width;
    const h = canvas.height;

    // Draw a rendered building scene (post-processing version)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, '#1a1a3e');
    skyGrad.addColorStop(1, '#2d2040');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Ground
    const groundGrad = ctx.createLinearGradient(0, h * 0.55, 0, h);
    groundGrad.addColorStop(0, '#1a1a25');
    groundGrad.addColorStop(1, '#0f0f15');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // Building
    const bx = w * 0.25;
    const by = h * 0.15;
    const bw = w * 0.5;
    const bh = h * 0.4;

    ctx.fillStyle = '#252545';
    ctx.fillRect(bx, by, bw, bh);

    // Glass facade
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 8; c++) {
        const wx = bx + 10 + c * ((bw - 20) / 8);
        const wy = by + 10 + r * ((bh - 20) / 6);
        const ww = (bw - 20) / 8 - 5;
        const wh = (bh - 20) / 6 - 5;
        const lit = Math.random() > 0.3;
        ctx.fillStyle = lit ? `rgba(99, 102, 241, ${0.2 + Math.random() * 0.4})` : 'rgba(20, 20, 40, 0.8)';
        ctx.fillRect(wx, wy, ww, wh);
      }
    }

    // Reflection on ground
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(bx + 20, h * 0.55, bw - 40, h * 0.15);
    ctx.globalAlpha = 1;

    // Apply filter effect
    if (activeFilter === 'warm') {
      ctx.fillStyle = 'rgba(255, 160, 50, 0.08)';
      ctx.fillRect(0, 0, w, h);
    } else if (activeFilter === 'cool') {
      ctx.fillStyle = 'rgba(50, 100, 255, 0.08)';
      ctx.fillRect(0, 0, w, h);
    } else if (activeFilter === 'moody') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, w, h);
    } else if (activeFilter === 'bw') {
      // Simple desaturation overlay
      ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
      ctx.globalCompositeOperation = 'saturation';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    } else if (activeFilter === 'blueprint') {
      ctx.fillStyle = 'rgba(0, 30, 80, 0.4)';
      ctx.fillRect(0, 0, w, h);
    }

    // Annotation overlay example
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(bx - 20, by - 20, bw + 40, bh + 40);
    ctx.setLineDash([]);

    // Label
    ctx.fillStyle = '#6366f1';
    ctx.font = '11px system-ui';
    ctx.fillText('Main Elevation — Scale 1:200', bx - 15, by - 28);

    // Dimension line
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, by + bh + 20);
    ctx.lineTo(bx + bw, by + bh + 20);
    ctx.stroke();
    ctx.fillStyle = '#22c55e';
    ctx.fillText('48.5m', bx + bw / 2 - 15, by + bh + 35);
  }, [activeFilter]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Tool Panel */}
      <div className="w-12 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col items-center py-2 gap-0.5 shrink-0">
        {ppTools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`tooltip w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              activeTool === tool.id
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
            data-tooltip={tool.label}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Filter strip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-[var(--surface)]/90 border border-[var(--border)] rounded-lg p-1.5 backdrop-blur-sm">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded text-[11px] font-medium transition-all ${
                activeFilter === f.id
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* AI enhance button */}
        <div className="absolute top-3 left-3">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--surface)]/90 border border-[var(--border)] text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent)] hover:text-white transition-all backdrop-blur-sm">
            <Sparkles size={13} />
            AI Enhance
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-60 bg-[var(--surface)] border-l border-[var(--border)] flex flex-col shrink-0 overflow-y-auto">
        {/* Adjustments */}
        <div className="border-b border-[var(--border)]">
          <button
            onClick={() => setShowAdjustments(!showAdjustments)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-[var(--text-muted)]" />
              <span className="text-xs font-medium text-[var(--text-primary)]">Adjustments</span>
            </div>
            <ChevronDown size={13} className={`text-[var(--text-muted)] transition-transform ${showAdjustments ? '' : '-rotate-90'}`} />
          </button>
          {showAdjustments && (
            <div className="px-4 pb-3 space-y-2.5">
              {adjustments.map((adj, i) => (
                <div key={adj.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[var(--text-muted)]">{adj.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{adjValues[i]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={adjValues[i]}
                    onChange={(e) => {
                      const newValues = [...adjValues];
                      newValues[i] = parseInt(e.target.value);
                      setAdjValues(newValues);
                    }}
                    className="w-full h-1 rounded-full appearance-none bg-[var(--border)] accent-[var(--accent)]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Layers */}
        <div>
          <button
            onClick={() => setShowLayers(!showLayers)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <Layers size={13} className="text-[var(--text-muted)]" />
              <span className="text-xs font-medium text-[var(--text-primary)]">Layers</span>
            </div>
            <ChevronDown size={13} className={`text-[var(--text-muted)] transition-transform ${showLayers ? '' : '-rotate-90'}`} />
          </button>
          {showLayers && (
            <div className="px-3 pb-3 space-y-1">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[var(--surface-hover)] group"
                >
                  <button
                    onClick={() => toggleLayerVisibility(layer.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  >
                    {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <span className="text-[11px] text-[var(--text-secondary)] flex-1">{layer.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{layer.opacity}%</span>
                </div>
              ))}
              <button
                onClick={() => addLayer(`Layer ${layers.length + 1}`)}
                className="w-full flex items-center justify-center gap-1 py-1.5 rounded border border-dashed border-[var(--border)] text-[11px] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <Plus size={12} />
                Add Layer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
