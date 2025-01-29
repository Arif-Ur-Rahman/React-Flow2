import { Handle, Position } from "reactflow"
import { Edit } from "lucide-react"

type CompanyNodeProps = {
  data: { label: string }
  id: string
}

export default function CompanyNode({ data, id }: CompanyNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-sky-500">
      <div className="flex items-center justify-between">
        <div className="font-bold text-sky-500">{data.label}</div>
        <div className="flex items-center">
          <button
            className="mr-2 p-1 rounded-full hover:bg-sky-100"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore
              window.editNode(id)
            }}
          >
            <Edit size={16} className="text-sky-500" />
          </button>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-sky-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-sky-500" />
    </div>
  )
}

