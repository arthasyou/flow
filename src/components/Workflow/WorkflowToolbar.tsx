interface Props {
  readonly nodesJson: string;
  readonly edgesJson: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  readonly onLoad: (data: { nodes: any[]; edges: any[] }) => void;
}

export default function WorkflowToolbar({
  nodesJson,
  edgesJson,
  onLoad,
}: Props) {
  const saveFile = () => {
    const data = JSON.stringify(
      { nodes: JSON.parse(nodesJson), edges: JSON.parse(edgesJson) },
      null,
      2
    );
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        onLoad(json);
      } catch {
        alert("文件格式错误");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
      <button type="button" onClick={saveFile}>
        保存流程
      </button>
      <input type="file" accept="application/json" onChange={loadFile} />
    </div>
  );
}
