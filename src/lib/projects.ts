import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale } from '../i18n';
import { treeIndex, type NodeId } from '../data/nodes';

export type ProjectEntry = CollectionEntry<'projects'>;

export interface Project {
  slug: string;
  locale: Locale;
  entry: ProjectEntry;
}

export interface TreeNode {
  nodeId: NodeId;
  primary: Project;
  satellites: Project[];
}

function parseId(id: string): { locale: Locale; slug: string } {
  const [locale, slug] = id.split('/');
  if (!slug || !(locales as readonly string[]).includes(locale ?? '')) {
    throw new Error(`Project "${id}" must live in src/content/projects/<locale>/<slug>.md`);
  }
  return { locale: locale as Locale, slug };
}

let validated = false;

/** Cross-entry rules the per-file schema cannot express. Fails the build on violation. */
function validate(all: Project[]): void {
  if (validated) return;
  const errors: string[] = [];

  for (const locale of locales) {
    const own = all.filter((p) => p.locale === locale);
    const slugs = new Set(own.map((p) => p.slug));

    const primaries = new Map<NodeId, string>();
    for (const p of own) {
      if (p.entry.data.role !== 'primary') continue;
      const taken = primaries.get(p.entry.data.node);
      if (taken) {
        errors.push(`[${locale}] ${p.entry.data.node} has two primaries: ${taken}, ${p.slug}`);
      }
      primaries.set(p.entry.data.node, p.slug);
    }

    for (const p of own) {
      if (p.entry.data.role === 'satellite' && !primaries.has(p.entry.data.node)) {
        errors.push(`[${locale}] satellite ${p.slug} has no primary in ${p.entry.data.node}`);
      }
      for (const c of p.entry.data.components ?? []) {
        if (c.project && !slugs.has(c.project)) {
          errors.push(`[${locale}] ${p.slug} references unknown project "${c.project}"`);
        }
      }
    }

    for (const other of locales) {
      if (other === locale) continue;
      const otherSlugs = new Set(all.filter((p) => p.locale === other).map((p) => p.slug));
      for (const slug of slugs) {
        if (!otherSlugs.has(slug)) errors.push(`${slug} exists in ${locale} but not in ${other}`);
      }
    }
  }

  if (errors.length > 0) throw new Error(`Invalid project content:\n  ${errors.join('\n  ')}`);
  validated = true;
}

async function loadAll(): Promise<Project[]> {
  const entries = await getCollection('projects');
  const all = entries.map((entry) => ({ ...parseId(entry.id), entry }));
  validate(all);
  return all;
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await loadAll();
  return all.filter((p) => p.locale === locale);
}

export async function getProject(locale: Locale, slug: string): Promise<Project | undefined> {
  return (await getProjects(locale)).find((p) => p.slug === slug);
}

/** Projects grouped by tree node, in tree order (top → base). */
export async function getTree(locale: Locale): Promise<TreeNode[]> {
  const projects = await getProjects(locale);
  const nodes: TreeNode[] = [];
  for (const primary of projects.filter((p) => p.entry.data.role === 'primary')) {
    const nodeId = primary.entry.data.node;
    const satellites = projects
      .filter((p) => p.entry.data.role === 'satellite' && p.entry.data.node === nodeId)
      .sort((a, b) => a.entry.data.order - b.entry.data.order);
    nodes.push({ nodeId, primary, satellites });
  }
  return nodes.sort((a, b) => treeIndex(a.nodeId) - treeIndex(b.nodeId));
}
