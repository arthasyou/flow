import type { BuiltInNode, NodeTypes } from "@xyflow/react";
import { StartNode } from "./StartNode";
import type { StartNodeOption } from "./types";
import { EndNode } from "./EndNode";

export type AppNode = BuiltInNode | StartNodeOption;

export const customNodeRegistry = {
  start: StartNode,
  end: EndNode,
} satisfies NodeTypes;

export type CustomNodeType = keyof typeof customNodeRegistry;
