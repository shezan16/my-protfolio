import { useEffect, useRef } from "react";

interface CursorRevealPhotoProps {
  baseImage: string;
  revealImage: string;
  alt?: string;
  brushRadius?: number;
  fadeSpeed?: number;
  className?: string;
}

interface Stamp {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function CursorRevealPhoto({
  baseImage,
  revealImage,
  alt = "Interactive portrait",
  brushRadius = 42,
  fadeSpeed = 0.012,
  className = "",
}: CursorRevealPhotoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const isImgLoadedRef = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = revealImage;
    img.onload = () => {
      revealImgRef.current = img;
      isImgLoadedRef.current = true;
    };
  }, [revealImage]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(wrapper);

    let rafId = 0;

    const render = () => {
      const rect = wrapper.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const img = revealImgRef.current;
      const stamps = stampsRef.current;

      if (img && isImgLoadedRef.current && stamps.length > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const boxRatio = width / height;

        let drawW = width;
        let drawH = height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > boxRatio) {
          drawW = height * imgRatio;
          offsetX = (width - drawW) / 2;
        } else {
          drawH = width / imgRatio;
          offsetY = (height - drawH) / 2;
        }

        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const maskCtx = maskCanvas.getContext("2d");

        if (maskCtx) {
          const dpr = canvas.width / Math.max(1, width);
          maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const nextStamps: Stamp[] = [];

          for (const s of stamps) {
            if (s.alpha > 0.01) {
              maskCtx.save();
              maskCtx.globalAlpha = Math.min(1, s.alpha);
              maskCtx.beginPath();
              maskCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
              maskCtx.fillStyle = "#ffffff";
              maskCtx.fill();
              maskCtx.restore();

              nextStamps.push({
                ...s,
                alpha: fadeSpeed > 0 ? s.alpha - fadeSpeed : s.alpha,
              });
            }
          }

          stampsRef.current = nextStamps;

          const tempImgCanvas = document.createElement("canvas");
          tempImgCanvas.width = canvas.width;
          tempImgCanvas.height = canvas.height;
          const tempCtx = tempImgCanvas.getContext("2d");

          if (tempCtx) {
            tempCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            tempCtx.drawImage(img, offsetX, offsetY, drawW, drawH);
            tempCtx.globalCompositeOperation = "destination-in";
            tempCtx.drawImage(maskCanvas, 0, 0, width, height);

            ctx.drawImage(tempImgCanvas, 0, 0, width, height);
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [fadeSpeed]);

  const addTrailPoints = (clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const prev = lastPosRef.current;
    if (!prev) {
      stampsRef.current.push({ x, y, radius: brushRadius, alpha: 1 });
      lastPosRef.current = { x, y };
      return;
    }

    const dx = x - prev.x;
    const dy = y - prev.y;
    const dist = Math.hypot(dx, dy);
    const step = Math.max(6, brushRadius * 0.22);
    const steps = Math.max(1, Math.floor(dist / step));

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      stampsRef.current.push({
        x: prev.x + dx * t,
        y: prev.y + dy * t,
        radius: brushRadius,
        alpha: 1,
      });
    }

    lastPosRef.current = { x, y };
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={(e) => addTrailPoints(e.clientX, e.clientY)}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) addTrailPoints(touch.clientX, touch.clientY);
      }}
      onTouchEnd={() => {
        lastPosRef.current = null;
      }}
      className={`relative select-none overflow-hidden ${className}`}
    >
      <img
        src={baseImage}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover"
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}