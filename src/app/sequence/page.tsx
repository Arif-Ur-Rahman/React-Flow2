"use client"

import { useState, useCallback } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  Background,
  Controls,
  type Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"

import StartNode from "../nodes/StartNode"
import CompanyNode from "../nodes/CompanyNode"
import DepartmentNode from "../nodes/DepartmentNode"
import EmployeeNode from "../nodes/EmployeeNode"

const nodeTypes = {
  start: StartNode,
  company: CompanyNode,
  department: DepartmentNode,
  employee: EmployeeNode,
}

const initialNodes: Node[] = [
  {
    id: "start",
    type: "start",
    data: { label: "Start Sequence" },
    position: { x: 250, y: 0 },
  },
]

export default function CustomReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const addNode = useCallback(
    (type: string, sourceId: string) => {
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        data: { label: type === "company" ? "New Company" : type },
        position: { x: sourceId === "start" ? 250 : Math.random() * 400, y: nodes.length * 100 + 100 },
      }

      setNodes((nds) => nds.concat(newNode))
      setEdges((eds) =>
        eds.concat({
          id: `e${sourceId}-${newNode.id}`,
          source: sourceId,
          target: newNode.id,
          markerEnd: { type: MarkerType.ArrowClosed },
        }),
      )
      setIsDialogOpen(false)
    },
    [nodes, setNodes, setEdges],
  )

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setIsDialogOpen(true)
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Node</h2>
            {selectedNode?.type === "start" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => addNode("company", selectedNode.id)}
              >
                Add Company
              </button>
            )}
            {selectedNode?.type === "company" && (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => addNode("department", selectedNode.id)}
                >
                  Add Department
                </button>
                <button
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                  onClick={() => addNode("employee", selectedNode.id)}
                >
                  Add Employee
                </button>
              </>
            )}
            <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setIsDialogOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

