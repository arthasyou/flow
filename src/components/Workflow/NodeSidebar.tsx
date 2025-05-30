import { useDispatch } from "react-redux";
import { setType } from "@/store/dragNodeSlice";

const nodeTypes = [
  { type: "task", label: "任务节点" },
  { type: "decision", label: "判断节点" },
];

export default function NodeSidebar() {
  const dispatch = useDispatch();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    dispatch(setType(nodeType));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleKeyDown = (event: React.KeyboardEvent, nodeType: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      // 也可以触发添加到画布或其他交互
      console.log(`Keyboard selection: ${nodeType}`);
    }
  };

  return (
    <aside style={{ padding: "1rem", width: 150, background: "#f4f4f4" }}>
      <h4>节点类型</h4>
      {nodeTypes.map((n) => (
        <button
          key={n.type}
          onDragStart={(e) => onDragStart(e, n.type)}
          onKeyDown={(e) => handleKeyDown(e, n.type)}
          draggable
          type="button"
          aria-label={`拖拽 ${n.label} 节点到画布`}
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            margin: "0.5rem 0",
            border: "1px solid #ccc",
            borderRadius: 4,
            backgroundColor: "#fff",
            cursor: "grab",
            textAlign: "left",
          }}
        >
          {n.label}
        </button>
      ))}
    </aside>
  );
}
