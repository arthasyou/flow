import type React from "react";
import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";

interface NodeConfigPanelProps {
	readonly selectedNodeId: string | null;
}

export default function NodeConfigPanel({
	selectedNodeId,
}: NodeConfigPanelProps) {
	const { getNodes, updateNodeData } = useReactFlow();
	const [label, setLabel] = useState("");

	useEffect(() => {
		if (!selectedNodeId) {
			setLabel("");
			return;
		}

		const node = getNodes().find((n) => n.id === selectedNodeId);
		if (node) {
			setLabel((node.data.label as string) ?? "");
		}
	}, [selectedNodeId, getNodes]);

	if (!selectedNodeId) {
		return <div style={{ padding: 16 }}>请选择一个节点进行配置</div>;
	}

	const onChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLabel(e.target.value);
		updateNodeData(selectedNodeId, { label: e.target.value });
	};

	return (
		<div style={{ padding: 16, width: 300, borderLeft: "1px solid #ccc" }}>
			<h3>节点配置</h3>
			<label>
				标签: <input type="text" value={label} onChange={onChangeLabel} />
			</label>
		</div>
	);
}
