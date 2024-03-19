import { TreeNode } from "../../type/const";
import { layoutBase } from "../base";
import organizationCircle from "./line/circle";

class Tree extends layoutBase {
  private parentLeft = 100
  override computeLayout(node: TreeNode) {
    const spacingHeight = (node.children.length - 1) * this.brotherSpacing;
    const spacingParent = node.children.length ? this.parentSpacing : 0;
    node.layoutWidth = Math.max(...node.children.map((item) => item.layoutWidth + this.parentLeft), node.contentWidth);
    node.layoutHeight = Math.max(spacingHeight + spacingParent + node.contentHeight, node.contentHeight)
    return node;
  }
  
  override computePosition(node: TreeNode) {
    // 子节点处于 parentleft 的位置开始计算
    const subTreeStart = node.left + this.parentLeft
    let subTreeTop = node.top + node.contentHeight + this.parentSpacing
    // 原地算法
    node.children.forEach(item=>{
      item.left = subTreeStart
      item.top = subTreeTop
      subTreeTop += item.layoutHeight + this.brotherSpacing
    })
    return node;
  }
}

const tree = new Tree();
tree.lineManager.register('circle', organizationCircle)
export default tree;
