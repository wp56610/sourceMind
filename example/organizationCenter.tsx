import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import MindMap from '../src/main'
import {nodeCreator, relationCreator} from '../src/tools/nodeCreator'
import { layoutManager } from '../src/layout/layoutManager'
import organization from '../src/layout/organization/organization'
layoutManager.register('organization', organization)
const root = nodeCreator({text: '根节点', isRoot: true})
const children1 = [
  nodeCreator({text: '分支主题', }),
  nodeCreator({text: '分支主题', }),
  nodeCreator({text: '分支主题', }),
  nodeCreator({text: '分支主题', }),
]
root.children.push(...children1)
const relationInfo = relationCreator({text: '分支主题', ids:[children1[0].nodeId]})
root.summary = [relationInfo]
root.children[2].children.push(
  nodeCreator({text: 'test',  }),
  nodeCreator({text: 'test',  }),
)

root.children[2].children[1].children.push(
  nodeCreator({text: 'test',  }),
  nodeCreator({text: 'test',  }),
)
function Map(){
  const ref =  useRef()
  useEffect(()=>{
    console.log(`🚀 ~ Map ~ ref:`, ref)
  }, [])
  return <MindMap root={root} ref={ref}></MindMap>
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Map></Map>
  </React.StrictMode>,
)
