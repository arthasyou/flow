import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { IdentityNodeOption } from "../types";

export function IdentityNode({
	data,
	selected,
}: NodeProps<IdentityNodeOption>) {
	return (
		<div
			className={`rounded border p-2 bg-white shadow ${
				selected ? "ring-2 ring-blue-500" : ""
			}`}
		>
			<div className="text-sm font-semibold">{data.label || "任务节点"}</div>

			{data.description && (
				<div className="text-xs text-gray-500 mt-1">{data.description}</div>
			)}

			{/* 新增输入框，用于展示或输入 data.input */}
			<div className="mt-2">
				<label htmlFor="input-params" className="text-xs text-gray-600">
					传输复制
				</label>
			</div>

			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</div>
	);
}
