import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { PromptNodeOption } from "../types";

export function PromptNode({ data, selected }: NodeProps<PromptNodeOption>) {
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
					模版
				</label>
				<input
					id="input-params"
					type="text"
					className="w-full border px-1 py-0.5 text-xs"
					value={data.payload.template}
					readOnly // 如果后续要实现可编辑，可去掉 readonly 并添加 onChange 事件
				/>
			</div>

			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</div>
	);
}
