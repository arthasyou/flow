import { useCallback, useRef, useState } from "react";
import {
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	useEdgesState,
	useNodesState,
	useReactFlow,
	ReactFlowProvider,
	type Edge,
	type Node,
	type OnConnect,
	MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeSidebar from "./NodeSidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import WorkflowToolbar from "./WorkflowToolbar";
import { customNodeRegistry, type AppNode } from "./CustomNodes";
import { getInitialNodeData } from "@/utils/workflowStorage";
import { initialNodes, initialEdges } from "@/data/workflow/initData"; // Adjust the import path as necessary
import { createNodeId } from "@/utils/id";
import NodeConfigPanel from "./NodeConfigPanel";

// Make sure to import StartNode from its file

const getId = () => createNodeId();

function InnerCanvas({
	uuid,
	initialData,
}: {
	readonly uuid: string;
	readonly initialData: { readonly nodes: AppNode[]; readonly edges: Edge[] };
}) {
	const [nodes, setNodes, onNodesChange] = useNodesState(
		initialData.nodes || initialNodes,
	);
	const [edges, setEdges, onEdgesChange] = useEdgesState(
		initialData.edges || initialEdges,
	);
	const reactFlowInstance = useReactFlow();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const nodeType = useSelector((state: RootState) => state.dragNode.type);
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

	const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
		setSelectedNodeId(node.id);
	}, []);

	const onConnect: OnConnect = useCallback(
		(connection) => {
			console.log("连接事件参数：", connection);

			// 构造一个带箭头的新 edge
			const newEdge = {
				...connection,
				id: `${connection.source}->${connection.target}`,
				markerEnd: {
					type: MarkerType.ArrowClosed,
					color: "#005cff", // 你喜欢什么颜色都行
				},
				animated: false,
			};

			setEdges((edges) => [...edges, newEdge]);
		},
		[setEdges],
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
		[reactFlowInstance, nodeType, setNodes],
	);

	return (
		<div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
			{/* 顶部工具栏 */}
			<div style={{ flexShrink: 0 }}>
				<WorkflowToolbar uuid={uuid} nodes={nodes} edges={edges} />
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

export default function WorkflowCanvas({
	uuid,
	initialData,
}: {
	readonly uuid: string;
	readonly initialData: {
		readonly nodes: readonly AppNode[];
		readonly edges: readonly Edge[];
	};
}) {
	return (
		<ReactFlowProvider>
			<InnerCanvas
				uuid={uuid}
				initialData={{
					nodes: [...initialData.nodes],
					edges: [...initialData.edges],
				}}
			/>
		</ReactFlowProvider>
	);
}
