// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getInitialNodeData(type?: string): any {
	switch (type) {
		case "text":
			return {
				label: "文本节点",
				payload: {
					text: "",
				},
			};
		case "branch":
			return {
				label: "条件判断",
				payload: {
					branches: [
						{ condition: "条件1", label: "分支1" },
						{ condition: "条件2", label: "分支2" },
					],
				},
			};
		case "start":
			return {
				label: "开始节点",
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
