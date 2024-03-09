import { IPoint, TreeNode } from "../../../type/const";

/**
 * 给出一个节点, 计算该节点和所有子节点的连线.
 * 可以单个节点依次计算
 */
export default function organizationStraight(node: TreeNode): string[] {
  // 没有子节点返回空串
  if(!node.children.length) return []
  const start = getParentStartPoint(node)
  const childrenStarts = node.children.map(item=> getChildStartPoint(item))
  const lines = childrenStarts.map(end=>{
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`
  })
  return lines
}

function getParentStartPoint(node: TreeNode): IPoint{
  const { left, top, contentWidth, contentHeight} = node
  return {
    x: left + contentWidth/2,
    y: top + contentHeight
  }
}

function getChildStartPoint(node: TreeNode): IPoint{
  const { left, top, contentWidth } = node

  return {
    x: left + contentWidth/2,
    y: top
  }
}