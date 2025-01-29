import { Handle, Position } from "reactflow"
import { Edit, Trash2 } from "lucide-react"

type DepartmentNodeProps = {
  data: { label: string }
  id: string
}

export default function DepartmentNode({ data, id }: DepartmentNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500">
      <div className="flex items-center justify-between">
        <div className="font-bold text-green-500">{data.label}</div>
        <div className="flex items-center">
          <button
            className="mr-2 p-1 rounded-full hover:bg-green-100"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore
              window.editNode(id)
            }}
          >
            <Edit size={16} className="text-green-500" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-green-100"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore
              window.deleteNode(id)
            }}
          >
            <Trash2 size={16} className="text-green-500" />
          </button>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-green-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-500" />
    </div>
  )
}

