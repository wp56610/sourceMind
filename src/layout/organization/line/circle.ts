import { IPoint, TreeNode } from "../../../type/const";
import { getChildStartPoint, getParentStartPoint } from "./base";

/**
 * 给出一个节点, 计算该节点和所有子节点的连线.
 * 可以单个节点依次计算
 */
export default function organizationCircle(node: TreeNode): string[] {
  // 没有子节点返回空串
  if(!node.children.length) return []
  const start = getParentStartPoint(node)
  const childrenStarts = node.children.map(item=> getChildStartPoint(item))
  const lines = childrenStarts.map(end=>{
    return getOrgCircleLine(start, end)
  })
  return lines
}

export function getOrgCircleLine(start:IPoint, end: IPoint){
  return `M ${start.x} ${start.y} Q${end.x} ${start.y}   ${end.x} ${end.y}`
}