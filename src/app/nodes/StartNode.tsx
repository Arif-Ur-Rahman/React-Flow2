import { Handle, Position } from "reactflow"

export default function StartNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="font-bold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-stone-500" />
    </div>
  )
}

