// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getInitialNodeData(type?: string): any {
	switch (type) {
		case "prompt":
			return {
				label: "文本节点",
				payload: {
					template: "模版内容",
				},
			};
		case "branch":
			return {
				label: "条件判断",
				payload: {
					branches: [
						{ condition: "A", node: "A" },
						{ condition: "B", node: "B" },
					],
					default: "C",
				},
			};
		case "input":
			return {
				label: "输入节点",
				payload: {
					input: {
						kind: "Single",
						data: { type: "Text", value: "hello" },
					},
				},
			};
		default:
			return {
				label: `${type} 节点`,
				payload: {},
			};
	}
}
