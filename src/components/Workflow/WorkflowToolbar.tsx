import { updateGraphApi } from "@/api/graphApi";
import type { AppNode } from "./CustomNodes";
import type { Edge } from "@xyflow/react";
interface Props {
  readonly uuid: string;
  readonly nodes: AppNode[];
  readonly edges: Edge[];
}

export default function WorkflowToolbar({ uuid, nodes, edges }: Props) {
  const handleSaveGraph = async () => {
    await updateGraphApi({ uuid, nodes, edges });
    alert("保存成功");
  };

  return (
    <div style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
      <button type="button" onClick={handleSaveGraph}>
        保存流程
      </button>
    </div>
  );
}
