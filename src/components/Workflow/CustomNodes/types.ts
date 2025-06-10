import type { Node } from "@xyflow/react";
import type { DataPayload } from "./dataPaylaod";

/**
 * 通用字段：所有节点都会有
 */
type CommonNodeData = {
	label: string;
	description: string;
};

/**
 * 泛型包装：合并通用字段和专属字段
 */
type NodeData<T> = CommonNodeData & {
	payload: T;
};

/**
 * 各类型节点专属字段
 */
type InputNodeData = {
	input: DataPayload;
};

type OutputNodeData = {
	output: string;
};

type BranchNodeData = {
	branches: { condition: string; label: string }[];
};

/**
 * 各种节点定义（将专属字段放进 payload 中）
 */

export type InputNodeOption = Node<NodeData<InputNodeData>, "input">;
export type OutputNodeOption = Node<NodeData<OutputNodeData>, "output">;
export type IndentityNodeOption = Node<NodeData<null>, "output">;
export type BranchNodeOption = Node<NodeData<BranchNodeData>, "branch">;

export type CustomNodeOption =
	| InputNodeOption
	| OutputNodeOption
	| IndentityNodeOption
	| BranchNodeOption;
