'use client';

import { useWorkspace } from '@/store/workspace';
import { useRef, useEffect, useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Cloud,
  Droplets,
  TreePine,
  Building2,
  Camera,
  RotateCcw,
  Download,
  Play,
  Loader2,
  Eye,
  Sliders,
} from 'lucide-react';

const renderStyles = [
  { id: 'realistic', label: 'Photorealistic', icon: <Camera size={14} /> },
  { id: 'watercolor', label: 'Watercolor', icon: <Droplets size={14} /> },
  { id: 'sketch', label: 'Pencil Sketch', icon: <Sliders size={14} /> },
  { id: 'clay', label: 'Clay Model', icon: <Building2 size={14} /> },
];

const envPresets = [
  { id: 'daylight', label: 'Daylight', icon: <Sun size={14} /> },
  { id: 'sunset', label: 'Golden Hour', icon: <Sun size={14} /> },
  { id: 'night', label: 'Night', icon: <Moon size={14} /> },
  { id: 'overcast', label: 'Overcast', icon: <Cloud size={14} /> },
];

export default function RenderingView() {
  const { renderStyle, setRenderStyle, renderQuality, setRenderQuality } = useWorkspace();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [selectedEnv, setSelectedEnv] = useState('daylight');
  const [showResult, setShowResult] = useState(false);

  // Draw a 3D-like scene preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const w = canvas.width;
    const h = canvas.height;

    // Sky gradient based on environment
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    if (selectedEnv === 'daylight') {
      skyGrad.addColorStop(0, '#1a1a3e');
      skyGrad.addColorStop(1, '#2d2b55');
    } else if (selectedEnv === 'sunset') {
      skyGrad.addColorStop(0, '#1a1a2e');
      skyGrad.addColorStop(1, '#4a2040');
    } else if (selectedEnv === 'night') {
      skyGrad.addColorStop(0, '#0a0a15');
      skyGrad.addColorStop(1, '#151520');
    } else {
      skyGrad.addColorStop(0, '#1a1a2a');
      skyGrad.addColorStop(1, '#2a2a3a');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Ground plane
    const groundGrad = ctx.createLinearGradient(0, h * 0.55, 0, h);
    groundGrad.addColorStop(0, '#1a1a25');
    groundGrad.addColorStop(1, '#0f0f15');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, h * 0.55, w, h * 0.45);

    // Ground grid
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const y = h * 0.55 + (i * h * 0.45) / 20;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let i = 0; i < 30; i++) {
      const x = (i * w) / 30;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.55);
      ctx.lineTo(w / 2 + (x - w / 2) * 0.3, h);
      ctx.stroke();
    }

    // Building - main block
    const bx = w * 0.3;
    const by = h * 0.2;
    const bw = w * 0.4;
    const bh = h * 0.35;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.moveTo(bx + bw, by + bh);
    ctx.lineTo(bx + bw + 60, by + bh + 40);
    ctx.lineTo(bx + bw + 60, h * 0.55);
    ctx.lineTo(bx + bw, h * 0.55);
    ctx.fill();

    // Front face
    const faceGrad = ctx.createLinearGradient(bx, by, bx, by + bh);
    faceGrad.addColorStop(0, '#2a2a40');
    faceGrad.addColorStop(1, '#1f1f35');
    ctx.fillStyle = faceGrad;
    ctx.fillRect(bx, by, bw, bh);

    // Side face (3D perspective)
    ctx.fillStyle = '#1a1a30';
    ctx.beginPath();
    ctx.moveTo(bx + bw, by);
    ctx.lineTo(bx + bw + 60, by - 20);
    ctx.lineTo(bx + bw + 60, by + bh + 40);
    ctx.lineTo(bx + bw, by + bh);
    ctx.fill();

    // Top face
    ctx.fillStyle = '#35355a';
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + 60, by - 20);
    ctx.lineTo(bx + bw + 60, by - 20);
    ctx.lineTo(bx + bw, by);
    ctx.fill();

    // Windows
    const windowRows = 5;
    const windowCols = 6;
    for (let r = 0; r < windowRows; r++) {
      for (let c = 0; c < windowCols; c++) {
        const wx = bx + 15 + c * ((bw - 30) / windowCols);
        const wy = by + 15 + r * ((bh - 30) / windowRows);
        const ww = (bw - 30) / windowCols - 8;
        const wh = (bh - 30) / windowRows - 8;

        const lit = Math.random() > 0.4;
        ctx.fillStyle = lit
          ? `rgba(99, 102, 241, ${0.3 + Math.random() * 0.3})`
          : 'rgba(30, 30, 50, 0.8)';
        ctx.fillRect(wx, wy, ww, wh);
      }
    }

    // Accent bar
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(bx, by + bh - 4, bw, 4);

    // Trees (simple)
    const drawTree = (tx: number, ty: number, size: number) => {
      ctx.fillStyle = '#1a3a1a';
      ctx.beginPath();
      ctx.arc(tx, ty - size * 0.6, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2a2a20';
      ctx.fillRect(tx - 3, ty - size * 0.3, 6, size * 0.5);
    };
    drawTree(w * 0.15, h * 0.52, 20);
    drawTree(w * 0.8, h * 0.5, 25);
    drawTree(w * 0.85, h * 0.53, 18);

    // Render overlay effect
    if (showResult) {
      ctx.fillStyle = 'rgba(99, 102, 241, 0.02)';
      ctx.fillRect(0, 0, w, h);

      // Vignette
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7);
      vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vigGrad.addColorStop(1, 'rgba(0,0,0,0.4)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);
    }
  }, [selectedEnv, showResult]);

  const handleRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    setShowResult(false);

    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setShowResult(true);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Settings */}
      <div className="w-64 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col shrink-0 overflow-y-auto">
        <div className="p-4 space-y-5">
          {/* Render Style */}
          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-wider font-medium">Render Style</div>
            <div className="space-y-1">
              {renderStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setRenderStyle(style.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    renderStyle === style.id
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  {style.icon}
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-wider font-medium">Environment</div>
            <div className="grid grid-cols-2 gap-1">
              {envPresets.map(env => (
                <button
                  key={env.id}
                  onClick={() => setSelectedEnv(env.id)}
                  className={`flex items-center gap-1.5 px-2 py-2 rounded-lg text-[11px] transition-all ${
                    selectedEnv === env.id
                      ? 'bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]'
                      : 'bg-[var(--background)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-light)]'
                  }`}
                >
                  {env.icon}
                  {env.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-wider font-medium">Quality</div>
            <div className="flex gap-1">
              {(['draft', 'medium', 'high'] as const).map(q => (
                <button
                  key={q}
                  onClick={() => setRenderQuality(q)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    renderQuality === q
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--background)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {q.charAt(0).toUpperCase() + q.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* AI Settings */}
          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-wider font-medium">AI Enhancement</div>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-secondary)]">Auto-landscaping</span>
                <div className="w-8 h-4 rounded-full bg-[var(--accent)] relative cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white absolute right-0.5 top-0.5" />
                </div>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-secondary)]">Material AI</span>
                <div className="w-8 h-4 rounded-full bg-[var(--accent)] relative cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white absolute right-0.5 top-0.5" />
                </div>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-secondary)]">People & cars</span>
                <div className="w-8 h-4 rounded-full bg-[var(--border)] relative cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-[var(--text-muted)] absolute left-0.5 top-0.5" />
                </div>
              </label>
            </div>
          </div>

          {/* AI Prompt */}
          <div>
            <div className="text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-wider font-medium">AI Scene Prompt</div>
            <textarea
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors resize-none"
              rows={3}
              placeholder="Describe the scene atmosphere, materials, lighting..."
              defaultValue="Modern glass facade with warm interior lighting, surrounded by mature landscaping at golden hour"
            />
          </div>
        </div>

        {/* Render Button */}
        <div className="p-4 mt-auto border-t border-[var(--border)]">
          <button
            onClick={handleRender}
            disabled={isRendering}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] disabled:opacity-60 transition-all"
          >
            {isRendering ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Rendering... {Math.min(100, Math.round(renderProgress))}%
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Render
              </>
            )}
          </button>
          {isRendering && (
            <div className="mt-2 h-1 rounded-full bg-[var(--background)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-200"
                style={{ width: `${Math.min(100, renderProgress)}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Viewport controls */}
        <div className="absolute top-3 right-3 flex gap-1">
          <button className="p-2 rounded-lg bg-[var(--surface)]/80 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] backdrop-blur-sm">
            <RotateCcw size={14} />
          </button>
          <button className="p-2 rounded-lg bg-[var(--surface)]/80 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] backdrop-blur-sm">
            <Eye size={14} />
          </button>
          <button className="p-2 rounded-lg bg-[var(--surface)]/80 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] backdrop-blur-sm">
            <Download size={14} />
          </button>
        </div>

        {/* Render complete overlay */}
        {showResult && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--success)]/20 border border-[var(--success)]/30 text-[var(--success)] text-xs font-medium backdrop-blur-sm">
            <Sparkles size={13} />
            Render complete — {renderStyle} style, {renderQuality} quality
          </div>
        )}
      </div>
    </div>
  );
}
