import type { RunWorkflowRequest } from "@/models/workflowModel";
import { request } from "./base";

export const runWorkflowApi = async (
	payload: RunWorkflowRequest,
): Promise<string> => {
	const response = await request<RunWorkflowRequest, string>({
		method: "POST",
		url: "/workflow/run",
		body: payload,
	});
	return response;
};
