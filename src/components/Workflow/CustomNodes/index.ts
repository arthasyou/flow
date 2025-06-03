import type { BuiltInNode, NodeTypes } from "@xyflow/react";
import { StartNode } from "./StartNode";
import type { EndNodeOption, StartNodeOption } from "./types";
import { EndNode } from "./EndNode";

export type AppNode = BuiltInNode | StartNodeOption | EndNodeOption;

export const customNodeRegistry = {
  start: StartNode,
  end: EndNode,
} satisfies NodeTypes;

export type CustomNodeType = keyof typeof customNodeRegistry;
