
export interface TreeNode extends BaseNode{
  /**
   * 包含概要的布局宽度
   */
  summaryWidth: number;
  /**
   * 包含概要的布局高度
   */
  summaryHeight: number;
  /**
   * summary 导致的间距, 还是以盒模型为理解
   */
  summaryLeft: number

  /**
   * summary 导致的间距, 还是以盒模型为理解
   */
  summaryTop: number
  /**
   * 布局类型
   */
  type: string;
  /**
   * 连线类型, 存在容错
   */
  lineType: string;
  /**
   * 概要节点存储
   */
  summary: RelationInfo[],
  isRoot: boolean;
  /**
   * 计算布局中，缓存当前节点相对于以当前节点为根节点的子树的左侧起始偏移
   */
  cLeft: number;
  cTop: number;

}

interface BaseNode {
  /**
   * 节点唯一标识
   */
  nodeId: string
  text: string 
  children: TreeNode[]
  /**
   * node width
   * 节点的宽高
  */
  contentWidth: number;
  /**
   * node height 
   * 节点的高度
  */
  contentHeight: number;
  left: number;
  top: number;
  /**
   * subTree width 
   * 子树的宽度
  */
  layoutWidth: number;
    /**
   * subTree height 
   * 子树的高度
  */
  layoutHeight: number;
}


export interface RelationInfo extends BaseNode {
  ids: string[],
}



export interface IRange {
  x: number;
  y: number;
  width: number,
  height: number
}

export interface IPoint {
  x: number,
  y: number;
}