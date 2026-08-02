/**
 * CSS imports resolve to their *text* (tsup's `loader: { ".css": "text" }`),
 * so tailor.tsx can bundle the critical stylesheets and inject them at
 * runtime as a fallback for hosts that never imported them.
 */
declare module "*.css" {
  const text: string;
  export default text;
}
