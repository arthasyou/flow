import { getGraphDetailApi } from "@/api/graphApi";
import WorkflowCanvas from "@/components/Workflow/WorkflowCanvas";
import { useNavigate, useParams } from "react-router";
// Update the import path if the file is located elsewhere, for example:
import { useFetchData } from "@/hooks/useFetchData";

// import type { GraphSummery } from "@/models/graphModel";
import { getGraphSummaryApi } from "@/api/graphApi";
import { useCallback } from "react";

export function WorkflowListPage() {
  const navigate = useNavigate();
  const { Render, run } = useFetchData(getGraphSummaryApi);

  return (
    <Render>
      {(data) => (
        <div style={{ padding: "2rem" }}>
          <button onClick={() => run()}>刷新</button>
          <h2>Workflow 列表</h2>
          <ul>
            {data?.map((wf) => (
              <li
                key={wf.uuid}
                style={{ marginBottom: "1rem", listStyle: "none" }}
              >
                <button
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

export function WorkflowPage() {
  const { id } = useParams();
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
            uuid={id!}
          />
        </div>
      )}
    </Render>
  );
}
