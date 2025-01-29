import { Handle, Position } from "reactflow"
import { Edit, Trash2 } from "lucide-react"

type EmployeeNodeProps = {
  data: { label: string }
  id: string
}

export default function EmployeeNode({ data, id }: EmployeeNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500">
      <div className="flex items-center justify-between">
        <div className="font-bold text-purple-500">{data.label}</div>
        <div className="flex items-center">
          <button
            className="mr-2 p-1 rounded-full hover:bg-purple-100"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore
              window.editNode(id)
            }}
          >
            <Edit size={16} className="text-purple-500" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-purple-100"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore
              window.deleteNode(id)
            }}
          >
            <Trash2 size={16} className="text-purple-500" />
          </button>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-purple-500" />
    </div>
  )
}

