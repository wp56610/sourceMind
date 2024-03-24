import { RelationInfo, TreeNode } from "../type/const";
import { v4 as uuidv4 } from 'uuid';
export function nodeCreator(obj: Partial<TreeNode>): TreeNode{
  const treeNode: TreeNode = {
    nodeId: uuidv4(),
    text:'',
    children: [],
    contentWidth: 100,
    contentHeight: 50,
    left: 0,
    top: 0,
    cLeft:0,
    cTop: 0,
    layoutWidth: 0,
    layoutHeight: 0,
    type: "organization",
    lineType: "straight",
    summaryHeight: 0,
    summaryWidth: 0,
    summaryLeft: 0,
    summaryTop: 0,
    summary: [],
    isRoot: false,
    ...obj
  }
  return treeNode
}


export function relationCreator(obj: Partial<RelationInfo> & {ids: string[]}):RelationInfo{
  return {
    nodeId: uuidv4(),
    text:'',
    children: [],
    contentWidth: 100,
    contentHeight: 50,
    left: 0,
    top: 0,
    layoutWidth: 0,
    layoutHeight: 0,
    ...obj
  }
}