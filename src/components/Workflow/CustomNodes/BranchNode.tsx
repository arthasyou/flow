import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { BranchNodeOption } from "./types";

export function BranchNode({ data }: NodeProps<BranchNodeOption>) {
	return (
		<div className="rounded border p-2 bg-white shadow">
			<div className="text-sm font-semibold mb-2">{data.label}</div>
			<div className="flex flex-col space-y-2">
				{data.payload.branches.map((branch, index) => (
					<div
						key={branch.label || branch.condition || index}
						className="flex items-center space-x-2"
					>
						<div className="text-xs text-gray-500 flex-1">
							{branch.condition}{" "}
							<span className="text-gray-700">{branch.label}</span>
						</div>
						<Handle
							type="source"
							position={Position.Right}
							id={`branch-${index}`}
							className="ml-2"
						/>
					</div>
				))}
			</div>
			<Handle type="target" position={Position.Left} />
		</div>
	);
}
