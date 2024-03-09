import forEachRight from 'lodash/forEachRight'
import NodeContainer from './components/nodeContainer'
import './index.sass'
import organization from './layout/organization/organization'
import { expandTree } from './tools/expandTree'
import { nodeCreator } from './tools/nodeCreator'
import organizationStraight from './layout/organization/line/straight'
import NodeLine from './components/nodeLine'
export default function MindMap(){
  const root = nodeCreator('根节点')
  const children1 = [
    nodeCreator('分支主题'),
    nodeCreator('分支主题'),
    nodeCreator('分支主题'),
    nodeCreator('分支主题'),
  ]
  root.children.push(...children1)
  const nodeList = expandTree([root])
  forEachRight(nodeList, (item)=>{
    organization.computeLayout(item)
  })
  nodeList.forEach(item=>{
    organization.computePosition(item)
  })
  console.log(`🚀 ~ MindMap ~ nodeList:`, nodeList)

  const lineList = nodeList.map(item=>
    organizationStraight(item)
  ).flat()
  console.log(`🚀 ~ MindMap ~ lineList:`, lineList)

  
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
}