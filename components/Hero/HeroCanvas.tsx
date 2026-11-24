'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import type { MotionValue } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getFramePath } from '@/lib/frames';

interface HeroCanvasProps {
  progress: MotionValue<number>;
}

const PRELOAD_BATCH_SIZE = 50;
const PRELOAD_DELAY_MS = 100;

export function HeroCanvas({ progress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const totalFrames = isMobile ? 589 : 1009;
  const device = isMobile ? 'mobile' : 'desktop';

  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const lastRenderedFrameRef = useRef<number>(-1);
  const isRenderingRef = useRef<boolean>(false);
  const preloadAbortRef = useRef<boolean>(false);

  const drawScaledImage = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Cover scale calculation
      const hRatio = canvasWidth / img.naturalWidth;
      const vRatio = canvasHeight / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (canvasWidth - img.naturalWidth * ratio) / 2;
      const centerShiftY = (canvasHeight - img.naturalHeight * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        centerShiftX,
        centerShiftY,
        img.naturalWidth * ratio,
        img.naturalHeight * ratio
      );
    },
    []
  );

  // Render a specific frame index to canvas (with dirty check)
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dirty check — skip if we already rendered this frame
      if (frameIndex === lastRenderedFrameRef.current) return;

      let img = imagesRef.current.get(frameIndex);
      if (!img) {
        img = new Image();
        img.src = getFramePath(frameIndex, device);
        img.onload = () => {
          // Re-acquire ctx inside onload: the canvas may have been resized
          // since `renderFrame` was called, making the outer `ctx` stale.
          const currentCanvas = canvasRef.current;
          if (currentFrameRef.current === frameIndex && currentCanvas) {
            const freshCtx = currentCanvas.getContext('2d');
            if (freshCtx) {
              drawScaledImage(freshCtx, img!, currentCanvas.width, currentCanvas.height);
              lastRenderedFrameRef.current = frameIndex;
            }
          }
        };
        imagesRef.current.set(frameIndex, img);
        return;
      }

      if (img.complete && img.naturalWidth > 0) {
        drawScaledImage(ctx, img, canvas.width, canvas.height);
        lastRenderedFrameRef.current = frameIndex;
      }
    },
    [device, drawScaledImage]
  );

  // Clear image cache when device changes (P0 fix: memory leak)
  useEffect(() => {
    // Abort any in-progress preloading
    preloadAbortRef.current = true;

    // Clear stale images from previous device
    imagesRef.current.clear();
    lastRenderedFrameRef.current = -1;

    // Allow new preloading
    preloadAbortRef.current = false;
  }, [device]);

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      lastRenderedFrameRef.current = -1; // Force re-render after resize
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device, renderFrame]);

  // Progressive background preloading in batches (P1 fix)
  useEffect(() => {
    preloadAbortRef.current = false;

    const preloadBatch = (startIndex: number) => {
      if (preloadAbortRef.current) return;

      const endIndex = Math.min(startIndex + PRELOAD_BATCH_SIZE, totalFrames + 1);

      for (let i = startIndex; i < endIndex; i++) {
        if (!imagesRef.current.has(i)) {
          const img = new Image();
          img.src = getFramePath(i, device);
          imagesRef.current.set(i, img);
        }
      }

      if (endIndex <= totalFrames) {
        setTimeout(() => preloadBatch(endIndex), PRELOAD_DELAY_MS);
      }
    };

    // Start preloading from frame 1
    preloadBatch(1);

    return () => {
      preloadAbortRef.current = true;
    };
  }, [device, totalFrames]);

  // Sync scroll progress to canvas frames
  useEffect(() => {
    const unsubscribe = progress.on('change', (val) => {
      const clamped = Math.max(0, Math.min(1, val));
      const targetIndex = Math.min(
        totalFrames,
        Math.max(1, Math.floor(clamped * (totalFrames - 1)) + 1)
      );

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;
        if (!isRenderingRef.current) {
          isRenderingRef.current = true;
          requestAnimationFrame(() => {
            renderFrame(currentFrameRef.current);
            isRenderingRef.current = false;
          });
        }
      }
    });

    renderFrame(1);
    return () => unsubscribe();
  }, [progress, totalFrames, device, renderFrame]);

  return (
    <canvas
      ref={canvasRef}
      // `object-cover` has no effect on <canvas>; sizing is handled by the
      // DPR-aware resize handler above. CSS width/height fill the container.
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
