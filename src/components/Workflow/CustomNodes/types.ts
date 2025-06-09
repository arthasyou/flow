import type { Node } from "@xyflow/react";

/**
 * 通用字段：所有节点都会有
 */
type CommonNodeData = {
	label: string;
	description: string;
};

/**
 * 各类型节点专属字段
 */
type StartNodeData = {
	input: string;
};

type EndNodeData = {
	input: string;
};

type BranchNodeData = {
	branches: { condition: string; label: string }[];
};

/**
 * 泛型包装：合并通用字段和专属字段
 */
type NodeData<T> = CommonNodeData & {
	payload: T;
};

/**
 * 各种节点定义（将专属字段放进 payload 中）
 */

export type StartNodeOption = Node<NodeData<StartNodeData>, "start">;
export type EndNodeOption = Node<NodeData<EndNodeData>, "end">;
export type BranchNodeOption = Node<NodeData<BranchNodeData>, "branch">;

export type CustomNodeOption =
	| StartNodeOption
	| EndNodeOption
	| BranchNodeOption;
