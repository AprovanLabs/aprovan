import { DEFAULT_OUTPUT_ROOT, loadRegistryProviders, resolveProvider } from "../provider.js";
import { runScorecard, type InfraRunner, type ScorecardResult } from "../verification/scorecard.js";
import { runAgentReadiness, type AgentReadinessResult } from "./agentReadiness.js";

export type RunReviewPhaseResult = {
  provider: string;
  scorecard: ScorecardResult;
  agentReadiness: AgentReadinessResult;
  passed: boolean;
  warnings: string[];
};

export type RunReviewPhaseOptions = {
  provider: string;
  outputRoot?: string;
  /** Inject alternative infrastructure runner for testing */
  infraRunner?: InfraRunner;
};

export async function runReviewPhase(options: RunReviewPhaseOptions): Promise<RunReviewPhaseResult> {
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);

  const [scorecard, agentReadiness] = await Promise.all([
    runScorecard({ provider: provider.name, outputRoot, runner: options.infraRunner }),
    runAgentReadiness({ provider: provider.name, outputRoot }),
  ]);

  const warnings: string[] = [
    ...agentReadiness.blockers
      .filter((b) => b.severity === "warning")
      .map((b) => `[${b.code}] ${b.message}`),
    ...(!scorecard.passed
      ? [scorecard.report]
      : []),
  ];

  const passed = scorecard.passed && agentReadiness.passed;

  return {
    provider: provider.name,
    scorecard,
    agentReadiness,
    passed,
    warnings,
  };
}
