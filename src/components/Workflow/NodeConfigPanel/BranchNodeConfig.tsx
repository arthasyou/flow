import { useReactFlow } from "@xyflow/react";
import type { BranchNodeData } from "../types";
import { useState } from "react";

interface BranchNodeConfigProps {
	nodeId: string;
	payload: BranchNodeData;
}

const BranchNodeConfig: React.FC<BranchNodeConfigProps> = ({
	nodeId,
	payload,
}) => {
	const { updateNodeData } = useReactFlow();

	const [branches, setBranches] = useState(payload.branches);
	const [defaultTarget, setDefaultTarget] = useState(payload.default);

	const updateBranch = (
		index: number,
		field: "condition" | "nodeId",
		value: string,
	) => {
		const newBranches = [...branches];
		newBranches[index] = {
			...newBranches[index],
			[field]: value,
		};
		setBranches(newBranches);
	};

	const handleBlur = () => {
		updateNodeData(nodeId, {
			payload: {
				...payload,
				branches,
				default: defaultTarget,
			},
		});
	};

	return (
		<div style={{ marginTop: 12 }}>
			<div>默认分支目标节点ID:</div>
			<input
				type="text"
				id={`branch-default-${nodeId}`}
				value={defaultTarget}
				onChange={(e) => setDefaultTarget(e.target.value)}
				onBlur={handleBlur}
				placeholder="默认分支目标节点ID"
				style={{ width: "100%", marginTop: 4 }}
			/>

			<div>条件分支配置:</div>
			{branches.map((branch, index) => {
				const key = index;
				return (
					<div key={key} style={{ display: "flex", gap: 8, marginTop: 8 }}>
						<input
							type="text"
							value={branch.condition}
							onChange={(e) => updateBranch(index, "condition", e.target.value)}
							onBlur={handleBlur}
							placeholder="条件表达式"
							style={{ flex: 1 }}
						/>
						<input
							type="text"
							value={branch.nodeId}
							onChange={(e) => updateBranch(index, "nodeId", e.target.value)}
							onBlur={handleBlur}
							placeholder="目标节点ID"
							style={{ flex: 1 }}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default BranchNodeConfig;
