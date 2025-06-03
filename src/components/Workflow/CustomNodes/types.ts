import type { Node, BuiltInNode } from "@xyflow/react";

export type StartNode = Node<
  { label: string; description: string; input: string },
  "start"
>;
export type AppNode = BuiltInNode | StartNode;
