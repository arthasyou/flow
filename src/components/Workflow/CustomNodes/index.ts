import type { NodeTypes } from "@xyflow/react";
import { InputNode } from "./InputNode";
import type { CustomNodeOption } from "../types";
import { OutputNode } from "./OutputNode";
import { BranchNode } from "./BranchNode";
import { IdentityNode } from "./Identity";
import { PromptNode } from "./PromptNode";

export type AppNode = CustomNodeOption;

export const customNodeRegistry = {
	input: InputNode,
	output: OutputNode,
	identity: IdentityNode,
	branch: BranchNode,
	prompt: PromptNode,
} satisfies NodeTypes;

export type CustomNodeType = keyof typeof customNodeRegistry;
