import type { BuiltInNode, NodeTypes } from "@xyflow/react";
import { StartNode } from "./StartNode";
import type { CustomNodeOption } from "./types";
import { EndNode } from "./EndNode";
import { BranchNode } from "./BranchNode";

export type AppNode = BuiltInNode | CustomNodeOption;

export const customNodeRegistry = {
	start: StartNode,
	end: EndNode,
	branch: BranchNode,
} satisfies NodeTypes;

export type CustomNodeType = keyof typeof customNodeRegistry;
