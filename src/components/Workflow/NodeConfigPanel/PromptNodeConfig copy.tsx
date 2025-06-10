import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
import type { PromptNodeData } from "../types";

interface PromptNodeConfigProps {
	nodeId: string;
	payload: PromptNodeData;
}

const PromptNodeConfig: React.FC<PromptNodeConfigProps> = ({
	nodeId,
	payload,
}) => {
	const [localValue, setLocalValue] = useState(payload.template);

	const { updateNodeData } = useReactFlow();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setLocalValue(e.target.value);
	};

	const handleBlur = () => {
		updateNodeData(nodeId, {
			payload: {
				...payload,
				template: localValue,
			},
		});
	};

	return (
		// TODO 帮我写一个组件来替代这段代码
		<div style={{ marginTop: 12 }}>
			<label htmlFor={`prompt-template-${nodeId}`}>提示词模板:</label>
			<textarea
				id={`prompt-template-${nodeId}`}
				value={localValue}
				onChange={handleChange}
				onBlur={handleBlur}
				style={{ width: "100%", height: 100, marginTop: 4 }}
			/>
		</div>
	);
};

export default PromptNodeConfig;
