import { getGraphDetailApi } from "@/api/graphApi";
import WorkflowCanvas from "@/components/Workflow/WorkflowCanvas";
import { useFetchData } from "@/hooks/useFetchData";
import { useCallback } from "react";
import { useParams } from "react-router";

export function WorkflowPage() {
	const { id } = useParams();
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const fetchGraph = useCallback(() => getGraphDetailApi(id!), [id]);
	const { Render } = useFetchData(fetchGraph);
	return (
		<Render>
			{(data) => (
				<div style={{ height: "100vh" }}>
					<h3 style={{ padding: "1rem" }}>当前 Workflow ID: {id}</h3>
					<WorkflowCanvas
						initialData={{
							nodes: data?.nodes ?? [],
							edges: data?.edges ?? [],
						}}
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						uuid={id!}
					/>
				</div>
			)}
		</Render>
	);
}
