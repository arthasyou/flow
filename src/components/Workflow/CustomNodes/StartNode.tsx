import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { StartNodeOption } from "./types";

export function StartNode({ data, selected }: NodeProps<StartNodeOption>) {
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
				<input
					id="input-params"
					type="text"
					className="w-full border px-0.5 py-0.5 text-[10px]"
					value={data.payload.input}
					readOnly // 如果后续要实现可编辑，可去掉 readonly 并添加 onChange 事件
				/>
			</div>

			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</div>
	);
}
