"use client"

import { useState, useCallback, useRef } from "react"
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

import StartNode from "./nodes/StartNode"
import CompanyNode from "./nodes/CompanyNode"
import DepartmentNode from "./nodes/DepartmentNode"
import EmployeeNode from "./nodes/EmployeeNode"

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editName, setEditName] = useState("")

  const reactFlowWrapper = useRef(null)

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const addNode = useCallback(
    (type: string) => {
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        data: { label: type === "company" ? "New Company" : type === "department" ? "New Department" : "New Employee" },
        position: { x: Math.random() * 400, y: (selectedNode?.position.y ?? 0) + 100 },
      }

      setNodes((nds) => nds.concat(newNode))
      if (selectedNode) {
        setEdges((eds) =>
          eds.concat({
            id: `e${selectedNode.id}-${newNode.id}`,
            source: selectedNode.id,
            target: newNode.id,
            markerEnd: { type: MarkerType.ArrowClosed },
          }),
        )
      }
      setIsAddModalOpen(false)
    },
    [selectedNode, nodes, setNodes, setEdges],
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setIsAddModalOpen(true)
  }, [])

  const handleEditName = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => (node.id === selectedNode.id ? { ...node, data: { ...node.data, label: editName } } : node)),
      )
      setIsEditModalOpen(false)
    }
  }, [selectedNode, editName, setNodes])

  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id))
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id))
    },
    [setNodes, setEdges],
  )

  // @ts-ignore
  window.editNode = (id: string) => {
    const node = nodes.find((n) => n.id === id)
    if (node) {
      setSelectedNode(node)
      setEditName(node.data.label)
      setIsEditModalOpen(true)
    }
  }

  // @ts-ignore
  window.deleteNode = handleDeleteNode

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
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

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Node</h2>
            {selectedNode?.type === "start" && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addNode("company")}>
                Add Company
              </button>
            )}
            {selectedNode?.type === "company" && (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => addNode("department")}
                >
                  Add Department
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={() => addNode("employee")}>
                  Add Employee
                </button>
              </>
            )}
            {selectedNode?.type === "department" && (
              <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={() => addNode("employee")}>
                Add Employee
              </button>
            )}
            <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setIsAddModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Name</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleEditName}>
              Save
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

