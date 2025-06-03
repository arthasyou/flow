import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeSidebar from "./NodeSidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import NodeConfigPanel from "./NodeConfigPanel";
import WorkflowToolbar from "./WorkflowToolbar";
import { customNodeRegistry, type AppNode } from "./CustomNodes";
import { getInitialNodeData } from "@/utils/workflowStorage";

const initialNodes: AppNode[] = [
  {
    id: "1",
    type: "default",
    data: { label: "开始节点" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges: Edge[] = [];

// Make sure to import StartNode from its file

let id = 2;
const getId = () => `${id++}`;

function InnerCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nodeType = useSelector((state: RootState) => state.dragNode.type);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleLoad = (data: { nodes: AppNode[]; edges: Edge[] }) => {
    setNodes(data.nodes);
    setEdges(data.edges);
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const bounds = wrapperRef.current?.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - (bounds?.left ?? 0),
        y: event.clientY - (bounds?.top ?? 0),
      });

      const data = getInitialNodeData(nodeType);

      const newNode: AppNode = {
        id: getId(),
        type: nodeType,
        position,
        data,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeType, setNodes]
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 顶部工具栏 */}
      <div style={{ flexShrink: 0 }}>
        <WorkflowToolbar
          nodesJson={JSON.stringify(nodes)}
          edgesJson={JSON.stringify(edges)}
          onLoad={handleLoad}
        />
      </div>

      {/* 主体部分 */}
      <div style={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        {/* 左侧节点栏 */}
        <NodeSidebar />

        {/* 中间画布 */}
        <div ref={wrapperRef} style={{ flexGrow: 1, position: "relative" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={customNodeRegistry}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
            style={{ width: "100%", height: "100%" }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>

        {/* 右侧配置面板 */}
        <NodeConfigPanel selectedNodeId={selectedNodeId} />
      </div>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <InnerCanvas />
    </ReactFlowProvider>
  );
}
