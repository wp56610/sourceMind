import sum from "lodash/sum";
import { TreeNode } from "../../type/const";
import { layoutBase } from "../base";
import organizationStraight from "./line/straight";
import organizationCircle from "./line/circle";

class OrganizationXMind extends layoutBase {
  override brotherSpacing = 4;
  override computeLayout(node: TreeNode) {
    const spacingWidth = (node.children.length - 1) * this.brotherSpacing;
    const contentWidth = sum(node.children.map((item) => item.layoutWidth));
    const spacingHeight = node.children.length ? this.parentSpacing : 0;
    node.layoutWidth = Math.max(spacingWidth + contentWidth, node.contentWidth);
    node.layoutHeight =
      Math.max(...node.children.map((item) => item.layoutHeight), 0) +
      spacingHeight +
      node.contentHeight;

    // 计算当前节点在当前子树的相对位置，递归计算，那么每次子节点的位置其实都是确定的
    const len = node.children.length
    
    if(len>=2){
      const last = node.children[len - 1]
      const firstChildrenCenter = node.children[0].cLeft
      const lastChildCenter = node.layoutWidth - last.layoutWidth + last.cLeft 
      node.cLeft = (firstChildrenCenter + lastChildCenter ) >> 1
    }
    if(len === 0){
      node.cLeft = node.contentHeight >> 1
    }
    if(len === 1){
      node.cLeft = Math.max( node.children[0].contentWidth, node.contentWidth ) >> 1
    }

    return node;
  }
  
  override computePosition(node: TreeNode) {
    let subTreeStart: number
    if(node.isRoot){
      subTreeStart = -node.cLeft
      node.left = 0
      node.top = 0
    }else {
      subTreeStart = node.left + node.contentWidth/2 - node.cLeft
    }
    // 原地算法
    node.children.forEach(item=>{
      // 计算节点的左侧坐标
      item.left = subTreeStart + item.cLeft - node.contentWidth/2
      item.top = node.top + node.contentHeight + this.parentSpacing
      subTreeStart += item.layoutWidth + this.brotherSpacing
    })
    return node;
  }
}

const organizationXMind = new OrganizationXMind();
organizationXMind.lineManager.register('straight', organizationStraight)
organizationXMind.lineManager.register('circle', organizationCircle)
export default organizationXMind;