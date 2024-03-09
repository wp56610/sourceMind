import { TreeNode } from "../type/const";

/**
 * 将树展开, 顺序遍历,就是广度优先
*/
export function expandTree(nodeList: TreeNode[]): TreeNode[]{
  const treeNodeList: TreeNode[] = [...nodeList]
  nodeList.forEach(item => {
    treeNodeList.push(...expandTree(item.children))
  }); 
  return treeNodeList 
}