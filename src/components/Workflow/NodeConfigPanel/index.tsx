import type React from "react";
import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";

import InputNodeConfig from "./InputNodeConfig";
import OutputNodeConfig from "./OutputNodeConfig";
import PromptNodeConfig from "./PromptNodeConfig";
import BranchNodeConfig from "./BranchNodeConfig";

interface NodeConfigPanelProps {
	readonly selectedNodeId: string | null;
}

export default function NodeConfigPanel({
	selectedNodeId,
}: NodeConfigPanelProps) {
	const { getNodes, updateNodeData } = useReactFlow();
	const [label, setLabel] = useState("");
	const [type, setType] = useState<string>("");
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [payload, setPayload] = useState<any>(null);

	useEffect(() => {
		if (!selectedNodeId) {
			setLabel("");
			setPayload(null);
			return;
		}

		const node = getNodes().find((n) => n.id === selectedNodeId);
		if (node) {
			setLabel(typeof node.data.label === "string" ? node.data.label : "");
			setType(node.type ?? "");
			setPayload(node.data.payload ?? null);
		}
	}, [selectedNodeId, getNodes]);

	if (!selectedNodeId) {
		return <div style={{ padding: 16 }}>请选择一个节点进行配置</div>;
	}

	const onChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLabel(e.target.value);
		updateNodeData(selectedNodeId, { label: e.target.value });
	};

	const renderPayloadConfig = () => {
		if (!payload || !type) return null;

		switch (type) {
			case "input":
				return <InputNodeConfig nodeId={selectedNodeId} payload={payload} />;
			case "output":
				return <OutputNodeConfig nodeId={selectedNodeId} payload={payload} />;
			case "prompt":
				return <PromptNodeConfig nodeId={selectedNodeId} payload={payload} />;
			case "branch":
				return <BranchNodeConfig nodeId={selectedNodeId} payload={payload} />;
			default:
				return null;
		}
	};

	return (
		<div style={{ padding: 16, width: 300, borderLeft: "1px solid #ccc" }}>
			<h3>节点配置（🆔 {selectedNodeId}）</h3>
			<label>
				标签: <input type="text" value={label} onChange={onChangeLabel} />
			</label>
			{renderPayloadConfig()}
		</div>
	);
}
