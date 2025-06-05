import type { AppNode } from "@/components/Workflow/CustomNodes";
import type { Edge } from "@xyflow/react";

export const initialNodes: AppNode[] = [
  {
    id: "1",
    type: "default",
    data: { label: "开始节点" },
    position: { x: 100, y: 100 },
  },
];

export const initialEdges: Edge[] = [];
