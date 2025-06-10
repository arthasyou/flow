import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { InputNodeOption } from "./types";
import NodeInput from "../NodeInput"; // 确保路径正确

export function InputNode({ data, selected }: NodeProps<InputNodeOption>) {
	return (
		<div
			className={`rounded border p-1 bg-white shadow ${
				selected ? "ring-2 ring-blue-500" : ""
			}`}
		>
			<div className="text-xs font-semibold">{data.label || "任务节点"}</div>

			{data.description && (
				<div className="text-[10px] text-gray-500 mt-1">{data.description}</div>
			)}

			{/* 新增输入框，用于展示或输入 data.input */}
			<div className="mt-2">
				<label htmlFor="input-params" className="text-[10px] text-gray-600">
					输入参数：
				</label>
				<NodeInput input={data.payload.input} />
			</div>

			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</div>
	);
}
