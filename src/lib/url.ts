const base = import.meta.env.BASE_URL;

/** Joins a root-relative path onto the configured base, without doubling slashes. */
export function withBase(path: string): string {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
