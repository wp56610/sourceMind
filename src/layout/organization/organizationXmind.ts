import sum from "lodash/sum";
import { TreeNode } from "../../type/const";
import { layoutBase } from "../base";
import organizationStraight from "./line/straight";
import organizationCircle from "./line/circle";

class OrganizationXMind extends layoutBase {
  override brotherSpacing = 4;
  public summarySpacing = 20;
  override computeLayout(node: TreeNode) {
    const spacingWidth = (node.children.length - 1) * this.brotherSpacing;
    const contentWidth = sum(node.children.map((item) => item.layoutWidth));
    const spacingHeight = node.children.length ? this.parentSpacing : 0;
    node.layoutWidth = Math.max(spacingWidth + contentWidth, node.contentWidth);
    node.layoutHeight =
      Math.max(...node.children.map((item) => item.summaryHeight), 0) +
      spacingHeight +
      node.contentHeight;

    // 计算当前节点在当前子树的相对位置，递归计算，那么每次子节点的位置其实都是确定的
    const len = node.children.length;

    if (len >= 2) {
      const last = node.children[len - 1];
      const firstChildrenCenter = node.children[0].cLeft;
      const lastChildCenter = node.layoutWidth - last.layoutWidth + last.cLeft;
      node.cLeft = (firstChildrenCenter + lastChildCenter) >> 1;
    }
    if (len === 0) {
      node.cLeft = node.contentWidth >> 1;
    }
    if (len === 1) {
      node.cLeft =
        Math.max(node.children[0].contentWidth, node.contentWidth) >> 1;
    }

    // summary 概要计算, 先初始化
    node.summaryWidth = node.layoutWidth;
    node.summaryHeight = node.layoutHeight;

    // 将节点转换为 map，可以快速计算出是否超出
    const centerMap = new Map<string, number>();
    // 当前节点 layout mid 位置
    let offsetCount = 0;
    node.children.forEach((item) => {
      centerMap.set(item.nodeId, offsetCount + item.summaryWidth / 2);
      offsetCount += item.summaryWidth + this.brotherSpacing;
    });

    // 左侧超出的最大值, 右侧超出的最大值
    let leftOut = 0;
    let rightOut = 0;
    node.summary.forEach((summaryNode) => {
      const { contentWidth, contentHeight, ids } = summaryNode;
      // 通过关联 ids, 找到所有关联的节点
      const relationNodes = ids.map((id) => centerMap.get(id)) as number[];
      // 可能是同一个
      const firstMid = relationNodes[0];
      const lastMid = relationNodes[relationNodes.length - 1];
      // 概要中点位置
      const summaryMid = (firstMid + lastMid) / 2;
      // 右侧剩余空间
      const rightSpacing = node.layoutWidth - summaryMid;

      const halfWidth = contentWidth >> 1;

      // 概要在当前子树下的相对偏移
      summaryNode.left = summaryMid;
      // 左侧超出了
      if (halfWidth > summaryMid) {
        leftOut = Math.max(leftOut, halfWidth - summaryMid);
      }
      // 右侧超出了
      if (halfWidth > rightSpacing) {
        rightOut = Math.max(rightOut, halfWidth - rightSpacing);
      }
      node.summaryLeft = leftOut;
      // 高度仅需叠加
      node.summaryHeight = Math.max(
        node.summaryHeight,
        node.layoutHeight + this.summarySpacing + contentHeight
      );
      //
      node.summaryWidth = node.layoutWidth + leftOut + rightOut;
    });

    return node;
  }

  override computePosition(node: TreeNode) {
    let subTreeStart: number;
    if (node.isRoot) {
      subTreeStart = -node.cLeft;
      node.left = 0;
      node.top = 0;
    } else {
      subTreeStart =
        node.left + node.contentWidth / 2 - node.cLeft + node.summaryLeft;
    }
    const layoutStart = subTreeStart;
    const topStart = node.top + node.contentHeight + this.parentSpacing;
    const nodeIdMap = new Map<string, number>();
    // 原地算法
    node.children.forEach((item) => {
      // 计算节点的左侧坐标
      item.left = subTreeStart + item.cLeft - (node.contentWidth >> 1) + node.summaryLeft;
      item.top = topStart;
      subTreeStart += item.summaryWidth + this.brotherSpacing;
      nodeIdMap.set(item.nodeId, item.summaryHeight);
    });
    node.summary.forEach((item) => {
      const { ids } = item;
      const relationNodesHeight = ids.map((id) =>
        nodeIdMap.get(id)
      ) as number[];
      item.left = layoutStart + item.left - (item.contentWidth >> 1);
      item.top =
        Math.max(...relationNodesHeight) + this.summarySpacing + topStart;
    });
    return node;
  }
}

const organizationXMind = new OrganizationXMind();
organizationXMind.lineManager.register("straight", organizationStraight);
organizationXMind.lineManager.register("circle", organizationCircle);
export default organizationXMind;
