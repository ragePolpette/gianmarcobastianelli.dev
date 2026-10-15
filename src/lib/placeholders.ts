const PLACEHOLDER = /\bTODO\b/;

/**
 * Lists every field of a content entry (frontmatter values and Markdown body) that still
 * contains a "TODO" placeholder. Callers turn a non-empty result into a build error.
 */
export function findPlaceholders(id: string, data: unknown, body?: string): string[] {
  const hits: string[] = [];
  const walk = (value: unknown, path: string): void => {
    if (typeof value === 'string') {
      if (PLACEHOLDER.test(value)) hits.push(`${id}: placeholder in ${path}`);
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${path}[${i}]`));
    } else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k);
    }
  };
  walk(data, '');
  if (body !== undefined) walk(body, 'body');
  return hits;
}
