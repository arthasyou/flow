import { useState, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export function useNodePayloadField<
	T = string,
	P extends Record<string, T> = Record<string, T>,
>(nodeId: string, payload: P, field: keyof P) {
	const { updateNodeData } = useReactFlow();

	const [localValue, setLocalValue] = useState<T>(payload[field]);

	useEffect(() => {
		setLocalValue(payload[field]);
	}, [payload, field]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setLocalValue(e.target.value as T);
	};

	const handleBlur = () => {
		updateNodeData(nodeId, {
			payload: {
				...payload,
				[field]: localValue,
			},
		});
	};

	return { localValue, handleChange, handleBlur };
}
