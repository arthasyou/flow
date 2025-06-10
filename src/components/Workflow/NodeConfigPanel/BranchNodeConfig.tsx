import { useReactFlow } from "@xyflow/react";

interface BranchNodeConfigProps {
	nodeId: string;
	payload: {
		branches: { condition: string; node: string }[];
	};
}

const BranchNodeConfig: React.FC<BranchNodeConfigProps> = ({
	nodeId,
	payload,
}) => {
	const { updateNodeData } = useReactFlow();

	const updateBranch = (
		index: number,
		field: "condition" | "node",
		value: string,
	) => {
		const newBranches = [...payload.branches];
		newBranches[index] = {
			...newBranches[index],
			[field]: value,
		};
		updateNodeData(nodeId, {
			payload: {
				...payload,
				branches: newBranches,
			},
		});
	};

	return (
		<div style={{ marginTop: 12 }}>
			<div>条件分支配置:</div>
			{payload.branches.map((branch, index) => {
				const key = `${branch.condition}-${branch.node}-${index}`;
				return (
					<div key={key} style={{ display: "flex", gap: 8, marginTop: 8 }}>
						<input
							type="text"
							value={branch.condition}
							onChange={(e) => updateBranch(index, "condition", e.target.value)}
							placeholder="条件表达式"
							style={{ flex: 1 }}
						/>
						<input
							type="text"
							value={branch.node}
							onChange={(e) => updateBranch(index, "node", e.target.value)}
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
