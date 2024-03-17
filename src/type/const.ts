
export interface TreeNode {
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
  /**
   * 布局类型
   */
  type: string;
  /**
   * 连线类型, 存在容错
   */
  lineType: string;
}

export interface tree {
  root: TreeNode,
  lineType: LineType
}


export enum LineType  {
  straight='straight'
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