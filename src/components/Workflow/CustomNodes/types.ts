import type { Node } from "@xyflow/react";

export type StartNodeOption = Node<
  { label: string; description: string; input: string },
  "start"
>;
