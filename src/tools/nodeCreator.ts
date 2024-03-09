import { TreeNode } from "../type/const";

export function nodeCreator(text: string): TreeNode{
  const treeNode: TreeNode = {
    text,
    children: [],
    contentWidth: 100,
    contentHeight: 50,
    left: 0,
    top: 0,
    layoutWidth: 0,
    layoutHeight: 0
  }
  return treeNode
}