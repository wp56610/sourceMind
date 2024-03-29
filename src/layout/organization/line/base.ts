import { IPoint, TreeNode } from "../../../type/const"

export function getParentStartPoint(node: TreeNode): IPoint{
  const { left, top, contentWidth, contentHeight} = node
  return {
    x: left + contentWidth/2,
    y: top + contentHeight
  }
}

export function getChildStartPoint(node: TreeNode): IPoint{
  const { left, top, contentWidth } = node
  return {
    x: left + contentWidth/2,
    y: top
  }
}