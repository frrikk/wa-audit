export interface AxeResult {
  id: string;
  impact: "minor" | "moderate" | "serious" | "critical";
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
}

interface AxeNode {
  // Define properties based on the AxeNode structure you expect
  // For example:
  any: AxeCheck[];
  all: AxeCheck[];
  none: AxeCheck[];
  // Include other properties as needed
}

interface AxeCheck {
  id: string;
  message: string;
  data?: any;
  relatedNodes?: any[];
  // Include other properties as needed
}
