// Discreet background particles on a 2D canvas (no WebGL). Loaded lazily, only on
// desktop, never with reduced motion or Save-Data. Paused off-screen and in hidden tabs.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
}

const COUNT = 70;
const MAX_DPR = 2;

export function startParticles(canvas: HTMLCanvasElement, stage: HTMLElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const colors = ['--mercy', '--severity', '--balance', '--fg'].map((v) =>
    getComputedStyle(stage).getPropertyValue(v).trim(),
  );
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.05 - Math.random() * 0.12,
      r: 0.6 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }));
  };

  let visible = false;
  let frame = 0;
  let last = 0;

  const draw = (now: number) => {
    frame = 0;
    const dt = Math.min(now - last, 50);
    last = now;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.x += p.vx * dt * 0.06;
      p.y += p.vy * dt * 0.06;
      if (p.y < -4) p.y = height + 4;
      if (p.x < -4) p.x = width + 4;
      if (p.x > width + 4) p.x = -4;
      const alpha = 0.15 + 0.25 * (0.5 + 0.5 * Math.sin(now / 1400 + p.phase));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = colors[i % colors.length] ?? '#fff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    schedule();
  };

  const schedule = () => {
    if (visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
  };

  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    last = performance.now();
    schedule();
  }).observe(stage);
  document.addEventListener('visibilitychange', () => {
    last = performance.now();
    schedule();
  });
  new ResizeObserver(resize).observe(canvas);
  resize();
}
