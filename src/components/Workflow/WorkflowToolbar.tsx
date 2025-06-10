import { updateGraphApi } from "@/api/graphApi";
import { runWorkflowApi } from "@/api/workflowApi";
import type { AppNode } from "./CustomNodes";
import type { Edge } from "@xyflow/react";
interface Props {
	readonly uuid: string;
	readonly nodes: AppNode[];
	readonly edges: Edge[];
}

export default function WorkflowToolbar({ uuid, nodes, edges }: Props) {
	const handleSaveGraph = async () => {
		await updateGraphApi({ uuid, nodes, edges });
		alert("保存成功");
	};

	const handleRunWorkflow = async () => {
		const r = await runWorkflowApi({ id: uuid });
		alert(`运行成功: ${JSON.stringify(r)}`);
	};

	return (
		<div style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
			<button type="button" onClick={handleSaveGraph}>
				保存流程
			</button>
			<button
				type="button"
				onClick={handleRunWorkflow}
				style={{ marginLeft: 8 }}
			>
				运行流程
			</button>
		</div>
	);
}
