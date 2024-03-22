import forEachRight from 'lodash/forEachRight'
import NodeContainer from './components/nodeContainer'
import './index.sass'
import { layoutManager } from './layout/layoutManager'
import { expandTree } from './tools/expandTree'
import NodeLine from './components/nodeLine'
import { TreeNode } from './type/const'
import { forwardRef, Ref, useImperativeHandle } from 'react'
const MindMap = forwardRef((prop: {root:TreeNode}, ref: Ref<unknown> | undefined)=>{
  const nodeList = expandTree([prop.root])
  forEachRight(nodeList, (item)=>{
    const type = item.type
    const layout = layoutManager.getLayout(type)
    layout.computeLayout(item)
  })
  nodeList.forEach(item=>{
    const type = item.type
    const layout = layoutManager.getLayout(type)
    layout.computePosition(item)
  })
  
  const lineList = nodeList.map(item=>{
    const {type, lineType } = item
    const layout = layoutManager.getLayout(type)
    const computeLine =  layout.lineManager.getLine(lineType)
    return computeLine(item)
  }).flat()
  // 暴露实例方法
  useImperativeHandle(ref, () => {
    return {
    };
  }, []);
  
  return  <div className='mind-map-container'>
    {
      lineList.map(item=>
      <NodeLine linePath={item}></NodeLine>
        )
    }
  {
    nodeList.map(item=>
      <NodeContainer node={item}></NodeContainer>
    )
  }
  </div>
})

export default MindMap