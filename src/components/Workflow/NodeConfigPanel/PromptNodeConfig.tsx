import useNodePayloadField from "@/hooks/useNodePayloadField";
import type { PromptNodeData } from "../types";

interface PromptNodeConfigProps {
	nodeId: string;
	payload: PromptNodeData;
}

const PromptNodeConfig: React.FC<PromptNodeConfigProps> = ({
	nodeId,
	payload,
}) => {
	const { localValue, handleChange, handleBlur } = useNodePayloadField(
		nodeId,
		payload,
		"template",
	);

	return (
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
