/**
 * Playground compilation glue for the chat native surface.
 * Mirrors registry/apps/registry/src/lib/playground.ts.
 */

import {
  parseScriptDependencies,
  rewriteDefaultExport,
  type RuntimeDependency,
} from "@aprovan/runtime";
import { transform } from "sucrase";

export interface CompiledScript {
  body: string;
  dependencies: RuntimeDependency[];
}

export function detectDependencies(source: string): RuntimeDependency[] {
  return parseScriptDependencies(source).dependencies;
}

export function compileScript(source: string): CompiledScript {
  const javascript = transform(source, {
    transforms: ["typescript"],
    disableESTransforms: true,
  }).code;

  const { dependencies, body } = parseScriptDependencies(javascript);
  return { dependencies, body: rewriteDefaultExport(body) };
}

export const SAMPLE_SCRIPT = `import github from 'github';

export default async function report({ username }) {
  const user = await github.users.getByUsername({ username });
  const repos = await github.repos.listForUser({
    username,
    per_page: 6,
    sort: 'updated',
  });

  console.log(\`\${user.login} has \${user.public_repos} public repos\`);

  return {
    chart: {
      type: 'bar',
      title: \`\${user.login} — stars on recently updated repos\`,
      labels: repos.map((r) => r.name),
      series: [{ label: 'stars', values: repos.map((r) => r.stargazers_count ?? 0) }],
    },
  };
}
`;
