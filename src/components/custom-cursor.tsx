"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Authentic Belgrade Arbor (belgradearbor.rs) Silk Ribbon Cursor
 * 
 * Recreates the multi-filament spring-physics ribbon trail seen on belgradearbor.rs:
 * - 12 harmonic spring trail filaments
 * - Multi-node quadratic Bézier curve interpolation
 * - Kinetic fanning & trailing inertia with dampening & tension
 * - Additive ("lighter") composite blending for luminous golden sheen on dark slate
 * - ODELL Champagne Gold palette (hsla(35, 45%, 55%, 0.26))
 */

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

class TrailFilament {
  spring: number;
  friction: number;
  nodes: NodePoint[];
  private target: { x: number; y: number };
  private config: { dampening: number; tension: number; size: number };

  constructor(
    target: { x: number; y: number },
    springBase: number,
    frictionBase: number,
    config: { dampening: number; tension: number; size: number }
  ) {
    this.target = target;
    this.config = config;
    this.spring = springBase + (Math.random() * 0.08 - 0.02);
    this.friction = frictionBase + (Math.random() * 0.015 - 0.003);
    this.nodes = [];

    for (let i = 0; i < config.size; i++) {
      this.nodes.push({
        x: target.x,
        y: target.y,
        vx: 0,
        vy: 0,
      });
    }
  }

  update() {
    let currentSpring = this.spring;
    const first = this.nodes[0];

    // Node 0 tracks mouse target
    first.vx += (this.target.x - first.x) * currentSpring;
    first.vy += (this.target.y - first.y) * currentSpring;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * currentSpring;
        node.vy += (prev.y - node.y) * currentSpring;
        node.vx += prev.vx * this.config.dampening;
        node.vy += prev.vy * this.config.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      currentSpring *= this.config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.nodes.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.nodes[0].x, this.nodes[0].y);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const curr = this.nodes[i];
      const next = this.nodes[i + 1];
      const midX = 0.5 * (curr.x + next.x);
      const midY = 0.5 * (curr.y + next.y);
      ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
    }

    const pPenultimate = this.nodes[this.nodes.length - 2];
    const pLast = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(pPenultimate.x, pPenultimate.y, pLast.x, pLast.y);

    ctx.stroke();
    ctx.closePath();
  }
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only mount on devices that support fine mouse pointers (desktops & laptops)
    const mediaQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setIsSupported(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsSupported(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;

    const mousePos = { x: -1000, y: -1000 };
    const trails: TrailFilament[] = [];

    // Exact Belgrade Arbor physics coefficients
    const physicsConfig = {
      friction: 0.5,
      trails: 12,
      size: 11,
      dampening: 0.1,
      tension: 0.98,
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    const renderLoop = () => {
      if (!isRunning) return;

      // Clear previous frame
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Additive blending for luminous golden ribbon shimmer
      ctx.globalCompositeOperation = "lighter";
      // Exact warm champagne gold palette matching ODELL #B8956F and Belgrade Arbor hsla
      ctx.strokeStyle = "hsla(34.2, 42%, 52%, 0.24)";
      ctx.lineWidth = 1;

      for (let i = 0; i < trails.length; i++) {
        trails[i].update();
        trails[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const updateMouseCoords = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length > 0) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        mousePos.x = (e as MouseEvent).clientX;
        mousePos.y = (e as MouseEvent).clientY;
      }
    };

    // First interaction initializer (mimicking Belgrade Arbor bootstrap)
    const onFirstMove = (e: MouseEvent | TouchEvent) => {
      updateMouseCoords(e);

      // Initialize all trails originating at the entry point
      trails.length = 0;
      for (let i = 0; i < physicsConfig.trails; i++) {
        const spring = 0.4 + (i / physicsConfig.trails) * 0.025;
        trails.push(new TrailFilament(mousePos, spring, physicsConfig.friction, physicsConfig));
      }

      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("touchstart", onFirstMove);

      window.addEventListener("mousemove", updateMouseCoords, { passive: true });
      window.addEventListener("touchmove", updateMouseCoords, { passive: true });

      isRunning = true;
      renderLoop();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("orientationchange", resizeCanvas);

    window.addEventListener("mousemove", onFirstMove, { passive: true });
    window.addEventListener("touchstart", onFirstMove, { passive: true });

    const handleFocus = () => {
      if (!isRunning && trails.length > 0) {
        isRunning = true;
        renderLoop();
      }
    };

    const handleBlur = () => {
      // Keep running or pause gently
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("touchstart", onFirstMove);
      window.removeEventListener("mousemove", updateMouseCoords);
      window.removeEventListener("touchmove", updateMouseCoords);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isSupported]);

  if (!isSupported) return null;

  return (
    <canvas
      ref={canvasRef}
      id="belgrade-arbor-cursor"
      className="pointer-events-none fixed inset-0 z-[9999] block w-full h-full"
    />
  );
}
