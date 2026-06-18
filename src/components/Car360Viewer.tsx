"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Car360ViewerProps {
  frames: string[];
  alt: string;
  className?: string;
}

const FRAME_COUNT = 36;
const PIXELS_PER_FRAME = 6;

export default function Car360Viewer({
  frames,
  alt,
  className = "",
}: Car360ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const startXRef = useRef(0);
  const indexRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (frames.length === 0) return;

    let cancelled = false;
    setLoaded(false);
    setCurrentIndex(0);
    indexRef.current = 0;

    Promise.all(
      frames.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(src));
            img.src = src;
          }),
      ),
    )
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  const rotate = useCallback((clientX: number) => {
    const delta = clientX - startXRef.current;
    const step = Math.round(delta / PIXELS_PER_FRAME);
    if (step === 0) return;

    let next = indexRef.current + step;
    if (next >= FRAME_COUNT) next %= FRAME_COUNT;
    if (next < 0) next = ((next % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;

    indexRef.current = next;
    setCurrentIndex(next);
    startXRef.current = clientX;
    setShowHint(false);
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      wrapperRef.current?.setPointerCapture(event.pointerId);
      setIsDragging(true);
      startXRef.current = event.clientX;
      setShowHint(false);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      rotate(event.clientX);
    },
    [isDragging, rotate],
  );

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (wrapperRef.current?.hasPointerCapture(event.pointerId)) {
      wrapperRef.current.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }, []);

  if (frames.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      className={`car-360-viewer${isDragging ? " is-dragging" : ""} ${className}`.trim()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label={`${alt} 360 degree view. Drag to rotate.`}
    >
      {!loaded && <div className="car-360-loading">Loading…</div>}
      <img
        src={frames[currentIndex] ?? frames[0]}
        alt={alt}
        className="img-fluid car-360-image"
        draggable={false}
      />
      {showHint && loaded && (
        <div className="car-360-hint" aria-hidden>
          <span>Drag to rotate</span>
        </div>
      )}
    </div>
  );
}
