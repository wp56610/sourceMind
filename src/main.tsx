import forEachRight from 'lodash/forEachRight'
import NodeContainer from './components/nodeContainer'
import './index.sass'
import { layoutManager } from './manager/layoutManager'
import { expandTree } from './tools/expandTree'
import { nodeCreator } from './tools/nodeCreator'
import NodeLine from './components/nodeLine'
export default function MindMap(){
  const root = nodeCreator({text: '根节点' })
  const children1 = [
    nodeCreator({text: '分支主题' }),
    nodeCreator({text: '分支主题' }),
    nodeCreator({text: '分支主题' }),
    nodeCreator({text: '分支主题' }),
  ]
  root.children.push(...children1)
  const nodeList = expandTree([root])
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