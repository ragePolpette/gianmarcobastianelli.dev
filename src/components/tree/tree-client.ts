// Progressive enhancement for the project tree. Without this script the tree is
// a static SVG of plain links and the list view is shown below it.

type View = 'tree' | 'list';

const VIEW_KEY = 'gb.view';
const IGNITE_STEP_MS = 110;

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => matchMedia('(min-width: 64rem)').matches;
const COMPACT_QUERY = '(max-width: 63.99rem)';
const isCompact = () => matchMedia(COMPACT_QUERY).matches;
const AMBIENT_EVERY_MS = 2200;
const AMBIENT_HOLD_MS = 1600;

function readView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'tree';
  } catch {
    return 'tree';
  }
}

function writeView(view: View): void {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch {
    // Storage can be unavailable (private mode, blocked site data): the toggle still works.
  }
}

function setupViewSwitch(root: HTMLElement): void {
  const group = root.querySelector<HTMLElement>('[data-switch]');
  if (!group) return;
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('[data-view-btn]')];
  const apply = (view: View) => {
    root.dataset['view'] = view;
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset['viewBtn'] === view));
  };
  for (const b of buttons) {
    b.addEventListener('click', () => {
      const view = b.dataset['viewBtn'] === 'list' ? 'list' : 'tree';
      apply(view);
      writeView(view);
    });
  }
  group.hidden = false;
  apply(readView());
}

function setupPreview(root: HTMLElement, stage: HTMLElement): void {
  const panels = new Map<string, HTMLElement>();
  for (const el of root.querySelectorAll<HTMLElement>('[data-preview]')) {
    panels.set(el.dataset['preview'] ?? '', el);
  }
  const pathsOf = (nodeId: string) =>
    stage.querySelectorAll<SVGGElement>(`.path[data-a="${nodeId}"], .path[data-b="${nodeId}"]`);

  let current: Element | null = null;
  // Touch: the first tap selects a node (caption below the tree), the second opens it.
  let selected: Element | null = null;
  const caption = root.querySelector<HTMLElement>('[data-caption]');

  const showCaption = (link: Element) => {
    if (!caption) return;
    const key = (link as SVGElement).dataset['key'] ?? '';
    const panel = panels.get(key);
    const line = (tag: string, cls: string, text: string) => {
      const el = document.createElement(tag);
      el.className = cls;
      el.textContent = text;
      return el;
    };
    const open = document.createElement('a');
    open.className = 'cap-open mono';
    open.href = link.getAttribute('href') ?? '#';
    open.textContent = `${caption.dataset['open'] ?? 'Open'} →`;
    caption.replaceChildren(
      line('p', 'cap-eyebrow mono', panel?.querySelector('.pv-seph')?.textContent?.trim() ?? ''),
      line('p', 'cap-title', panel?.querySelector('.pv-title')?.textContent?.trim() ?? ''),
      line('p', 'cap-text', panel?.querySelector('.pv-text')?.textContent?.trim() ?? ''),
      open,
    );
    const pillar = link.closest<SVGGElement>('.node')?.dataset['pillar'];
    if (pillar) caption.dataset['pillar'] = pillar;
  };

  const clear = () => {
    for (const el of stage.querySelectorAll('.active, .on, .rev')) {
      el.classList.remove('active', 'on', 'rev');
    }
    stage.classList.remove('assembled');
    for (const [key, el] of panels) el.hidden = key !== '';
    current = null;
  };

  const activate = (link: Element) => {
    if (link === current) return;
    clear();
    current = link;
    const key = (link as HTMLElement | SVGElement).dataset['key'] ?? '';
    const isSat = key.startsWith('sat:');
    const node = link.closest<SVGGElement>('.node');
    const nodeId = node?.dataset['node'] ?? '';

    if (isSat) {
      link.classList.add('active');
    } else {
      node?.classList.add('active');
      for (const p of pathsOf(nodeId)) {
        p.classList.add('on');
        // Energy flows away from the node being looked at.
        if (p.dataset['b'] === nodeId) p.classList.add('rev');
      }
      if (nodeId === 'base') stage.classList.add('assembled');
    }

    const accent = getComputedStyle(node ?? stage)
      .getPropertyValue('--accent')
      .trim();
    if (accent) root.style.setProperty('--active', accent);

    for (const [k, el] of panels) el.hidden = k !== key;
  };

  const links = stage.querySelectorAll<SVGAElement>('a[data-key]');
  for (const link of links) {
    link.addEventListener('pointerenter', () => activate(link));
    link.addEventListener('focus', () => activate(link));
    link.addEventListener('blur', () => {
      if (current === link) clear();
    });
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (isCompact() && selected !== link) {
        event.preventDefault();
        selected = link;
        activate(link);
        showCaption(link);
        return;
      }
      // The clicked title morphs into the project page heading (cross-document view transition).
      const title = link.querySelector<SVGTextElement>('.name, .sat-name');
      if (title) title.style.setProperty('view-transition-name', 'project-title');
    });
  }
  // Touch pointers "leave" as soon as the finger lifts: only a mouse leaving clears.
  stage.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') clear();
  });
  // Back/forward cache: drop the transition name so the restored page is clean.
  addEventListener('pageshow', () => {
    for (const el of stage.querySelectorAll<SVGTextElement>('.name, .sat-name')) {
      el.style.removeProperty('view-transition-name');
    }
    clear();
  });
}

function setupIgnition(stage: HTMLElement): void {
  if (reducedMotion()) return;
  const nodes = [...stage.querySelectorAll<SVGGElement>('.node')];
  const paths = [...stage.querySelectorAll<SVGGElement>('.path')];
  let timers: number[] = [];

  const turnOff = () => {
    for (const id of timers) clearTimeout(id);
    timers = [];
    for (const el of [...nodes, ...paths]) el.classList.remove('lit');
    stage.dataset['state'] = 'off';
  };

  const ignite = () => {
    const lit = new Set<string>();
    nodes.forEach((node, i) => {
      timers.push(
        window.setTimeout(() => {
          node.classList.add('lit');
          lit.add(node.dataset['node'] ?? '');
          for (const p of paths) {
            if (lit.has(p.dataset['a'] ?? '') && lit.has(p.dataset['b'] ?? '')) {
              p.classList.add('lit');
            }
          }
          if (i === nodes.length - 1) {
            timers.push(window.setTimeout(() => (stage.dataset['state'] = 'on'), 700));
          }
        }, i * IGNITE_STEP_MS),
      );
    });
  };

  // Already on screen at load: leave it lit rather than flashing it off.
  if (stage.getBoundingClientRect().top < innerHeight * 0.6) return;

  turnOff();
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        ignite();
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(stage);
}

// On touch screens there is no hover: every few seconds a random node sends energy
// along its paths, so the tree stays alive. Paused off-screen, in hidden tabs and
// while a node is selected.
function setupAmbient(stage: HTMLElement): void {
  if (reducedMotion() || matchMedia('(pointer: fine)').matches) return;
  const nodes = [...stage.querySelectorAll<SVGGElement>('.node:not([data-dormant])')];
  if (nodes.length === 0) return;
  let visible = false;
  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
  }).observe(stage);

  setInterval(() => {
    if (!visible || document.hidden || stage.querySelector('.node.active')) return;
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    if (!node) return;
    const id = node.dataset['node'] ?? '';
    const accent = getComputedStyle(node).getPropertyValue('--accent').trim();
    const paths = [
      ...stage.querySelectorAll<SVGGElement>(`.path[data-a="${id}"], .path[data-b="${id}"]`),
    ];
    node.classList.add('pulse');
    for (const p of paths) {
      p.style.setProperty('--pulse', accent);
      p.classList.add('pulse');
      if (p.dataset['b'] === id) p.classList.add('rev');
    }
    setTimeout(() => {
      node.classList.remove('pulse');
      for (const p of paths) p.classList.remove('pulse', 'rev');
    }, AMBIENT_HOLD_MS);
  }, AMBIENT_EVERY_MS);
}

// Small screens get a tighter, portrait framing of the same SVG (no side labels).
function setupViewBox(stage: HTMLElement): void {
  const svg = stage.querySelector<SVGSVGElement>('svg.tree-svg');
  const compact = svg?.dataset['compactViewbox'];
  const full = svg?.getAttribute('viewBox');
  if (!svg || !compact || !full) return;
  const mq = matchMedia(COMPACT_QUERY);
  const apply = () => svg.setAttribute('viewBox', mq.matches ? compact : full);
  mq.addEventListener('change', apply);
  apply();
}

function setupParallax(stage: HTMLElement): void {
  if (reducedMotion() || !matchMedia('(pointer: fine)').matches) return;
  const layers = [...stage.querySelectorAll<SVGGElement>('.layer')];
  const canvas = stage.querySelector<HTMLCanvasElement>('[data-particles]');
  let frame = 0;
  let nx = 0;
  let ny = 0;

  const render = () => {
    frame = 0;
    for (const layer of layers) {
      const depth = Number(layer.dataset['depth'] ?? 0);
      layer.style.transform = `translate(${nx * depth * 7}px, ${ny * depth * 7}px)`;
    }
    if (canvas) canvas.style.transform = `translate(${nx * -3}px, ${ny * -3}px)`;
  };

  stage.addEventListener('pointermove', (event) => {
    const r = stage.getBoundingClientRect();
    nx = ((event.clientX - r.left) / r.width) * 2 - 1;
    ny = ((event.clientY - r.top) / r.height) * 2 - 1;
    if (!frame) frame = requestAnimationFrame(render);
  });
  stage.addEventListener('pointerleave', () => {
    nx = 0;
    ny = 0;
    if (!frame) frame = requestAnimationFrame(render);
  });
}

function setupParticles(stage: HTMLElement): void {
  const canvas = stage.querySelector<HTMLCanvasElement>('[data-particles]');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (!canvas || reducedMotion() || connection?.saveData || navigator.hardwareConcurrency <= 2) {
    return;
  }
  void import('./particles').then(({ startParticles }) => startParticles(canvas, stage));
}

function setupGuidedScroll(root: HTMLElement): void {
  const label = root.querySelector<HTMLElement>('[data-mini-label]');
  const minis = new Map<string, SVGCircleElement>();
  for (const c of root.querySelectorAll<SVGCircleElement>('[data-mini]')) {
    minis.set(c.dataset['mini'] ?? '', c);
  }
  const items = root.querySelectorAll<HTMLElement>('[data-panel="list"] [data-node-id]');

  const observer = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((e) => e.isIntersecting);
      if (!hit) return;
      const item = hit.target as HTMLElement;
      const nodeId = item.dataset['nodeId'] ?? '';
      for (const [key, c] of minis) c.classList.toggle('on', key === nodeId);
      if (label) {
        const strong = document.createElement('strong');
        strong.textContent = item.dataset['project'] ?? '';
        label.replaceChildren(`${item.dataset['eyebrow'] ?? ''} · `, strong);
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  for (const item of items) observer.observe(item);
}

export function initTree(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;

  setupViewBox(stage);
  setupViewSwitch(root);
  setupPreview(root, stage);
  setupGuidedScroll(root);
  setupIgnition(stage);
  setupAmbient(stage);

  if (isDesktop()) {
    setupParallax(stage);
    setupParticles(stage);
  }
}
