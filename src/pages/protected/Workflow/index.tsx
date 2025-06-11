import { useNavigate } from "react-router";
import { useFetchData } from "@/hooks/useFetchData";
import { getGraphSummaryApi, createGraphApi } from "@/api/graphApi";

export function WorkflowListPage() {
	const navigate = useNavigate();
	const { Render, run } = useFetchData(getGraphSummaryApi);

	const handleCreate = async () => {
		await createGraphApi({ name: "新工作流", description: "描述内容" });
		run(); // 刷新列表
	};

	return (
		<Render>
			{(data) => (
				<div style={{ padding: "2rem" }}>
					<button type="button" onClick={() => run()}>
						刷新
					</button>
					<button type="button" onClick={handleCreate}>
						创建
					</button>
					<h2>Workflow 列表</h2>
					<ul>
						{data?.map((wf) => (
							<li
								key={wf.uuid}
								style={{ marginBottom: "1rem", listStyle: "none" }}
							>
								<button
									type="button"
									style={{
										width: "100%",
										textAlign: "left",
										background: "none",
										border: "none",
										padding: 0,
										cursor: "pointer",
									}}
									onClick={() => navigate(`/workflow/${wf.uuid}`)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											navigate(`/workflow/${wf.uuid}`);
										}
									}}
									tabIndex={0}
									aria-label={`查看 ${wf.name}，ID: ${wf.uuid}`}
								>
									<div>
										<strong>{wf.name}</strong> (ID: {wf.uuid})
									</div>
									<div>{wf.description}</div>
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</Render>
	);
}
