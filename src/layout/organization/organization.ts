import sum from "lodash/sum";
import { TreeNode } from "../../type/const";
import { layoutBase } from "../base";

class Organization extends layoutBase {
  override computeLayout(node: TreeNode) {
    const spacingWidth = (node.children.length - 1) * this.brotherSpacing;
    const contentWidth = sum(node.children.map((item) => item.layoutWidth));
    const spacingHeight = node.children.length ? this.parentSpacing : 0;
    node.layoutWidth = Math.max(spacingWidth + contentWidth, node.contentWidth);
    node.layoutHeight =
      Math.max(...node.children.map((item) => item.layoutHeight), 0) +
      spacingHeight +
      node.contentHeight;
    return node;
  }
  
  override computePosition(node: TreeNode) {
    // 当前节点在当前子树当中总是居中的
    let subTreeStart = node.left - (node.layoutWidth - node.contentWidth)/2
    // 原地算法
    node.children.forEach(item=>{
      item.left = subTreeStart
      item.top = node.contentHeight + this.parentSpacing
      subTreeStart += item.layoutWidth + this.brotherSpacing
    })
    return node;
  }
}

const organization = new Organization();
export default organization;