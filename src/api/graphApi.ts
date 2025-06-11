import { request } from "./base";
import type {
	CreateGraphRequest,
	CreateGraphResponse,
	GraphDetail,
	GraphSummery,
	UpdateGraphRequest,
} from "@/models/graphModel";

export const createGraphApi = async (
	payload: CreateGraphRequest,
): Promise<CreateGraphResponse> => {
	const response = await request<CreateGraphRequest, CreateGraphResponse>({
		method: "POST",
		url: "/graph/create",
		body: payload,
	});
	return response;
};

export const getGraphSummaryApi = async (): Promise<GraphSummery[]> => {
	const response = await request<undefined, GraphSummery[]>({
		method: "GET",
		url: "/graph/get",
	});
	return response;
};

export const getGraphDetailApi = async (uuid: string): Promise<GraphDetail> => {
	const response = await request<undefined, GraphDetail>({
		method: "GET",
		url: `/graph/get/${uuid}`,
	});
	return response;
};

export const updateGraphApi = async (
	payload: UpdateGraphRequest & { uuid: string },
): Promise<undefined> => {
	const response = await request<UpdateGraphRequest, undefined>({
		method: "PUT",
		url: `/graph/update/${payload.uuid}`,
		body: {
			nodes: payload.nodes,
			edges: payload.edges,
		},
	});
	return response;
};
