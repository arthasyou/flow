import type { AppNode } from "@/components/Workflow/CustomNodes";
import type { Edge } from "@xyflow/react";

export const initialNodes: AppNode[] = [
	{
		id: "1",
		type: "input",
		data: {
			label: "开始节点",
			description: "这是一个输入节点",
			payload: {
				input: {
					kind: "Single",
					data: { type: "Text", value: "hello" },
				},
			},
		},
		position: { x: 100, y: 100 },
	},
];

export const initialEdges: Edge[] = [];
