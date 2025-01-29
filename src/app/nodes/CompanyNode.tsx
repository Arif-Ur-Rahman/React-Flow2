import { Handle, Position } from "reactflow"

export default function CompanyNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-sky-500">
      <div className="font-bold text-sky-500">{data.label}</div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-sky-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-sky-500" />
    </div>
  )
}

