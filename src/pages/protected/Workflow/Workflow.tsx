import WorkflowCanvas from "@/components/Workflow/WorkflowCanvas";

export default function WorkflowPage() {
	return (
		<div style={{ height: "100vh" }}>
			<WorkflowCanvas
				uuid={""}
				initialData={{
					nodes: [],
					edges: [],
				}}
			/>
		</div>
	);
}
