import { useReactFlow } from "@xyflow/react";

interface OutputNodeConfigProps {
	nodeId: string;
	payload: { output: string };
}

const OutputNodeConfig: React.FC<OutputNodeConfigProps> = ({
	nodeId,
	payload,
}) => {
	const { updateNodeData } = useReactFlow();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateNodeData(nodeId, {
			payload: {
				...payload,
				output: e.target.value,
			},
		});
	};

	return (
		<div style={{ marginTop: 12 }}>
			<label>
				输出变量名:{" "}
				<input
					type="text"
					value={payload.output}
					onChange={handleChange}
					style={{ width: "100%" }}
				/>
			</label>
		</div>
	);
};

export default OutputNodeConfig;
