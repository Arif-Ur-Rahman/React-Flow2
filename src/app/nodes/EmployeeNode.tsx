import { Handle, Position } from "reactflow"

export default function EmployeeNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500">
      <div className="font-bold text-purple-500">{data.label}</div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-purple-500" />
    </div>
  )
}

