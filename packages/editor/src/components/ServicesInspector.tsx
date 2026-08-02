export interface ServiceInfo {
  name: string;
  namespace: string;
  procedure: string;
  description: string;
  parameters?: Record<string, unknown>;
}
