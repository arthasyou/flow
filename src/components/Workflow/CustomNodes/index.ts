import type { NodeTypes } from "@xyflow/react";
import { InputNode } from "./InputNode";
import type { CustomNodeOption } from "./types";
import { OutputNode } from "./OutputNode";
import { BranchNode } from "./BranchNode";
import { IndentityNode } from "./Indentity";

export type AppNode = CustomNodeOption;

export const customNodeRegistry = {
	input: InputNode,
	output: OutputNode,
	indentity: IndentityNode,
	branch: BranchNode,
} satisfies NodeTypes;

export type CustomNodeType = keyof typeof customNodeRegistry;
