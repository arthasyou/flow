import type { BuiltInNode, NodeTypes } from "@xyflow/react";
import { StartNode } from "./StartNode";
import type { StartNodeOption } from "./types";

export type AppNode = BuiltInNode | StartNodeOption;

export const customNodeRegistry = {
  start: StartNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export type CustomNodeType = keyof typeof customNodeRegistry;
