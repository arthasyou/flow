import type { AppNode } from "@/components/Workflow/CustomNodes";
import type { Edge } from "@xyflow/react";

export interface GraphSummery {
	uuid: string;
	name: string;
	description: string;
}

export interface GraphDetail {
	uuid: string;
	name: string;
	description: string;
	nodes: AppNode[];
	edges: Edge[];
}

export interface UpdateGraphRequest {
	nodes: AppNode[];
	edges: Edge[];
}

export interface CreateGraphRequest {
	name: string;
	description: string;
}

export interface CreateGraphResponse {
	id: string;
}
