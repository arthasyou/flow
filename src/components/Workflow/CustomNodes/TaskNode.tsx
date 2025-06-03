import { Handle, Position, type NodeProps } from "@xyflow/react";

export function TaskNode({ data, selected }: NodeProps<any>) {
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

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
