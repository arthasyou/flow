import { useReactFlow } from "@xyflow/react";
import type { InputNodeData } from "../types";
import type React from "react";
import { useState, useEffect } from "react";

interface InputNodeConfigProps {
	nodeId: string;
	payload: InputNodeData;
}

const InputNodeConfig: React.FC<InputNodeConfigProps> = ({
	nodeId,
	payload,
}) => {
	const { updateNodeData } = useReactFlow();

	const inputValue = payload.input.data?.value?.toString() ?? "";

	const [localValue, setLocalValue] = useState(inputValue);

	useEffect(() => {
		setLocalValue(inputValue);
	}, [inputValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value);
	};

	const handleBlur = () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		updateNodeData(nodeId, (prev: any) => {
			const prevInput = prev?.payload?.input ?? {};
			const prevData = prevInput.data ?? {};
			const newValue = localValue;

			const newData = {
				type: prevData.type ?? "Text",
				...prevData,
				value: newValue,
			};

			const newInput = {
				...prevInput,
				data: newData,
				kind: prevInput.kind ?? "Single", // 保底保留 kind 字段
			};

			return {
				payload: {
					...prev.payload,
					input: newInput,
				},
			};
		});
	};

	return (
		<div style={{ marginTop: 12 }}>
			<label>
				输入内容:{" "}
				<input
					type="text"
					value={localValue}
					onChange={handleChange}
					onBlur={handleBlur}
					style={{ width: "100%" }}
				/>
			</label>
		</div>
	);
};

export default InputNodeConfig;
