import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ScrollTriggerSequence.css';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  overlay?: React.ReactNode;
}

interface BreakpointConfig {
  count: number;
  path: string;
  end: string;
}

const CONFIG: Record<string, BreakpointConfig> = {
  desktop: { count: 96, path: '/images/scroll-trigger/desktop/', end: '+=1800' },
  tablet:  { count: 80, path: '/images/scroll-trigger/tablet/',  end: '+=1400' },
  mobile:  { count: 64, path: '/images/scroll-trigger/mobile/',  end: '+=500' },
};

function getBreakpoint(): string {
  const w = window.innerWidth;
  if (w >= 1024) return 'desktop';
  if (w >= 768)  return 'tablet';
  return 'mobile';
}

function framePad(n: number): string {
  return String(n).padStart(4, '0');
}

// Desktop/tablet: object-cover — fills canvas, crops edges
// Mobile: fill-width — scales to canvas width, centers vertically, off-white bg fills remainder
function drawFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  breakpoint: string,
): void {
  if (breakpoint === 'mobile') {
    // Fill off-white bg first
    ctx.fillStyle = '#F7F7F3';
    ctx.fillRect(0, 0, cw, ch);
    // Scale to fill canvas width; preserve aspect ratio; center vertically
    const scale = cw / img.naturalWidth;
    const sw = cw;
    const sh = img.naturalHeight * scale;
    const sy = (ch - sh) / 2;
    ctx.drawImage(img, 0, sy, sw, sh);
  } else if (breakpoint === 'tablet') {
    // Object-cover: fills the canvas, shifted right to preserve right-side content
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const sx = (cw - sw) * 0.75;
    const sy = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  } else {
    // Desktop: object-cover, center-cropped
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }
}

export default function ScrollTriggerSequence({ overlay }: Props) {
  const sectionRef   = useRef<HTMLElement>(null);
  const pinRef       = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameIdxRef  = useRef(0);
  const bpRef        = useRef<string>(getBreakpoint());
  const rafRef       = useRef<number | null>(null);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const renderFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const img = framesRef.current[idx];
    if (!img?.complete) return;
    drawFrame(ctx, img, canvas.width / dpr, canvas.height / dpr, bpRef.current);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;
    const dpr = window.devicePixelRatio || 1;
    const w = sticky.clientWidth;
    const h = sticky.clientHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      (ctx as CanvasRenderingContext2D & { imageSmoothingQuality: string }).imageSmoothingQuality = 'high';
    }
    renderFrame(frameIdxRef.current);
  }, [renderFrame]);

  const loadFrames = useCallback((cfg: BreakpointConfig): Promise<HTMLImageElement[]> => {
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    return new Promise((resolve) => {
      for (let i = 1; i <= cfg.count; i++) {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === cfg.count) resolve(imgs);
        };
        img.src = `${cfg.path}frame-${framePad(i)}.webp`;
        imgs.push(img);
      }
    });
  }, []);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const initScrollTrigger = contextSafe((frames: HTMLImageElement[], cfg: BreakpointConfig) => {
    framesRef.current = frames;
    frameIdxRef.current = 0;
    renderFrame(0);

    const total = frames.length - 1;

    // CSS sticky handles the visual pin; ScrollTrigger only drives the frame scrub
    ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: cfg.end,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * total);
        if (idx === frameIdxRef.current) return;
        frameIdxRef.current = idx;
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          renderFrame(idx);
          rafRef.current = null;
        });
      },
    });
  });

  // Set pin-wrapper height based on breakpoint
  useEffect(() => {
    if (reducedMotion) return;
    const bp = getBreakpoint();
    const cfg = CONFIG[bp];
    const endNum = parseInt(cfg.end.replace('+=', ''), 10);
    const stickyH = bp === 'mobile' ? '60svh' : '100svh';
    if (pinRef.current) {
      pinRef.current.style.height = `calc(${stickyH} + ${endNum}px)`;
    }
  }, [reducedMotion]);

  // Resize observer
  useEffect(() => {
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    if (stickyRef.current) ro.observe(stickyRef.current);
    return () => ro.disconnect();
  }, [resizeCanvas]);

  // Main effect: load frames + init ScrollTrigger
  useEffect(() => {
    const bp = getBreakpoint();
    bpRef.current = bp;
    const cfg = CONFIG[bp];

    // Render first frame immediately to prevent blank canvas flash
    const firstImg = new Image();
    firstImg.onload = () => {
      if (framesRef.current.length === 0) {
        framesRef.current = [firstImg];
        renderFrame(0);
      }
    };
    firstImg.src = `${cfg.path}frame-0001.webp`;

    if (reducedMotion) return;

    loadFrames(cfg).then((frames) => {
      initScrollTrigger(frames, cfg);
    });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="st-section">
      <div ref={pinRef} className="st-pin-wrapper">
        <div ref={stickyRef} className="st-sticky">
          <canvas ref={canvasRef} className="st-canvas" aria-label="Animated sequence" />
          {overlay && <div className="st-overlay">{overlay}</div>}
          <p className="st-label">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}
