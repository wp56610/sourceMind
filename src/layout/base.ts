import { TreeNode } from "../type/const";

export abstract class layoutBase{
  /**
   * 每一层之间的间距, 父子节点间距
   */
  parentSpacing = 40;
  /**
   * 兄弟节点间距
   */
  brotherSpacing = 30;
  /**
   * 节点内边距
   */
  nodePadding = 10
  /**
   * 在子节点大小已知的情况下, 计算当前子树的大小
   * 注意: 子节点并非和当前子树属于同一类型
   */        
  computeLayout(node: TreeNode): TreeNode{
    throw new Error('请实现 layout ')
    return node
  }
  /**
   * 在知道父节点位置的情况下, 计算子树的容器的位置, 根节点位置 (0,0)
   */
  computePosition(node: TreeNode):TreeNode{
    throw new Error('请实现 computePosition')
    return node
  }
  /**
   * 
   */
}
